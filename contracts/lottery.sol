pragma solidity ^0.4.17;

contract lottery {
    address public manager;
    address[] public players;

    function lottery() public {
        //want to assign the creator of the contract to the manager
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > 0.01 ether); //used for validation, if this returns to false, contract is exited and no changes made
        // must include 'ether' or it will assume it is wei
        players.push(msg.sender);
    }

    function random() private view returns(uint){ //private since we don't want anyone to see it
        return uint(sha3(block.difficulty, now, players)); //or keccak256, classic algoo, same thing
    }

    function pickWinner() public restricted{
        uint index = random() % players.length;
        players[index].transfer(this.balance); // 'this' refers to this instance of the contract
        players = new address[](0); //creates a new dynamic array, with an initial size of zero
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

}
