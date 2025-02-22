import React from 'react';
import '../App.css';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useState, useEffect } from "react";
// import Button from '@mui/material/Button';

//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Amplify } from 'aws-amplify'
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import outputs from "../../amplify_outputs.json"

Amplify.configure(outputs);

const client = generateClient<Schema>()

export default function Posts() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  
  const editTodo = (id: string) => {
    client.models.Todo.update({ id, content: window.prompt("update your to-do") })
  }

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  return (<>
    {/* <Button onClick={createLog}>Submit Log</Button> */}
    <div className="card">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell >Task</TableCell>              
              <TableCell ></TableCell>              
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map(({ id, content, createdAt }) => (
              <TableRow key={id}>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{content}</TableCell>
                <TableCell className="table-right">
                  <button onClick={() => editTodo(id)}>Edit</button>
                  <button onClick={() => deleteTodo(id)}>Completed</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>)
}