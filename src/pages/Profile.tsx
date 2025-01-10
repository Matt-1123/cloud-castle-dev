import React from 'react';
import '../App.css';
// icons
// @ts-ignore  
import scrollIcon from '../assets/icons/scroll.png';
//components
import Header from '../components/Header'
// Auth
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <>
      <Header />
      <div className="card">
        <img className="icon-lg" src={scrollIcon} alt="scroll icon" />
        <h2>Bio</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa delectus mollitia sint rerum eveniet, doloremque ipsa, alias animi qui nemo nobis officiis. Placeat, ab pariatur. Doloribus laudantium aperiam alias veniam temporibus ullam animi. Accusantium nisi expedita fuga facere non sit.</p>
      </div>
    </> 
  )
}

export default App
