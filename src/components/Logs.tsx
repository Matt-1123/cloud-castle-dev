import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';

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

export default function LogList() {
  // const [logs, setLogs] = useState<Schema["Log"]["type"][]>([]);
  // const [logs, setLogs] = useState<Array<Schema["Log"]["type"]>>([]);

  // console.log(`logs: ${JSON.stringify(logs)}`)

  // const fetchLogs = async () => {
  //   const { data: items, errors } = await client.models.Log.list();
  //   setLogs(items);
  // };

  return (<>
    <form>
      <label>Enter a log: 
        <input type="text" />
      </label>
    </form>
    {/* <Button onClick={createLog}>Submit Log</Button> */}
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
            {/* {logs.map(({ id, content, createdAt }) => (
              <TableRow key={id}>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{content}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>)
}