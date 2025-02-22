import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../App.css';
// icons
// @ts-ignore  
import scrollIcon from '../assets/icons/scroll.png';
//components
import Header from '../components/Header'
import Button from '@mui/material/Button';
// Auth
import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../amplify_outputs.json";
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
const client = generateClient<Schema>()

Amplify.configure(outputs);

function Profile() {
  // const [userprofiles, setUserProfiles] = useState([]);
  const [userProfiles, setUserProfiles] = useState<Array<Schema["UserProfile"]["type"]>>([]);
  const [lwaData, setlwaData] = useState([]);

  // https://developer.amazon.com/en-US/docs/alexa/account-linking/app-to-app-account-linking-starting-from-your-app.html#step-4
  const fetchData = async () => {    

    try {
      
      // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      const response = await axios({
        method: 'get',
        url: `/api`,
        withCredentials: false,
      })
      // setlwaData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    client.models.UserProfile.observeQuery().subscribe({
      next: (data) => 
        // console.log("data", JSON.stringify(data.items[0])),
        setUserProfiles(data.items)
        // example response:
        //data [{"id":<string>,"email": <string>,"profileOwner": <string>, "gold": <int>,"createdAt":"2025-01-12T22:54:15.183Z","updatedAt":"2025-01-12T22:54:15.183Z"}]
    });
  }, []);

  // Alternative to observeQuery (subscription)
  // async function fetchUserProfile() {
  //   const { data: profiles } = await client.models.UserProfile.list();
  //   setUserProfiles(profiles);
  // }
  
  return (
    <>
      <Header />
      <div className="card">
        <img className="icon-lg" src={scrollIcon} alt="scroll icon" />
        <p>Gold: {userProfiles[0]? userProfiles[0].gold : ""}</p>
        <h2>Bio</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa delectus mollitia sint rerum eveniet, doloremque ipsa, alias animi qui nemo nobis officiis. Placeat, ab pariatur. Doloribus laudantium aperiam alias veniam temporibus ullam animi. Accusantium nisi expedita fuga facere non sit.</p>
      </div>
      <div className="card">
        <Button variant="outlined" color="primary" className="btn" onClick={() => fetchData()}>
          Link with Alexa
        </Button>
      </div>
    </> 
  )
}

export default Profile