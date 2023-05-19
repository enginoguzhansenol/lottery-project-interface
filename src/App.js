import React, { useState, useReducer } from "react";
import { ethers } from "ethers";
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import { margin } from "@mui/system";
import lottoAbi from './lottoAbi.json';


function App() {

    const [active, setActive] = useState(false);
    const handleClick = () => {
      setActive(!active);
    };
  
    window.userAddress = null;
    const { Web3Provider } = ethers.providers;
    const lottoAddress = '0xE5f2A565Ee0Aa9836B4c80a07C8b32aAd7978e22';
  
    const provider = Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(lottoAddress, lottoAbi, signer); 

  
    async function depositEther(event, amount) {
      event.preventDefault();
      if (window.web3) {
      try {
        const provider = Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const contract = new ethers.Contract(lottoAddress, lottoAbi, signer);
          var a = await contract.depositEther({
            value: ethers.parseEther(amount)
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Change the error");
      }
    }
  
    return (
      <div style={{ marginBottom: '20px' }}>
      <div className="form-group">
        <label htmlFor="quantity">Select amount for the operation: </label>
        <input type="number" id="quantity" name="quantity" min="1" max="5" />
      </div>
    
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <button className="button">Deposit Ether onClick=depositEther()</button>
        <button className="button">Withdraw Ether</button>
      </div>
    
      <div className="form-group">
        <label htmlFor="ticket-type">Choose a ticket type: </label>
        <select name="ticket-type" id="ticket-type">
          <option value="FULL">FULL</option>
          <option value="HALF">HALF</option>
          <option value="QUARTER">QUARTER</option>
        </select>
      </div>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <button className="button">Buy Ticket</button>
      </div>
      <div className="form-group">
        <label htmlFor="ticket-id">Select the ticket id: </label>
        <input type="number" id="ticket-id" name="ticket-id"  min="0"/>
      </div>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <button className="button">Collect ticket refund</button>
      </div>
      <div className="form-group">
        <label htmlFor="ticket-id">Select the ticket id: </label>
        <input type="number" id="ticket-id" name="ticket-id"  min="0" />
      </div>
      <div className="form-group">
        <label htmlFor="number">Select the number: </label>
        <input type="number" id="number" name="number"  min="0"/>
      </div>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <button className="button">Reveal Rnd Number</button>
      </div>
    </div>
    


      

    );
  }
  
  export default App;