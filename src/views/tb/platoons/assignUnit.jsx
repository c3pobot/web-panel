import React, { useState } from 'react'
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
function getPlayerName(player){
  let res = player.name
  if(player.relic) res += ` R${player.relic - 2}`
  return res
}
export default function AssignUnit({ open, setOpen, data = {}, changeUnitAssign, member = [] }){
  const [ selectValue, setSelectValue ] = useState('initial')
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  function handleSubmit(){
    changeUnitAssign('add', selectValue, { platoonId: data.platoonId, squadNum: data.squad?.num, baseId: data.unit?.baseId, nameKey: data.unit?.nameKey })
  }
  function removeAssignment(playerId){
    changeUnitAssign('remove', playerId, { platoonId: data.platoonId, squadNum: data.squad?.num, baseId: data.unit?.baseId, nameKey: data.unit?.nameKey })
  }
  let unitsAssigned = data.squad?.unitConfig?.find(x=>x.baseId === data.unit?.baseId)?.players || []
  let assignedPlayers = unitsAssigned.map(x=>{
    let player = member.find(m=>m.playerId === x)
    return {
      playerId: x,
      name: player.name
    }
  }) || []
  let availablePlayers = member.filter(x=>!unitsAssigned.includes(x.playerId) && x.rosterUnit?.filter(y=>y.definitionId?.startsWith(`${data.unit?.baseId}:`) && y.currentRarity >= data.rarity && (!y.relic || y.relic?.currentTier >= data.relicTier)).length > 0).map(x=>{
    let unit = x.rosterUnit.find(y=>y.definitionId?.startsWith(`${data.unit?.baseId}:`))
    return { playerId: x.playerId, name: x.name, relic: unit.relic?.currentTier }
  })

  return (
    <Modal open={open} onClose={()=>setOpen(false)}>
      <TableContainer sx={style}>
      <Table>
        <TableHead>
          <TableRow><TableCell colSpan="2"><Typography>Assigne Unit {data.unit?.nameKey} for {data.squad?.nameKey} Squad {data.squad?.num}</Typography></TableCell></TableRow>
        </TableHead>
        <TableBody>
        <TableRow><TableCell>
        <FormControl>

        <Select value={selectValue} onChange={handleChange}>
          <MenuItem value="initial">Select player...</MenuItem>
          {availablePlayers?.map((player, index)=>(
            <MenuItem value={player.playerId} key={index}>{getPlayerName(player)}</MenuItem>
          ))}
        </Select>
        </FormControl>
        </TableCell>
        <TableCell>{selectValue !== 'initial' &&<Button variant="contained" onClick={handleSubmit}>Add</Button>}</TableCell>
        </TableRow>
        {assignedPlayers?.length > 0 && assignedPlayers.map((player, index)=>(
          <TableRow key={index}><TableCell><Typography>{player.name}</Typography></TableCell><TableCell><Button variant="contained" onClick={()=>removeAssignment(player.playerId)}>Remove</Button></TableCell></TableRow>
        ))}
        <TableRow><TableCell><Button variant="contained" onClick={()=>setOpen(false)}>Cancel</Button></TableCell></TableRow>
        </TableBody>
      </Table>
      </TableContainer>
    </Modal>
  )
}
