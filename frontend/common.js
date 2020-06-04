g = {
    contractAddress:'0xca6bb508d125af296fc067f74afd4eae056f2600',
    contractABI:[{"constant": false,"inputs": [],"name": "pickWinnerAndReward","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "string","name": "_ipfsId","type": "string"},{"internalType": "string","name": "_name","type": "string"}],"name": "registerPhoto","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "address payable","name": "_photographer","type": "address"},{"internalType": "uint256","name": "_score","type": "uint256"}],"name": "scorePhoto","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address[]","name": "_adjudicators","type": "address[]"},{"internalType": "uint256","name": "_dueTime","type": "uint256"}],"payable": true,"stateMutability": "payable","type": "constructor"},{"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "adjudicators","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "competitionStatus","outputs": [{"internalType": "enum PhotoCompetition.CompetitionStatus","name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "dueTime","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getAllParticipants","outputs": [{"internalType": "address[]","name": "return_participants","type": "address[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getWinner","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getWinnerByOnwerQuery","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "photos","outputs": [{"internalType": "uint256","name": "score","type": "uint256"},{"internalType": "address","name": "photographer","type": "address"},{"internalType": "string","name": "ipfsId","type": "string"},{"internalType": "string","name": "name","type": "string"},{"internalType": "address","name": "adjudicator","type": "address"},{"internalType": "bool","name": "isRegistered","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "reward","outputs": [{"internalType": "uint256","name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}]

}
// var contractAddress='0xc087ce59d6a1d8674165f69da97040164db2b034';
// var contractABI=[{"constant": true,"inputs": [],"name": "getAllParticipants","outputs": [{"name": "return_participants","type": "address[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "pickWinnerAndReward","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "reward","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getWinnerByOnwerQuery","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "dueTime","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "photos","outputs": [{"name": "score","type": "uint256"},{"name": "photographer","type": "address"},{"name": "ipfsId","type": "string"},{"name": "name","type": "string"},{"name": "adjudicator","type": "address"},{"name": "isRegistered","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getWinner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_photographer","type": "address"},{"name": "_score","type": "uint256"}],"name": "scorePhoto","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_ipfsId","type": "string"},{"name": "_name","type": "string"}],"name": "registerPhoto","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "adjudicators","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [{"name": "_adjudicators","type": "address[]"},{"name": "_dueTime","type": "uint256"}],"payable": true,"stateMutability": "payable","type": "constructor"}];

const ethEnabled = () => {  
    if (window.ethereum) {    
        window.web3 = new Web3(window.ethereum);    
        window.ethereum.enable();    
        return true;  
    } 
    return false;
}

if (!ethEnabled()) {  alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");}

var web3 = window.web3;
var contractAddress = g.contractAddress;
var abi = g.contractABI;
var photoCompetition = new web3.eth.Contract(abi,contractAddress);