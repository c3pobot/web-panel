import { Box, Grid, Paper } from '@mui/material';

import ShowMods from './showMods'
export default function Inventory({ mods = [], modSort }) {
  return (
    <ShowMods mods={mods} modSort={modSort} />
  )
}
