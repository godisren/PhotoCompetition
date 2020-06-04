pragma solidity >=0.4.22 <=0.5.13;

contract PhotoCompetition {
    
    struct Photography {
        uint score;     // 0 ~ 100
        address photographer; 
        string  ipfsId;             
        string  name;
        address adjudicator;
        bool isRegistered;
    }

    enum CompetitionStatus {
        START,END
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Operation Deny");
        _;
    }
    
    modifier checkRegisteredDuetime() {
        require(dueTime >= now, "It's over registered due time.");
        _;
    }
    
    // TODO emit winner event 
    
    address public owner;
    uint256 public dueTime;
    mapping(address => Photography) public photos ;
    address[] participants;
    mapping (address => bool) public adjudicators;
    address payable winner;
    CompetitionStatus public competitionStatus; 
    
    constructor(address[] memory _adjudicators, uint256 _dueTime) public payable {
        require(_dueTime >= now, "The due time must be later than now.");
        
        owner = msg.sender;
        dueTime = _dueTime;
        competitionStatus = CompetitionStatus.START;
        
        // init adjudicators
        for (uint i=0; i<_adjudicators.length; i++) {
            adjudicators[_adjudicators[i]] = true;
        }
    }
    
    // function registerPhoto(string memory _ipfsId, string memory _name) public beforeDuetime {
    function registerPhoto(string memory _ipfsId, string memory _name) public checkRegisteredDuetime{
        address photographer = msg.sender;
        Photography storage photo = photos[photographer];
        require(photo.isRegistered == false , "You have already registered.");
        
        photo.ipfsId = _ipfsId;
        photo.name = _name;
        photo.isRegistered = true;
        photo.photographer = photographer;
        participants.push(photographer);
    }
    
    function scorePhoto(address payable _photographer, uint _score) public{
        address adjudicator = msg.sender;
        
        // veirfy score
        require(_score <= 100 && _score >= 0, "Argument wrong, score should be in 0~100");
        
        // verify adjudicator
        require(adjudicators[adjudicator] ==  true, "Operation Deny. Only adjudicator can do.");
        
        Photography storage photo = photos[_photographer];
        photo.score = _score;
        photo.adjudicator = adjudicator;
        
        // find the winner who has the highest socre in the meantime
        if(winner==address(0) || photos[winner].score < _score){
            winner = _photographer;
        }
    }
    
    function getAllParticipants() public view returns (address[] memory return_participants){
        return participants;
    }
    
    function getWinner() public view returns(address) {
        // announce winner till due time
        if(competitionStatus == CompetitionStatus.END)
            return winner;
            
        return address(0);
    }
    
    function reward() public view returns (uint balance){
        return address(this).balance;
    }
    
    // TODO only start
    function pickWinnerAndReward() public onlyOwner{
        // require(dueTime < now, "It is not the time to pick a winner.");
        
        /*
        // we don't need to traverse all participants to find the winner, It's inefficient,
        // just choose the winner by that time when an adjudicator scores a photo every time.
        
        uint theHighestScore = 0;
        address tmpWinner;
        for (uint i=0; i<participants.length; i++) {
            Photography storage art = photos[participants[i]];
            if( art.score > theHighestScore){
                tmpWinner = art.photographer;
                theHighestScore = art.score;
            }
        }
        
        winner = tmpWinner;
        */
        
        require(winner!=address(0), "No winner.");

        competitionStatus = CompetitionStatus.END;
        
        // reward the winner
        winner.transfer(address(this).balance);
    }
    
    function getWinnerByOnwerQuery() public onlyOwner view returns(address) {
        return winner;
    }
    
}