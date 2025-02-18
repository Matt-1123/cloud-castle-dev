import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
// icons
// @ts-ignore  
import gateIcon from '../assets/icons/gate.png';
// @ts-ignore  
import wizardIcon from '../assets/icons/wizard.png';
//components
import Header from '../components/Header'
import Posts from '../components/Posts'
import Todos from '../components/Todos'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// Auth
import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../../amplify_outputs.json";
// Data
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
const client = generateClient<Schema>()

Amplify.configure(outputs);

function App() {
  const [count, setCount] = useState(0);
  // const [userProfiles, setUserProfiles] = useState<Array<Schema["UserProfile"]["type"]>>([]);
  const [userProfiles, setUserProfiles] = useState<Schema["UserProfile"]["type"]>();
  console.log('userProfiles: ', userProfiles)

  const thumbnail = document.querySelectorAll(".thumbnail")

  // const addGold = async (num) => {

  // }
  
  

  async function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
    // let userProfilesCopy = [...userProfiles];
    // ignore "object is possibly 'null' or 'undefined'" typescript error
    //@ts-ignore
    // userProfilesCopy[0].gold++;
    // setUserProfiles(userProfilesCopy);
    console.log('userProfiles', userProfiles)
    
    const { data, errors } = await client.mutations.addGold({
      goldAmount: 1
    });

    // const editTodo = (id: string) => {
    //   client.models.Todo.update({ id, content: window.prompt("update your to-do") })
    // }

    // const { data: updatedTodo, errors } = await client.models.Todo.update(todo);
    
    // client.models.UserProfile.update(userProfiles)
    
    // userProfiles.map(profile => {
    //   console.log(profile)
    //   const 
    //   if (profile.gold || profile.gold === 0) {
    //     console.log('here be gold')
    //     profile.gold += 2;
    //     console.log('profile.gold: ', profile.gold)
    //   }
    // })
  }
    // ********* 
    // https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays



    // setUserProfiles({
    //   ...userProfiles,
    //   userProfiles[0].gold: userProfiles[0].gold + 2
    // })

    // this.setState(prevState => ({
    //   jasper: {                   // object that we want to update
    //       ...prevState.jasper,    // keep all other key-value pairs
    //       name: 'something'       // update the value of specific key
    //   // }


      // function handleClick() {
      //   const nextShapes = shapes.map(shape => {
      //     if (shape.type === 'square') {
      //       // No change
      //       return shape;
      //     } else {
      //       // Return a new circle 50px below
      //       return {
      //         ...shape,
      //         y: shape.y + 50,
      //       };
      //     }
      //   });
      //   // Re-render with the new array
      //   setShapes(nextShapes);
      // }


  
  // async function createTodo() {
  //   await client.models.Todo.create({ content: window.prompt("Todo content") });
  //   // console.log(userProfiles[0].gold);
  //   userProfiles[0].gold += 2;
  // }

  const editTodo = (id: string) => {
    client.models.Todo.update({ id, content: window.prompt("update your to-do") })
  }

  function createPost() {
    client.models.Post.create({ 
      content: window.prompt("Post content")
    })
  }

  useEffect(() => {
    client.models.UserProfile.observeQuery().subscribe({
      next: (data) => 
        console.log('remove')
        // setUserProfiles(data.items)
        // example response:
        //data [{"id":<string>,"email": <string>,"profileOwner": <string>, "gold": <int>,"createdAt":"2025-01-12T22:54:15.183Z","updatedAt":"2025-01-12T22:54:15.183Z"}]
    });
  }, []);

  return (
    <>
      {/* <Header user={user}/> */}
      <Header />
      <div className="card">
        <img className="icon-lg" src={gateIcon} alt="gate icon" />
        {/* <p>Hello {user?.username}</p> */}
        {/* <p>Hello {name[name.length - 1]?.name}</p> */}
        {/* <Button onClick={createName}>Add your name</Button> */}
        <Button variant="outlined" color="primary" className="btn" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <img className='thumbnail' src={count == 3 ? "https://img-38se4389gs9838pfsc.s3.amazonaws.com/magic.gif" : wizardIcon} alt="'magic' gif" style={{ visibility: count > 0 ? 'visible': 'hidden'}} />
        <p>Testing site for AWS training</p>
      </div>
      
      <div className="card">
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Todos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <h2>Todos</h2>
            <button onClick={createTodo}>+ new</button>
            <Todos />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Posts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <h2>Posts</h2>
            <button onClick={createPost}>+ new</button>
            <Posts />
          </AccordionDetails>
        </Accordion>
      </div>

      <Divider variant="middle" style={{ backgroundColor: "#fff" }} /> 
      
    </>
  )
}

export default App
