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

import { Amplify } from 'aws-amplify'
import outputs from "../../amplify_outputs.json"
const client = generateClient<Schema>()

Amplify.configure(outputs);

export default function LogList() {
  // const [logs, setLogs] = useState<Schema["Log"]["type"][]>([]);
  const [logs, setLogs] = useState<Array<Schema["Log"]["type"]>>([]);

  console.log(`logs: ${JSON.stringify(logs)}`)

  // const fetchLogs = async () => {
  //   const { data: items, errors } = await client.models.Log.list();
  //   setLogs(items);
  // };

  useEffect(() => {
    const sub = client.models.Log.observeQuery().subscribe({
      next: (data) => setLogs([...data.items])
    });
  }, []);
  
  const createLog = () => {
    client.models.Log.create({ content: window.prompt("Enter log:")})
  }

  return (<>
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