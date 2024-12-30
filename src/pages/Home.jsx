import { useState } from 'react';
import '../App.css';
// icons
import gateIcon from '../assets/icons/gate.png';
import wizardIcon from '../assets/icons/wizard.png';
//components
import Header from '../components/Header'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// Logs
import Logs from '../components/Logs'

function App() {
  const [count, setCount] = useState(0)

  const thumbnail = document.querySelectorAll(".thumbnail")
  console.log(thumbnail);

  return (
    // <html><body><h1>Welcome to Cloud Castle Dev</h1><p>Testing site for AWS training</p><img src='https://img-38se4389gs9838pfsc.s3.amazonaws.com/magic.gif' alt='magic meme' style='width:240px;height:240px;'></body></html>
    
    <>
      <Header />
      <img className="icon" src={gateIcon} alt="gate icon" />
      <div className="card">
        <Button variant="outlined" color="primary" className="btn" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <img className='thumbnail' src={count == 3 ? "https://img-38se4389gs9838pfsc.s3.amazonaws.com/magic.gif" : wizardIcon} alt="'magic' gif" style={{ visibility: count > 0 ? 'visible': 'hidden'}} />
        <p>Testing site for AWS training</p>
      </div>
      
      <Divider variant="middle" style={{ backgroundColor: "#fff" }} />

      <h2>Logs</h2>
      <Logs />
    </>
  )
}

export default App
