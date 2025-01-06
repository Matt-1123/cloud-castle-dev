import React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const client = generateClient<Schema>()

export default function LogList() {
  const [logs, setLogs] = useState<Schema["Log"]["type"][]>([]);

  // const fetchLogs = async () => {
  //   const { data: items, errors } = await client.models.Log.list();
  //   setLogs(items);
  // };

  useEffect(() => {
    const sub = client.models.Log.observeQuery().subscribe({
      next: ({ items }) => {
        setLogs([...items]);
      },
    });

    console.log(...logs)

    return () => sub.unsubscribe();
  }, []);
  
  const createLog = async () => {
    await client.models.Log.create({
      content: window.prompt("Log content?")
    })
  }

  return (<>
    <form>
      <label>Enter a log: 
        <input type="text" />
      </label>
    </form>
    <Button onClick={createLog}>Submit Log</Button>
    <div className="card">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell >Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map(({ id, content, createdAt }) => (
              <TableRow key={id}>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>)
}