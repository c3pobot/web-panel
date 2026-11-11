import { Fragment } from 'react'
import { Box, Table, TableBody, TableRow, TableCell, Tooltip } from '@mui/material';

import './modImage.css'
import './modUnit.css'
function GetPrimary({mod = {}}){
  let str = `${mod.value}`
  if(mod.pct) str += '%'
  str += ` ${mod.statName}`
  return str
}
function GetSecondary({ stat = {}, modSort}){
  let str = `(${stat.rolls}) ${stat.value}`
  if(stat.pct) str += '%'
  str += ` ${stat.statName}`
  if(stat.statId == modSort) return (
    <span style={{ color: "#f6d24f"}}>{str}</span>
  )
  return str
}
function GetMod({ mod = {} }){
    if(mod.unitNameKey) return (

      <Fragment>
        <Tooltip title={mod.unitNameKey}>
        <Box className={`mod-shape shape-${(mod.rarity > 4 ? mod.rarity:5)}-${(mod.slot - 1)}-${mod.tier}`}>
          <Box className={`mod-icon icon-${mod.setId}-${mod.tier} pos-${(mod.slot - 1)}-${mod.setId == 4 ? "align-speed":"align"}`} />
        </Box>
        </Tooltip>
        <Box className="unit-icon">
          <Box className="character-portrait__image-frame character-portrait__image-frame--size-xsmall">
            <img className="character-portrait__img character-portrait__img--size-xsmall" src={`${import.meta.env.VITE_WEBPANEL_IMAGE_HOST}/${mod.unitIcon}.png`} alt={mod.unitNameKey} />
          </Box>

        </Box>
        </Fragment>


    )
    return (
      <Box className={`mod-shape shape-${(mod.rarity > 4 ? mod.rarity:5)}-${(mod.slot - 1)}-${mod.tier}`}>
        <Box className={`mod-icon icon-${mod.setId}-${mod.tier} pos-${(mod.slot - 1)}-${mod.setId == 4 ? "align-speed":"align"}`} />
      </Box>
    )
}
export default function ShowMod({ mod = {}, modSort }){

  return (
    <Table sx={{ "contentVisibility": "auto", width: "311px" }}>
      <TableBody>
        <TableRow>
          <TableCell className="mod-image" sx={{ border: "0px", padding: "0px" }}>
            <GetMod mod={mod} />
          </TableCell>
          <TableCell className="mod-text" style={{ "verticalAlign": "top", border: "0px", padding: "0px" }}>
            <Box><b><GetPrimary mod={mod} /></b></Box>
            <Box>
              {Object.values(mod.secondary || {}).map((stat, index)=>(
                <Fragment key={index}>
                  <GetSecondary stat={stat} modSort={modSort}/>
                  <br/>
                </Fragment>
              ))}
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
