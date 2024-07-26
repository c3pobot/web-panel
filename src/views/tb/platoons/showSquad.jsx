import React, { Fragment, useState } from 'react'
import { Button, TableRow, TableCell, Typography } from '@mui/material';
import ShowUnits from './showUnits'
import ShowAssigned from './showAssigned'
const squadSx = {
  bgcolor: 'gray'
}

export default function ShowSquad({ platoon = {}, squad = {}, updateSquad, updateUnit, removeAssigned }){
  const [ show, setShow ] = useState(squad.points > 0 ? false:true)
  const [ openAssigned, setOpenAssigned ] = useState(false)
  function handleRemoveAssigned(cmd, unit){
    setOpenAssigned(false)
    removeAssigned(cmd, unit, platoon, squad)
  }
  function showUnits(){
    if(show) setShow(false)
    if(!show) setShow(true)
  }
  let assignedUnits = squad?.units?.filter(x=>x.assigned) || []

  return(
    <Fragment>
      {openAssigned && <ShowAssigned open={openAssigned} setOpen={setOpenAssigned} assignedUnits={assignedUnits} handleClick={handleRemoveAssigned} platoon={platoon} squad={squad}/>}
      <TableRow>
        <TableCell sx={squadSx} onClick={()=>updateSquad({platoonId: platoon.id, squad: squad})}>
          <Typography>{platoon.type+' '+platoon.nameKey+' Squad '+squad.num+(platoon?.rarity ? ' '+platoon.rarity+'*':'')+(platoon?.relicTier > 3 ? ' R'+(platoon.relicTier - 2):'')+' ('+squad.points?.toLocaleString()+') '+(squad.exclude ? ' Excluded':(squad.prefilled ? ' Prefilled':''))}</Typography>
        </TableCell>
        <TableCell sx={squadSx}>{assignedUnits?.length > 0 && <Button variant="contained" onClick={()=>setOpenAssigned(true)}>Show Assigned</Button>}</TableCell>
        <TableCell sx={squadSx}>{!squad.exclude && !squad.prefilled && <Button variant="contained" onClick={showUnits}>{show ? 'Hide':'Show'} Units</Button>}</TableCell>
      </TableRow>
      {show && squad?.units?.length > 0 && <ShowUnits platoon={platoon} squad={squad} units={squad.units || []} updateUnit={updateUnit}/>}
    </Fragment>
  )
}
