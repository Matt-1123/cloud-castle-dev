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
  const [count, setCount] = useState(0)
  console.log('count', count)
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  // const [name, setName] = useState<Schema["User"]["type"][]>([])

  const thumbnail = document.querySelectorAll(".thumbnail")

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function createPost() {
    client.models.Post.create({ 
      content: window.prompt("Post content")
    })
  }

  // useEffect(() => {
  //   const sub = client.models.User.observeQuery().subscribe({
  //     next: ({ items }) => {
  //       setName([...items]);
  //     },
  //   });

  //   console.log(...name)

  //   return () => sub.unsubscribe();
  // }, []);

  // const createName = async () => {
  //   await client.models.User.create({
  //     name: window.prompt("Enter your name:")
  //   })
  // }

  // const createLog = async () => {
  //   await client.models.Log.create({ content: window.prompt("Enter log:"), createdBy: "User"})
  // }

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
        <h2>Todos</h2>
        <button onClick={createTodo}>+ new</button>
        <Todos />
        
        <h2>Posts</h2>
        <button onClick={createPost}>+ new</button>
        <Posts />
      </div>

      <Divider variant="middle" style={{ backgroundColor: "#fff" }} /> 
      
    </>
  )
}

export default App
