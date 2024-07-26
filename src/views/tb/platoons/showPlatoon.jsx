import React, { Fragment, useState } from 'react'
import { Button, TableRow, TableCell, Typography } from '@mui/material';

import ShowSquad from './showSquad'
const conflictSx = {
  bgcolor: 'white',
  color: 'black'
}

export default function ShowPlatoon({ platoon = {}, updatePlatoon, updateSquad, updateUnit, removeAssigned }){
  const [ show, setShow ] = useState(platoon.points === platoon.totalPoints ? false:true)

  function showSquads(){
    if(show) setShow(false)
    if(!show) setShow(true)
  }

  return (
    <Fragment>
    <TableRow>
    <TableCell sx={conflictSx} onClick={()=>updatePlatoon(platoon)}><Typography>{platoon.id+' '+platoon.type+' '+platoon.nameKey+' ('+platoon.points?.toLocaleString()+'/'+platoon.totalPoints?.toLocaleString()+')'+(platoon.exclude ? ' Excluded':(platoon.prefilled ? ' Prefilled':''))}</Typography></TableCell>
    <TableCell sx={conflictSx}></TableCell>
    <TableCell sx={conflictSx}>{!platoon.exclude && !platoon.prefilled && <Button variant="contained" onClick={showSquads}>{show ? 'Hide':'Show'} Squads</Button>}</TableCell>
    </TableRow>
    {show && platoon.squads.map((squad, index)=>(<ShowSquad key={index} platoon={platoon} squad={squad} updateSquad={updateSquad} updateUnit={updateUnit} removeAssigned={removeAssigned}/>))}
    </Fragment>
  )
}
