import React from 'react'


import { Button, FormControl, MenuItem, Modal, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';

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
export default function AddBonusZone({ open, setOpen, platoons = [], tbDay, setBonusZone }){

  const handleChange = (event)=>{
    setBonusZone(tbDay, event.target.value)
  }
  return (
    <Modal open={open} onClose={()=>setOpen(false)}>
      <TableContainer sx={style}>
      <Table>
        <TableHead>
          <TableRow><TableCell colSpan="2"><Typography>{`Add Bonus platoon for day ${tbDay}`}</Typography></TableCell></TableRow>
        </TableHead>
        <TableBody>
          <TableRow><TableCell>
          <FormControl>
          <Select value={1} onChange={handleChange}>
            <MenuItem value={1} key='temp'>Please Select Bonus Zone...</MenuItem>
            {platoons?.map((item, index)=>(
              <MenuItem value={item.id} key={index}>{item.id+' '+item.nameKey}</MenuItem>
            ))}
          </Select>
          </FormControl>
          </TableCell></TableRow>
          <TableRow><TableCell><Button variant="contained" onClick={()=>setOpen(false)}>Cancel</Button></TableCell></TableRow>
        </TableBody>
      </Table>
      </TableContainer>
    </Modal>
  )
}
