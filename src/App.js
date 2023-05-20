import React, { useState } from "react";
import { ethers } from "ethers";
import lottoAbi from './lottoAbi.json';

function App() {
    const lottoAddress = '0x1a76e97C017db0D802123101F953D005B80bd951';
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(lottoAddress, lottoAbi, signer); 

    // State for form inputs
    const [amount, setAmount] = useState(0);
    const [ticketType, setTicketType] = useState('FULL');
    const [ticketId, setTicketId] = useState(0);
    const [number, setNumber] = useState(0);

    async function depositEther(event) {
        event.preventDefault();
        if (window.ethereum) {
            try {
                const weiAmount = ethers.utils.parseEther(amount.toString());
                const tx = await contract.depositEther({ value: weiAmount });
                await tx.wait();
                alert('Deposit successful!');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please install Metamask");
        }
    }

    // You need to implement the below functions
    function withdrawEther() {
        // interact with smart contract here
    }
  
    function buyTicket() {
        // interact with smart contract here
    }
  
    function collectTicketRefund() {
        // interact with smart contract here
    }
  
    function revealRndNumber() {
        // interact with smart contract here
    }

    return (
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label>Select amount for the operation: </label>
          <input type="number" min="1" max="5" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
      
        <div>
          <button onClick={depositEther}>Deposit Ether</button>
          <button onClick={withdrawEther}>Withdraw Ether</button>
        </div>
      
        <div>
          <label>Choose a ticket type: </label>
          <select name="ticket-type" value={ticketType} onChange={e => setTicketType(e.target.value)}>
            <option value="FULL">FULL</option>
            <option value="HALF">HALF</option>
            <option value="QUARTER">QUARTER</option>
          </select>
        </div>
        <div>
          <button onClick={buyTicket}>Buy Ticket</button>
        </div>
        <div>
          <label>Select the ticket id: </label>
          <input type="number" min="0" value={ticketId} onChange={e => setTicketId(e.target.value)} />
        </div>
        <div>
          <button onClick={collectTicketRefund}>Collect ticket refund</button>
        </div>
        <div>
          <label>Select the ticket id: </label>
          <input type="number" min="0" value={ticketId} onChange={e => setTicketId(e.target.value)} />
        </div>
        <div>
          <label>Select the number: </label>
          <input type="number" min="0" value={number} onChange={e => setNumber(e.target.value)} />
        </div>
        <div>
          <button onClick={revealRndNumber}>Reveal Rnd Number</button>
        </div>
      </div>
    );
}

export default App;
