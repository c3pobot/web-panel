import { Box, Button } from '@mui/material';

export function GetShapeButton({slot, filter, onClick}){
  let style = { padding: "5px", textAlign: "center", height: "51px" }, buttonType = "outlined"
  if(slot == 1){
    if(filter?.size == 0) buttonType = "contained"
    return (
      <Button variant={buttonType} onClick={()=>onClick(0)} sx={style}>Any Slot</Button>
    )
  }
  if(filter?.has(slot)) buttonType = "contained"
  return (
    <Button variant={buttonType} onClick={()=>onClick(slot)} sx={style}><Box className={`mod-shape-filter shape-5-${slot - 1}-1`} /></Button>
  )
}
export function GetIconButton({ icon, filter, onClick }){
  let style = { padding: "5px", textAlign: "center", height: "51px" }, buttonType = "outlined"
  if(!icon){
    if(filter?.size == 0) buttonType = "contained"
    return (
      <Button variant={buttonType} onClick={()=>onClick(0)} sx={style}>Any Set</Button>
    )
  }
  if(filter?.has(icon)) buttonType = "contained"
  return (
    <Button variant={buttonType} sx={style}><Box className={`mod-icon-filter icon-${icon}-1`} onClick={()=>onClick(icon)}/></Button>
  )
}
export function GetStatButton({stat = {}, filter, onClick}){
  let style = { padding: "5px", textAlign: "center", height: "51px" }, buttonType = "outlined"
  if(!stat.id){
    if(filter.size == 0) buttonType = "contained"
    return (
      <Button onClick={()=>onClick(0)} variant={buttonType} sx={style}>{stat.name}</Button>
    )
  }
  if(filter.has(stat.id)) buttonType = "contained"
  return (
    <Button onClick={()=>onClick(stat.id)} variant={buttonType} sx={style}>{stat.name}</Button>
  )
}
