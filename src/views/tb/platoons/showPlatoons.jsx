import React, { useState } from 'react'
import { Table, TableBody } from '@mui/material';
import DB from 'components/db'

import AssignUnit from './assignUnit'
import EditSquad from './editSquad'
import EditPlatoon from './editPlatoon'
import EditUnit from './editUnit'
import ShowPlatoon from './showPlatoon'

export default function ShowPlatoons({ opts = {}, platoonMap = [], tbId, pDef = [], platoonIds = [], setPlatoonIds, tbDay, member = []}){
  const { setSpinner, setAlert } = opts;
  const [ openSquadEdit, setSquadEditOpen ] = useState(false)
  const [ editSquad, setEditSquad ] = useState(null)
  const [ openPlatoonEdit, setPlatoonEditOpen ] = useState(false)
  const [ editPlatoon, setEditPlatoon ] = useState(null)
  const [ openUnitEdit, setUnitEditOpen ] = useState(false)
  const [ editUnit, setEditUnit ] = useState(null)
  const [ openUnitAssign, setUnitAssignOpen ] = useState(false)

  function updateSquad(data = {}){
    if(data?.platoonId && data.squad.num){
      setEditSquad(data)
      setSquadEditOpen(true)
    }
  }
  function updatePlatoon(platoon = {}){
    if(platoon.id){
      setEditPlatoon(platoon)
      setPlatoonEditOpen(true)
    }
  }
  function updateUnit(data = {}){
    if(data.platoonId){
      setEditUnit(data)
      setUnitEditOpen(true)
    }
  }
  async function updatePlatoonDb(key, data = []){
    let tempObj = await DB.get(key)
    if(tempObj?.data){
      tempObj.data = data
      await DB.set(key, tempObj)
    }
  }
  async function changeSquad(opt = null, platoonId, num){
    setSpinner(true)
    setSquadEditOpen(false)
    setEditSquad(false)
    let tempPlatoonIds = JSON.parse(JSON.stringify(platoonIds))
    let platoonIndex = tempPlatoonIds?.findIndex(x=>x.id === platoonId)
    if(platoonIndex >= 0){
      if(!tempPlatoonIds[platoonIndex].squads) tempPlatoonIds[platoonIndex].squads = []
      let squad = { num: num, unitConfig: [] }
      let squadIndex = tempPlatoonIds[platoonIndex].squads?.findIndex(x=>x?.num === num)
      if(squadIndex >= 0) squad = tempPlatoonIds[platoonIndex].squads[squadIndex]
      if(!squad?.unitConfig) squad.unitConfig = []
      if(!opt){
        squad.exclude = false
        squad.prefilled = false
      }else{
        if(opt === 'exclude'){
          squad.exclude = true
          squad.prefilled = false
        }
        if(opt === 'prefilled'){
          squad.exclude = false
          squad.prefilled = true
        }
      }

      if(squadIndex >= 0){
        tempPlatoonIds[platoonIndex].squads[squadIndex] = squad
      }else{
        tempPlatoonIds[platoonIndex].squads.push(squad)
      }
      await updatePlatoonDb('tbPlatoonIds-'+tbDay+'-'+tbId, tempPlatoonIds)
      setPlatoonIds(tempPlatoonIds)
    }
    setSpinner(false)
  }
  async function changePlatoon(opt = null, oldId, newId){
    setSpinner(true)
    setPlatoonEditOpen(false)
    setEditPlatoon(false)
    let tempPlatoonIds = JSON.parse(JSON.stringify(platoonIds))
    let index = tempPlatoonIds?.findIndex(x=>x.id === oldId)
    if(index >= 0){
      if(!opt){
        tempPlatoonIds[index].exclude = false
        tempPlatoonIds[index].prefilled = false
      }else{
        if(opt === 'exclude'){
          tempPlatoonIds[index].exclude = true
          tempPlatoonIds[index].prefilled = false
        }
        if(opt === 'prefilled'){
          tempPlatoonIds[index].exclude = false
          tempPlatoonIds[index].prefilled = true
        }
      }
      if(newId){
        tempPlatoonIds[index].id = newId
        tempPlatoonIds[index].squads = []
      }
      await updatePlatoonDb('tbPlatoonIds-'+tbDay+'-'+tbId, tempPlatoonIds)
      setPlatoonIds(tempPlatoonIds)
    }
    setSpinner(false)
  }
  async function changeUnit(prefilled = false, data = {}){
    setSpinner(true)
    setUnitEditOpen(false)
    setEditUnit(null)
    let tempPlatoonIds = JSON.parse(JSON.stringify(platoonIds))
    const pIndex = tempPlatoonIds?.findIndex(x=>x.id === data.platoonId)
    if(pIndex >= 0){
      if(!tempPlatoonIds[pIndex].squads) tempPlatoonIds[pIndex].squads = []
      let squad = {num: data.squadNum, unitConfig: []}, unit = { baseId: data.baseId, prefilled: 0, players: [] }
      const sIndex = tempPlatoonIds[pIndex]?.squads?.findIndex(x=>x.num === data.squadNum)
      if(sIndex >= 0) squad = tempPlatoonIds[pIndex].squads[sIndex]
      if(!squad?.unitConfig) squad.unitConfig = []
      const uIndex = squad?.unitConfig?.findIndex(x=>x.baseId === data.baseId)
      if(uIndex >= 0) unit = squad.unitConfig[uIndex]
      if(prefilled){
        unit.prefilled++
      }else{
        unit.prefilled--
        if(unit.prefilled < 0) unit.prefilled = 0
      }
      if(uIndex >= 0){
        squad.unitConfig[uIndex] = unit
      }else{
        squad.unitConfig.push(unit)
      }
      if(sIndex >= 0){
        tempPlatoonIds[pIndex].squads[sIndex] = squad
      }else{
        tempPlatoonIds[pIndex].squads.push(squad)
      }
      await updatePlatoonDb('tbPlatoonIds-'+tbDay+'-'+tbId, tempPlatoonIds)
      setPlatoonIds(tempPlatoonIds)
    }
    setSpinner(false)
  }
  async function removeBonusPlatoon(id){
    setSpinner(true)
    setPlatoonEditOpen(false)
    setEditPlatoon(false)
    let tempPlatoonIds = JSON.parse(JSON.stringify(platoonIds.filter(x=>x.id !== id)))
    await updatePlatoonDb('tbPlatoonIds-'+tbDay+'-'+tbId, tempPlatoonIds)
    setPlatoonIds(tempPlatoonIds)
    setSpinner(false)
  }
  function assignUnit(openModal){
    if(!openModal) return
    setUnitEditOpen(false)
    setUnitAssignOpen(true)
  }
  async function removeAssigned(method, unit, platoon, squad){
    if(!method) return
    setSpinner(true)
    let tempPlatoonIds = JSON.parse(JSON.stringify(platoonIds))
    let pIndex = tempPlatoonIds?.findIndex(x=>x.id === platoon.id), sIndex, tempSquad
    if(pIndex >= 0) sIndex = tempPlatoonIds[pIndex]?.squads?.findIndex(x=>x.num === squad.num)
    if(sIndex >= 0) tempSquad = tempPlatoonIds[pIndex].squads[sIndex]
    if(!tempSquad){
      setSpinner(false)
      return
    }
    for(let i in tempSquad.unitConfig){
      if(method === 'all'){
        tempSquad.unitConfig[i].players = []
      }else{
        if(tempSquad.unitConfig[i].baseId === unit?.baseId) tempSquad.unitConfig[i].players = tempSquad.unitConfig[i].players?.filter(x=>x !== unit.playerId) || []
      }
    }
    tempPlatoonIds[pIndex].squads[sIndex] = tempSquad
    await updatePlatoonDb('tbPlatoonIds-'+tbDay+'-'+tbId, tempPlatoonIds)
    setPlatoonIds(tempPlatoonIds)
    setSpinner(false)
    if(method === 'all') setAlert({ type: 'success', msg: `all forced assignements for ${platoon.id} where removed`})
    if(method === 'single') setAlert({ type: 'success', msg: `${unit?.player} was un-assigned ${unit?.nameKey} for squad ${squad.num} in ${platoon.id}`})

  }
  async function changeUnitAssign(method, playerId, data = {}){
    if(!method) return
    setSpinner(true)
    setUnitAssignOpen(false)
    if(playerId === 'initial'){
      setEditUnit(null)
      setSpinner(false)
      return
    }

    let guildMember = member.find(x=>x.playerId === playerId)
    if(!guildMember){
      setEditUnit(null)
      setSpinner(false)
      return
    }
    let tempPlatoonIds = JSON.parse(JSON.stringify(platoonIds))

    let pIndex = tempPlatoonIds?.findIndex(x=>x.id === editUnit.platoonId)
    if(pIndex >= 0){
      let playerUnitCount = tempPlatoonIds[pIndex]?.squads?.reduce((acc, s)=>
        acc + s?.unitConfig?.reduce((uAcc, u)=> uAcc + +(u.players?.filter(p=>p === playerId).length || 0), 0)
      , 0) || 0
      if(method === 'add' && playerUnitCount >= 10){
        setEditUnit(null)
        setSpinner(false)
        setAlert({type: 'error', msg: `${guildMember.name} already has ${playerUnitCount} units assigned for platoons in ${tempPlatoonIds[pIndex]?.id}`})
        return
      }
      let unitAssigned = tempPlatoonIds?.reduce((acc, p)=>
        acc + (p?.squads?.reduce((sAcc, s)=>
          sAcc + +(s?.unitConfig?.filter(u=>u?.baseId === data.baseId && u?.players?.filter(y=>y === playerId).length).length || 0)
        , 0) || 0)
      , 0) || 0
      if(method === 'add' && unitAssigned){
        setEditUnit(null)
        setSpinner(false)
        setAlert({type: 'error', msg: `${guildMember.name} already has already been assigned ${data.nameKey} for round ${tbDay}`})
        return
      }
      if(!tempPlatoonIds[pIndex].squads) tempPlatoonIds[pIndex].squads = []
      let squad = { num: data.squadNum, unitConfig: []}, unit = { baseId: data.baseId, prefilled: 0, players: [] }
      let sIndex = tempPlatoonIds[pIndex]?.squads?.findIndex(x=>x.num === data.squadNum)
      if(sIndex >= 0) squad = tempPlatoonIds[pIndex].squads[sIndex]
      if(!squad?.unitConfig) squad.unitConfig = []
      let uIndex = squad?.unitConfig?.findIndex(x=>x.baseId === data.baseId)
      if(uIndex >= 0) unit = squad.unitConfig[uIndex]
      if(method === 'add') unit.players.push(playerId)
      if(method === 'remove') unit.players = unit.players.filter(x=>x !== playerId)
      if(uIndex >= 0){
        squad.unitConfig[uIndex] = unit
      }else{
        squad.unitConfig.push(unit)
      }
      if(sIndex >= 0){
        tempPlatoonIds[pIndex].squads[sIndex] = squad
      }else{
        tempPlatoonIds[pIndex].squads.push(squad)
      }
      await updatePlatoonDb('tbPlatoonIds-'+tbDay+'-'+tbId, tempPlatoonIds)
      setPlatoonIds(tempPlatoonIds)
      if(method === 'add') setAlert({ type: 'success', msg: `${guildMember.name} was assigned ${data.nameKey} for platoons in ${tempPlatoonIds[pIndex]?.id}`})
      if(method === 'remove') setAlert({ type: 'success', msg: `${guildMember.name} was un-assigned ${data.nameKey} for platoons in ${tempPlatoonIds[pIndex]?.id}`})
    }
    setEditUnit(null)
    setSpinner(false)
  }
  if(platoonMap?.length === 0) return null
  return (
    <Table>
    <TableBody>
    {openSquadEdit && <EditSquad open={openSquadEdit} setOpen={setSquadEditOpen} data={editSquad} changeSquad={changeSquad}/>}
    {openPlatoonEdit && <EditPlatoon open={openPlatoonEdit} setOpen={setPlatoonEditOpen} platoon={editPlatoon} pDef={pDef} changePlatoon={changePlatoon} removeBonusPlatoon={removeBonusPlatoon}/>}
    {openUnitEdit && <EditUnit open={openUnitEdit} setOpen={setUnitEditOpen} data={editUnit} changeUnit={changeUnit} assignUnit={assignUnit} member={member}/>}
    {openUnitAssign && <AssignUnit open={openUnitAssign} setOpen={setUnitAssignOpen} data={editUnit} changeUnitAssign={changeUnitAssign} member={member} />}
    {platoonMap.map((platoon, index)=>(<ShowPlatoon key={index} platoon={platoon} updatePlatoon={updatePlatoon} updateSquad={updateSquad} updateUnit={updateUnit} removeAssigned={removeAssigned}/>))}
    </TableBody>
    </Table>
  )
}
/*
<Table key={uIndex}>
  <TableBody>
    <TableRow><TableCell><Typography>{unit.nameKey}</Typography></TableCell></TableRow>
    <TableRow><TableCell sx={unit.player ? unitFilled:unitNotFilled}><Typography>{unit.player ? unit.player:'NONE'}</Typography></TableCell></TableRow>
  </TableBody>
</Table>
*/
