import React from 'react'
import { Grid, TableRow, TableCell } from '@mui/material';

import ShowUnit from './showUnit'

export default function ShowUnits({ platoon, squad, units = [], updateUnit }){
  return (
    <TableRow><TableCell colSpan="3"><Grid container spacing={1}>{units.map((unit, index)=>(<ShowUnit key={index} index={index} platoon={platoon} squad={squad} unit={unit} updateUnit={updateUnit} />))}</Grid></TableCell></TableRow>
  )
}
