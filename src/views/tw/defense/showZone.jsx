import React from 'react'
import { Box } from '@mui/material'

import './defense.css'
export default function ShowZone({zone = {}}){
    return (
        <Box className="unit-container">
        {zone.squads?.map((squad, index)=>(
            <Box key={index} className={"unit-image-"+zone.squads.length+'-'+index}><Box className="unit-image" ><img className="unit-img" src={import.meta.env.VITE_WEBPANEL_IMAGE_HOST+'/'+squad.thumbnailName+'.png'} alt="" /></Box></Box>
        ))}
        </Box>
    )
}
