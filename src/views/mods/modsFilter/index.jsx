import { Fragment, useState, useEffect } from 'react';
import { Box, Button, Grid, MenuItem, Modal, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@mui/material';

import { GetStatButton, GetShapeButton, GetIconButton } from './getButtons'
import modStats from './modStats'
import useFilterSet from './useFilterSet'
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function GetSortItems({ array = [] }){
  array.shift()
  console.log(array)
  return(
    <Fragment>
    {array?.map((stat, index)=>(
      <MenuItem key={index} value={stat.id} name={stat.name}>{stat.name}</MenuItem>
    ))}
    </Fragment>
  )

}
export default function ModsFilter({ open, setOpen, modsFilter = {}, setModsFilter, modSort, setModSort }){
  const [ slotFilter, setSlotFilter ] = useFilterSet(6, modsFilter?.slot || [])
  const [ iconFilter, setIconFilter ] = useFilterSet(8, modsFilter?.icon || [])
  const [ priFilter, setPriFilter ] = useFilterSet(11, modsFilter?.pri || [])
  const [ secFilter, setSecFilter ] = useFilterSet(5, modsFilter?.sec || [])
  const [ rarityFilter, setRarityFilter ] = useFilterSet(3, modsFilter?.rarity || [])
  const [ tierFilter, setTierFilter ] = useFilterSet(5, modsFilter?.tier || [])

  const [ sort, setSort ] = useState(modSort || 5)

  useEffect(()=>{
    setModsFilter({ slot: [...slotFilter], icon: [...iconFilter], pri: [...priFilter], sec: [...secFilter], rarity: [...rarityFilter], tier: [...tierFilter] })
  },[slotFilter, iconFilter, priFilter, secFilter, rarityFilter, tierFilter])
  useEffect(()=>{
    setModSort(sort)
  },[sort])
  let sortItems = modStats.sec?.slice(1)


  function handleClose(){
    setModSort(sort)
    setModsFilter({ slot: [...slotFilter], icon: [...iconFilter], pri: [...priFilter], sec: [...secFilter], rarity: [...rarityFilter], tier: [...tierFilter] })

    setOpen(false)
  }
  function handleChange(event){
    setSort(event.target.value)
  }
  return (
    <Modal open={open} onClose={handleClose}>
    <TableContainer sx={modalStyle}>
      <Table>
        <TableHead>
          <TableRow><TableCell sx={{ border: "0px" }} colSpan="2">Mods Filter</TableCell></TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: "0px" }} colSpan="2">
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from({ length: 7 }, (_, i) => i + 1)?.map((slot, index) => (
                  <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <GetShapeButton key={index} slot={slot} filter={slotFilter} onClick={setSlotFilter}/>
                  </Grid>
                ))}
              </Grid>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: "0px" }} colSpan="2">
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from({ length: 9 }, (_, i) => i)?.map((icon, index) => (
                  <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <GetIconButton key={index} icon={icon} filter={iconFilter} onClick={setIconFilter}/>
                  </Grid>
                ))}
              </Grid>
            </TableCell>
          </TableRow>
          <TableRow>
          <TableCell sx={{ border: "0px" }} colSpan="2">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {modStats.pri?.map((pri, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                  <GetStatButton key={index} stat={pri} filter={priFilter} onClick={setPriFilter}/>
                </Grid>
              ))}
            </Grid>
          </TableCell>
          </TableRow>
          <TableRow>
          <TableCell sx={{ border: "0px" }} colSpan="2">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {modStats.sec?.map((sec, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                  <GetStatButton key={index} stat={sec} filter={secFilter} onClick={setSecFilter}/>
                </Grid>
              ))}
            </Grid>
          </TableCell>
          </TableRow>
          <TableRow>
          <TableCell sx={{ border: "0px" }} colSpan="2">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {modStats.rarity?.map((modRarity, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                  <GetStatButton key={index} stat={modRarity} filter={rarityFilter} onClick={setRarityFilter}/>
                </Grid>
              ))}
            </Grid>
          </TableCell>
          </TableRow>
          <TableRow>
          <TableCell sx={{ border: "0px" }} colSpan="2">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {modStats.tier?.map((tier, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                  <GetStatButton key={index} stat={tier} filter={tierFilter} onClick={setTierFilter}/>
                </Grid>
              ))}
            </Grid>
          </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sort</TableCell>
            <TableCell>
              <Select value={sort} onChange={handleChange} label="Sort">
              {sortItems?.map((stat, index)=>(
                <MenuItem key={index} value={stat.id} name={stat.name}>{stat.name}</MenuItem>
              ))}
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Modal>
  )
}
