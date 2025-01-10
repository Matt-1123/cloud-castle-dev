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
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// Logs
import Logs from '../components/Logs'
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
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  // const [name, setName] = useState<Schema["User"]["type"][]>([])
  console.log(`name: ${JSON.stringify(name)}`);

  const thumbnail = document.querySelectorAll(".thumbnail")

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
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
      
      <Divider variant="middle" style={{ backgroundColor: "#fff" }} />

      <div className="card">
        <h2>Todos</h2>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => (
            <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
          ))}
        </ul>
        {/* <Button onClick={createLog}>Submit Log (home pag test)</Button> */}

        {/* <Logs /> */}
      </div>
    </>
  )
}

export default App
