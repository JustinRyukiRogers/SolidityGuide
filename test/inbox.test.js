const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //constructor functions tend to be uppercaps
const web3 = new Web3(ganache.provider()); //in future will change ganache with other networks
const { interface, bytecode } = require("../compile"); //properties

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call(); //first set of () to customize
    //the list of arguments, the second () customizes the transaction/how the contract is called
    assert.equal(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage('bye').send({from: accounts[0]}); //get back hash, don't need to assign to variable
    const message = await inbox.methods.message().call();
    assert.equal(message,'bye');
  });
});
