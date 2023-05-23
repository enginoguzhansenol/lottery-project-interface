import React, { useState } from "react";
import { ethers } from "ethers";
import lottoAbi from './lottoAbi.json';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
    const lottoAddress = '0xf2388927a9fBe2AF5AdA570E51B718593B9cE8D2';
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

    function statusEnumConverter(statusEnum){
      const enumValues = [
        'BOUGHT',
        'WINNER1',
        'WINNER2',
        'WINNER3',
        'LOSER',
        'COLLECTED',
        'REFUNDED',
        'CANCELLED',
      ];
      const statusConverted = enumValues[statusEnum];
      return statusConverted;
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
              const ticket_no = tx[0];
              const status = tx[1];
              alert('Successful! Ticket No: ' + String(ticket_no) + " Status: " + statusEnumConverter(status) );
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
            const ticket_no = tx[0];
            const status = tx[1];
            alert('Successful! Ticket No: ' + String(ticket_no) + " Status: " + statusEnumConverter(status) );
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
  if(I === "1" || I === "2" || I === "3" ){
    if (window.ethereum) {
        try {
            const tx = await contract.getIthWinningTicket(I, lotteryNo);
            const ticket_no = tx[0];
            const status = tx[1];
            if(parseInt(status) === 0){
              alert("The lottery has not ended.");
            }
            else{
            alert('Successful! Ticket No: ' + String(ticket_no) + " Status: " + statusEnumConverter(status) );
          }
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("Please install Metamask");
    }
  } else {
    alert("Please enter the values 1, 2, or 3.");
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
  <Box className="container">
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select amount for the operation"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
    </Box>
    <Box className="button-group">
      <Button variant="contained" color="primary" onClick={depositEther}>Deposit Ether</Button>
      <Button variant="contained" color="secondary" onClick={withdrawEther}>Withdraw Ether</Button>
    </Box>
    
    <Box className="input-group">
      <FormControl fullWidth>
        <InputLabel>Choose a ticket type</InputLabel>
        <Select
          value={ticketType}
          onChange={e => setTicketType(e.target.value)}
        >
          <MenuItem value={"FULL"}>FULL</MenuItem>
          <MenuItem value={"HALF"}>HALF</MenuItem>
          <MenuItem value={"QUARTER"}>QUARTER</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Enter an hash number"
        type="text"
        value={hash}
        onChange={e => setHash(e.target.value)}
      />
    </Box>
    <Box className="button-group">
      <Button variant="contained" color="primary" onClick={buyTicket}>Buy Ticket</Button>
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select the ticket id"
        type="number"
        value={ticketId}
        onChange={e => setTicketId(e.target.value)}
      />
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select a lottery no"
        type="number"
        value={lotteryNo}
        onChange={e => setLotteryNo(e.target.value)}
      />
    </Box>
    <Box className="button-group">
      <Button variant="contained" color="primary" onClick={checkIfTicketWon}>Check If Ticket Won</Button>
    </Box>
    <Box className="button-group">
      <Button variant="contained" color="secondary" onClick={collectTicketRefund}>Collect Ticket Refund</Button>
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select the ticket id"
        type="number"
        value={ticketId}
        onChange={e => setTicketId(e.target.value)}
      />
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select the number"
        type="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
    </Box>
    
    <Box className="button-group">
      <Button variant="contained" color="primary" onClick={revealRndNumber}>Reveal Rnd Number</Button>
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select a lottery no"
        type="number"
        value={lotteryNo}
        onChange={e => setLotteryNo(e.target.value)}
      />
    </Box>
    
    <Box className="input-group">
      <TextField
        label="Select I"
        type="number"
        value={I}
        onChange={e => setI(e.target.value)}
      />
    </Box>

    <Box className="button-group">
      <Button variant="contained" color="secondary" onClick={getLastOwnedTicketNo}>Get Last Owned Ticket No</Button>
    </Box>

    <Box className="button-group">
      <Button variant="contained" color="primary" onClick={getIthOwnedTicketNo}>Get I'th Owned Ticket No</Button>
    </Box>

    <Box className="button-group">
      <Button variant="contained" color="secondary" onClick={getIthWinningTicket}>Get I'th Winning Ticket</Button>
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select a lottery no"
        type="number"
        value={lotteryNo}
        onChange={e => setLotteryNo(e.target.value)}
      />
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select ticket no"
        type="number"
        value={ticketId}
        onChange={e => setTicketId(e.target.value)}
      />
    </Box>

    <Box className="button-group">
      <Button variant="contained" color="primary" onClick={collectTicketPrize}>Collect Ticket Prize</Button>
    </Box>

    <Box className="button-group">
      <Button variant="contained" color="secondary" onClick={getLotteryNos}>Get Lottery No's</Button>
    </Box>
    <Box height={10} />
    <Box className="input-group">
      <TextField
        label="Select a lottery no"
        type="number"
        value={lotteryNo}
        onChange={e => setLotteryNo(e.target.value)}
      />
    </Box>

    <Box className="button-group">
      <Button variant="contained" color="primary" onClick={getTotalLotteryMoneyCollected}>Get Total Lottery Money Collected</Button>
    </Box>
  </Box>
);
}

export default App;
