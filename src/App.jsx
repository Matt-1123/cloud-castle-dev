import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const thumbnail = document.querySelectorAll(".thumbnail")
  console.log(thumbnail);

  // setCount > 0 ? 

  return (
    // <html><body><h1>Welcome to Cloud Castle Dev</h1><p>Testing site for AWS training</p><img src='https://img-38se4389gs9838pfsc.s3.amazonaws.com/magic.gif' alt='magic meme' style='width:240px;height:240px;'></body></html>
    
    <>
      <h1>Cloud Castle Dev</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <img className='thumbnail' src="https://img-38se4389gs9838pfsc.s3.amazonaws.com/magic.gif" alt="'magic' gif" style={{ visibility: count > 0 ? 'visible': 'hidden'}} />
        <p>Testing site for AWS training</p>
      </div>
    </>
  )
}

export default App
