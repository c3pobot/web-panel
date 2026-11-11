import { Fragment, useState, useEffect, useRef } from 'react'
import { Box, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { List, AutoSizer  } from 'react-virtualized';

import useWindowSize from 'components/useWindowSize'
import ShowMod from './showMod'

export default function ShowMods({ mods = [], modSort }){

  const ROW_HEIGHT = 100
  const COL_WIDTH = 311
  const [ windowWidth, windowHeight, setWindoSize ] = useWindowSize({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [ modsArray, setModsArray ] = useState([])
  const [ colCount, setColCount ] = useState( Math.floor(window.innerWidth / COL_WIDTH))
  const [ rowCount, setRowCount ] = useState( Math.floor(window.innerHeight / ROW_HEIGHT))


  useEffect(()=>{
    setColCount(Math.floor(windowWidth / COL_WIDTH))
    setRowCount(Math.floor(windowHeight / ROW_HEIGHT))
  },[windowWidth, windowHeight])
  useEffect(()=>{
    updateModsArray()
  }, [colCount, mods])
  function updateModsArray(){
    let array = []
    for(let i = 0; i < mods.length; i += colCount ){
      array.push(mods.slice(i, i + colCount))
    }
    setModsArray(array)
  }

  function GetMod({index, style}){
    let data = modsArray[index]
    return(
      <Table key={index} style={{...style,...{ border: "0px" }}}>
        <TableBody>
          <TableRow>
            {data.map((mod, key)=>(
              <TableCell key={key} sx={{ padding: "0px", border: "0px", width: "311px" }}><ShowMod mod={mod} modSort={modSort}/></TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    )
  }
  return (
    <Box sx={{ display: 'flex', height: `${window.innerHeight - 70}px` }}>
      <Box sx={{ flex: '1 1 auto' }}>
        <AutoSizer>
          {({ height, width })=>(
            <List
              width={width}
              height={height - 100}
              rowCount={modsArray.length}
              rowHeight={115}
              rowRenderer={GetMod}
              overscanRowCount={5}
              //style={{ scrollbarWidth: 'none', '&::WebkitScrollbar':{ display: 'none' } }}
            />
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
}
