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
// Auth
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

function App() {
  const [count, setCount] = useState(0)

  const thumbnail = document.querySelectorAll(".thumbnail")
  console.log(thumbnail);

  return (
    <Authenticator>
      {
        ({ user }) => (
          <>
            <Header user={user}/>
            <div className="card">
              <img className="icon" src={gateIcon} alt="gate icon" />
              <p>Hello {user?.username}</p>
              <Button variant="outlined" color="primary" className="btn" onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </Button>
              <img className='thumbnail' src={count == 3 ? "https://img-38se4389gs9838pfsc.s3.amazonaws.com/magic.gif" : wizardIcon} alt="'magic' gif" style={{ visibility: count > 0 ? 'visible': 'hidden'}} />
              <p>Testing site for AWS training</p>
            </div>
            
            <Divider variant="middle" style={{ backgroundColor: "#fff" }} />

            <div className="card">
              <h2>Logs</h2>
              <Logs />
            </div>
          </>
        )
      }
    </Authenticator>
    
  )
}

export default App
