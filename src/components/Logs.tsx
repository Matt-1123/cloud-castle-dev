import React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

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

    return () => sub.unsubscribe();
  }, []);
  
  const createLog = async () => {
    await client.models.Log.create({
      content: window.prompt("Log content?")
    })
  }

  return (<>
    <Button onClick={createLog}>Submit Log</Button>
    <ul>
      {logs.map(({ id, content }) => (
        <li key={id}>{content}</li>
      ))}
    </ul>
  </>)
}