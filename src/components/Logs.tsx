import React from 'react';
import Button from '@mui/material/Button';
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()

export default function TodoList() {
  const createLog = async () => {
    await client.models.Log.create({
      content: window.prompt("Log content?")
    })
  }

  return (
    <Button onClick={createLog}>Submit Log</Button>
  )
}