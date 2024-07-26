import React from 'react'
import { Box, Button, Container, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const enumError = {
  'error': 'Error occcured. Please click below to try again',
  'nodiscordlink': 'The provided allyCode is not linked to your discordId',
  'allyCodeNoMatch': 'The allyCode from the game did not match the allyCode you provided',
  'success': 'Game account has been successfully linked'
}
export default function ShowError({ opts = {}, code, setEmail, setCode, allyCode, playerName }){
  function handleClick(){
    setEmail(false)
    setCode(null)
  }
  if(!code || !enumError[code]) return null
  if(code === 'success') return (
    <Container>
      <Box textAlign="center" pt={5} pb={5}>
        <Typography>Your Discord Id was successfully linked to your EA Connect account for Star Wars Galaxy of Heroes for</Typography>
        <Typography>{playerName ? playerName+' with ':''}allyCode {allyCode}.</Typography>
        <Typography>Note: Antytime you run a bot command requiring this login it will temporarly disconnect your device from the game</Typography>
        <Typography>This auth typically needs to be redone if you do not run a command requiring auth daily. This is a limitation by CG</Typography>
      </Box>
    </Container>
  )
  return (
    <Table>
      <TableBody>
        <TableRow><TableCell><Typography>{enumError[code]}</Typography></TableCell></TableRow>
        {code !== 'success' && <TableRow><TableCell><Button variant="contained" onClick={handleClick}>Retry</Button></TableCell></TableRow>}
      </TableBody>
    </Table>
  )
}
