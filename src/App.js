import React, { useState } from "react";
import { ethers } from "ethers";
import lottoAbi from './lottoAbi.json';

function App() {
    const lottoAddress = '0xBa5482bb827740FF47Aa8a8e4052588f993d461B';
    /*const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();*/
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
    const signer = provider.getSigner();
    const contract = new ethers.Contract(lottoAddress, lottoAbi, signer); 


    // State for form inputs
    const [amount, setAmount] = useState(0);
    const [ticketType, setTicketType] = useState('FULL');
    const [ticketId, setTicketId] = useState(0);
    const [number, setNumber] = useState(0);
    const [hash, setHash] = useState("0x0000000000000000000000000000000000000000000000000000000000000000");
    const [lotteryNo, setLotteryNo] = useState(1);
    const [I, setI] = useState(0);

    function getTicketTypeIndex(){
      if (ticketType === "FULL"){
        return 0;
      } else if (ticketType === "HALF"){
        return 1;
      } else {
        return 2;
      }
    }

    async function depositEther(event) {
        //connectWallet();
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

    async function withdrawEther(event) {
        // interact with smart contract here
        event.preventDefault();
        if (window.ethereum) {
            try {
                const weiAmount = ethers.utils.parseEther(amount.toString());
                const tx = await contract.withdrawEther(weiAmount);
                await tx.wait();
                alert('Withdraw successful!');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please install Metamask");
        }
    }
  
    async function buyTicket(event) {
        // interact with smart contract here
        event.preventDefault();
        if (window.ethereum) {
            try {
                const tx = await contract.buyTicket(hash, getTicketTypeIndex());
                await tx.wait();
                alert('Successful!');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please install Metamask");
        }
    }
  
    async function collectTicketRefund(event) {
        // interact with smart contract here
        event.preventDefault();
        if (window.ethereum) {
            try {
                const tx = await contract.collectTicketRefund(ticketId);
                await tx.wait();
                alert('Successful!');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please install Metamask");
        }
    }
  
   async function revealRndNumber(event) {
        // interact with smart contract here
        event.preventDefault();
        if (window.ethereum) {
            try {
                const tx = await contract.revealRndNumber(ticketId, number);
                await tx.wait();
                alert('Successful!');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please install Metamask");
        }
    }

    async function getLastOwnedTicketNo(event) {
      // interact with smart contract here
      event.preventDefault();
      if (window.ethereum) {
          try {
              const tx = await contract.getLastOwnedTicketNo(lotteryNo);
              alert('Successful!')
              const ticket_no = tx[0];
              const status = tx[1];
              alert('Successful! Ticket No: ' + String(ticket_no) + " Status: " + String(status) );
          } catch (error) {
              console.error(error);
          }
      } else {
          alert("Please install Metamask");
      }
  }

  async function getIthOwnedTicketNo(event) {
    // interact with smart contract here
    event.preventDefault();
    if (window.ethereum) {
        try {
            const tx = await contract.getIthOwnedTicketNo(I, lotteryNo);
            await tx.wait();
            const ticket_no = tx[0];
            const status = tx[1];
            alert('Successful! Ticket No: ' + String(ticket_no) + " Status: " + String(status) );
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("Please install Metamask");
    }
}

async function checkIfTicketWon(event) {
  // interact with smart contract here
  event.preventDefault();
  if (window.ethereum) {
      try {
          const tx = await contract.checkIfTicketWon(lotteryNo, ticketId);
          await tx.wait();
          alert('Successful! The ticket has won ' + String(tx) + ' finneys.');
      } catch (error) {
          console.error(error);
      }
  } else {
      alert("Please install Metamask");
  }
}
async function collectTicketPrize(event) {
  // interact with smart contract here
  event.preventDefault();
  if (window.ethereum) {
      try {
          const tx = await contract.collectTicketPrize(lotteryNo, ticketId);
          await tx.wait();
          alert('Successful!.');
      } catch (error) {
          console.error(error);
      }
  } else {
      alert("Please install Metamask");
  }
}

async function getIthWinningTicket(event) {
  // interact with smart contract here
  event.preventDefault();
  if (window.ethereum) {
      try {
          const tx = await contract.getIthWinningTicket(I, lotteryNo);
          await tx.wait();
          const ticket_no = tx[0];
          const status = tx[1];
          alert('Successful! Ticket No: ' + String(ticket_no) + " Status: " + String(status) );
      } catch (error) {
          console.error(error);
      }
  } else {
      alert("Please install Metamask");
  }
}
async function getLotteryNos(event) {
  // interact with smart contract here
  if (window.ethereum) {
      try {
          const tx = await contract.getLotteryNos();
          const submission = tx[0];
          const reveal = tx[1];
          alert('Successful! Submission Lottery: ' + String(submission) + " Reveal Lottery: " + String(reveal) );
      } catch (error) {
          console.error(error);
      }
  } else {
      alert("Please install Metamask");
  }
}

async function getTotalLotteryMoneyCollected(event) {
  // interact with smart contract here
  event.preventDefault();
  if (window.ethereum) {
      try {
          const tx = await contract.getTotalLotteryMoneyCollected(lotteryNo);
          const amount = tx;
          alert('Successful! Total lottery money collected for specified lottery: ' + String(amount));
      } catch (error) {
          console.error(error);
      }
  } else {
      alert("Please install Metamask");
  }
}


    return (
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label>Select amount for the operation: </label>
          <input type="number" min="1" max="5" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
      
        <div style={{ marginBottom: '20px' }}>
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
            <label>Enter an hash number: </label>
            <input type="text" value={hash} onChange={e => setHash(e.target.value)}>
            </input>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={buyTicket}>Buy Ticket</button>
        </div>
        <div>
          <label>Select the ticket id: </label>
          <input type="number" min="0" value={ticketId} onChange={e => setTicketId(e.target.value)} />
        </div>
        <div>
          <label>Select a lottery no: </label>
          <input type="number" min="0" value={lotteryNo} onChange={e => setLotteryNo(e.target.value)} />
        </div>
        <div>
          <button onClick={checkIfTicketWon}>Check If Ticket Won</button>
        </div>
        <div style={{ marginBottom: '20px' }}>
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
        <div style={{ marginBottom: '20px' }}>
          <button onClick={revealRndNumber}>Reveal Rnd Number</button>
        </div>
        <div>
          <label>Select a lottery no: </label>
          <input type="number" min="0" value={lotteryNo} onChange={e => setLotteryNo(e.target.value)} />
        </div>
        <div>
          <label>Select I: </label>
          <input type="number" min="0" value={I} onChange={e => setI(e.target.value)} />
        </div>
        <div>
          <button onClick={getLastOwnedTicketNo}>Get Last Owned Ticket No</button>
        </div>
        <div>
          <button onClick={getIthOwnedTicketNo}>Get I'th Owned Ticket No</button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={getIthWinningTicket}>Get I'th Winning Ticket</button>
        </div>
        <div>
          <label>Select a lottery no: </label>
          <input type="number" min="0" value={lotteryNo} onChange={e => setLotteryNo(e.target.value)} />
        </div>
        <div>
          <label>Select ticket no: </label>
          <input type="number" min="0" value={ticketId} onChange={e => setI(e.target.value)} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={collectTicketPrize}>Collect Ticket Prize</button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={getLotteryNos}>Get Lottery No's</button>
        </div>
        <div>
          <label>Select a lottery no: </label>
          <input type="number" min="0" value={lotteryNo} onChange={e => setLotteryNo(e.target.value)} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={getTotalLotteryMoneyCollected}>Get Total Lottery Money Collected</button>
        </div>
      </div>
    );
}

export default App;
