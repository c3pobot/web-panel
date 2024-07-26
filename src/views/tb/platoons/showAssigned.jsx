import React from 'react'
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShowAssigned({ open, setOpen, assignedUnits = [], handleClick, platoon, squad }){
  if(!assignedUnits || assignedUnits.length === 0) return
  return (
    <Modal open={open} onClose={()=>setOpen(false)}>
      <TableContainer sx={style}>
      <Table>
        <TableHead>
          <TableRow><TableCell colSpan="2"><Typography>{`Assigned Unit(s) for squad ${squad.num} in ${platoon.id}`}</Typography></TableCell></TableRow>
        </TableHead>
        <TableBody>
        {assignedUnits?.length > 0 && assignedUnits.map((unit, index)=>(
          <TableRow key={index}><TableCell><Typography>{`${unit.nameKey} - ${unit.player}`}</Typography></TableCell><TableCell><Button variant="contained" onClick={()=>handleClick('single', unit)}>Remove</Button></TableCell></TableRow>
        ))}
        <TableRow><TableCell><Button variant="contained" onClick={()=>setOpen(false)}>Cancel</Button></TableCell><TableCell><Button variant="contained" onClick={()=>handleClick('all')}>Remove All</Button></TableCell></TableRow>
        </TableBody>
      </Table>
      </TableContainer>
    </Modal>
  )
}
