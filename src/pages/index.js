import React, { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

export default function Home() {
  const [todo, setTodo] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const jsonId = await fetch('/.netlify/functions/create-todo',{
      method: 'post',
      body: JSON.stringify(todo)
    })
    const data = jsonId.json()
    console.log(data);

  }

  return (
    <Box
      component="form"
      sx={{
       width: '100%',
       height: '100vh',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center'
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
      <TextField
       rows={4} 
       color="secondary" 
       name="message"
        id="message"
        value={todo}
         onChange={e => setTodo(e.target.value)}
           label="Enter Text"
            variant="outlined" 
            />
      <Button variant="contained" type='submit'>Submit</Button>
      </form>
    </Box>
    )
}
