import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import Auth from './auth'
import AllyCodeNoMatch from './allyCodeNoMatch'
import Code3Error from './code3Error'
import ErrorOccured from './errorOccured'
import Link from './link'
import LinkSuccess from './linkSuccess'

import ButtonNav from 'components/buttonNav'

export default function Google(opts = {}){
  /*
  return(
    <Container>
      <Box textAlign="center" pt={5} pb={5}>
      <Typography>The bots ability to do google auth commands has been removed. please use `/allycode auth ea_connect` until further notice</Typography>
      <Typography>This page will return if/when this changes.</Typography>
    </Box>
    </Container>
  )
  */
  
  const { discordId } = opts;
  if(!discordId){
    localStorage.setItem('startUrl', window.location.href)
    ButtonNav('/discord/login')
  }
  if(!discordId) return null
  let navPath = window.location.pathname
  if(navPath) navPath = navPath.replace('/google', '')
  if(navPath === '/auth') return <Auth {...opts}/>
  if(navPath === '/allyCodeNoMatch') return <AllyCodeNoMatch {...opts}/>
  if(navPath === '/code3Error') return <Code3Error {...opts}/>
  if(navPath === '/errorOccured') return <ErrorOccured {...opts}/>
  if(navPath === '/linkSuccess') return <LinkSuccess {...opts}/>
  return <Link {...opts}/>
  
}
