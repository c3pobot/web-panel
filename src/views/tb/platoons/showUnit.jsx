import React from 'react'
import { Grid, Table, TableBody, TableRow, TableCell, Typography } from '@mui/material';
const unitFilled = {
  //bgcolor: '#00b3ff'
  bgcolor: '#91d4ff'
}
const unitFilledText = {
  color: 'black',
  fontWeight: 'bolder'
}
const unitNotFilled = {
  bgcolor: '#e90e0e'

}
const unitNotFilledText = {
  color: 'white',
  fontWeight: 'bolder'
}
export default function ShowUnit({ index, platoon = {}, squad = {}, unit = {}, updateUnit = {} }){
  let playerName = unit.player
  if(unit.assigned) playerName += ' (A)'
  return (
    <Grid item xs={12} md={4} key={index} onClick={()=>updateUnit({platoonId: platoon.id, squad: squad, unit: unit, relicTier: platoon.relicTier, rarity: platoon.rarity})}>
      <Table>
        <TableBody>
          <TableRow><TableCell sx={unit.player ? unitFilled:unitNotFilled}><Typography sx={unit.player ? unitFilledText:unitNotFilledText}>{unit.nameKey+' - '+(unit.player ? playerName:'NONE - ('+unit.available+'/'+(unit.count || 0)+')')}</Typography></TableCell></TableRow>
        </TableBody>
      </Table>
    </Grid>
  )
}
