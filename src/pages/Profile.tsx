import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
// icons
// @ts-ignore  
import scrollIcon from '../assets/icons/scroll.png';
//components
import Header from '../components/Header'
// Auth
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../amplify_outputs.json";
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
const client = generateClient<Schema>()

Amplify.configure(outputs);

function Profile() {
  const [gold, setGold] = useState()
  
  
  useEffect(() => {
    client.models.User.observeQuery().subscribe({
      next: (data) => 
        console.log(JSON.stringify(data.items))
        // setGold(data.items.values[0]),
    });
  }, []);

  return (
    <>
      <Header />
      <div className="card">
        <img className="icon-lg" src={scrollIcon} alt="scroll icon" />
        <p>Gold: {gold}</p>
        <h2>Bio</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa delectus mollitia sint rerum eveniet, doloremque ipsa, alias animi qui nemo nobis officiis. Placeat, ab pariatur. Doloribus laudantium aperiam alias veniam temporibus ullam animi. Accusantium nisi expedita fuga facere non sit.</p>
      </div>
    </> 
  )
}

export default Profile