import ButtonNav from 'components/buttonNav'
import { Button, Table, TableBody, TableCell, TableRow, Typography} from '@mui/material';

export default function NoBotLink (){
  return (
    <Table>
      <TableBody>
        <TableRow><TableCell><Typography textAlign="center">You must have allyCode linked to discordId to see this page.</Typography></TableCell></TableRow>
        <TableRow><TableCell><Typography textAlign="center"><Button onClick={()=>ButtonNav('/allyCodes')} variant="contained">Link allyCode</Button></Typography></TableCell></TableRow>
      </TableBody>
    </Table>
  )
}
