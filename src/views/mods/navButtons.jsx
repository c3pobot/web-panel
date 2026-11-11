import { Box, Button } from '@mui/material';
export default function NavButtons({}){
  return (
    <header style={{"position": "sticky"}}>
      <Box>
        <Button variant="contained" sx={{display: 'inline'}} >{'Player Data as of ago Click to refresh'}</Button>
        <Button variant="contained" sx={{display: 'inline'}} >{'Inventory Data as of ago Click to refresh'}</Button>
      </Box>
    </header>
  )
}
/*
<TableRow>
          <TableCell sx={{textAlign: 'center', padding: "0px", border: "0px"}} ><Button variant="contained" onClick={()=>getPlayerData(true)} sx={{display: 'inline'}} >{'Player Data as of '+(getTimeSince(player?.updated))+' ago Click to refresh'}</Button></TableCell>
          <TableCell sx={{textAlign: 'center', padding: "0px", border: "0px"}} ><Button variant="contained" sx={{display: 'inline'}} >{'Inventory Data as of '+(getTimeSince(inventory?.updated))+' ago Click to refresh'}</Button></TableCell>
        </TableRow>
*/
