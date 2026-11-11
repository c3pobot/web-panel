import React, { Fragment, useState, useEffect } from 'react';
import { Box, Button, Tab, Tabs, Table, TableHead, TableContainer, TableBody, TableRow, TableCell, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

import ApiRequest from 'components/apiRequest'
import AllyCodeSelector from 'views/tb/allyCodeSelector'

import DB from 'components/db'
import useLocalStorage from 'components/useLocalStorage'
import sorter from 'components/stableSort'
import getTimeSince from 'components/getTimeSince'

import NavButtons from './navButtons'
import Inventory from './inventory'
import ModsFilter from './modsFilter/index'
import fetchPlayerData from './fetchPlayerData'
import filterMods from './filterMods'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const enumPath = {'/inventory': 0}
export default function Mods (opts = {}) {

  const { discordId, setAlert, setSpinner } = opts;
  const [ allyCode, setAllyCode ] = useLocalStorage('mods-allyCode')
  const [ selectedTab, setSelectedTab ] = useLocalStorage('mods-home', 0);

  const [ player, setPlayer ] = useState({})
  const [ inventory, setInventory ] = useState({})
  const [ mods, setMods ] = useState([])
  const [ sortedMods, setSortedMods ] = useState([])
  const [ modSort, setModSort ] = useLocalStorage('mods-sort', 5)
  const [ roster, setRoster ] = useState({})

  const [ modsFilter, setModsFilter ] = useLocalStorage('mods-filter', { slot: [], icon: [] })
  const [ openModsFilter, setOpenModsFilter ] = useState(false)
  const [ openUnitFilter, setOpenUnitFilter ] = useState(false)

  useEffect(()=>{
    if(allyCode) getPlayerData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[allyCode])
  useEffect(()=>{
    sortMods()
  },[modSort])
  useEffect(()=>{
    filterMods(mods, modsFilter, modSort, setSortedMods)
  }, [modsFilter])
  function handleSelectTab(event, newValue){
    setSelectedTab(newValue);
  };
  async function getPlayerData(force = false){
    if(!allyCode) return
    setSpinner(true)
    let data = await fetchPlayerData(allyCode, discordId, force)
    if(data.player){
      setPlayer(data.player)
      setMods(data.mods || [])
      setRoster(data.roster || {})
      filterMods(data.mods, modsFilter, modSort, setSortedMods)
    }
    setSpinner(false)
  }
  function sortMods(modArray){
    let tempMods = sorter((modArray || sortedMods) || [], 'desc', `${modSort}-value`)
    setSortedMods(tempMods)
  }
  function openFilter(){
    if(selectedTab == 0) setOpenModsFilter(true)
    if(selectedTab == 1) setOpenUnitFilter(true)
  }

  if(!allyCode) return(
    <AllyCodeSelector opts={opts} allyCode={allyCode} setAllyCode={setAllyCode}/>
  )

  return (
    <Fragment>
    {openModsFilter && <ModsFilter open={openModsFilter} setOpen={setOpenModsFilter} modsFilter={modsFilter} setModsFilter={setModsFilter} modSort={modSort} setModSort={setModSort}/>}
    <Table sx={{ position: "fixed" }}>
      <TableBody>
        <TableRow sx={{ height: "65px", textAlign: 'center', padding: "0px", border: "0px" }}>
          <TableCell>
            <Tabs value={selectedTab} onChange={handleSelectTab} aria-label="basic tabs example">
              <Tab label="Inventory" {...tabProps(0)} />
              <Tab label="Units" {...tabProps(1)} />
            </Tabs>
          </TableCell>
          <TableCell><Button variant="contained" sx={{display: 'inline'}} onClick={openFilter}>Filter</Button></TableCell>
          <TableCell><Tooltip title={`Updated ${getTimeSince(player?.updated)} ago`}><Button variant="contained" onClick={()=>getPlayerData(true)} sx={{display: 'inline'}} >Refresh Data</Button></Tooltip></TableCell>
          <TableCell><Tooltip title={`Updated ${getTimeSince(inventory?.updated)} ago`}><Button variant="contained" sx={{display: 'inline'}} >Refresh Inventory</Button></Tooltip></TableCell>
        </TableRow>
        {sortedMods?.length > 0 && <TableRow>
          <TableCell colSpan="4">
            <TabPanel value={selectedTab} index={0}>
              <Inventory mods={sortedMods} modSort={modSort}/>
            </TabPanel>
          </TableCell>
        </TableRow>}
      </TableBody>
    </Table>
    </Fragment>
  )
}
