//react
import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import ButtonNav from './buttonNav'
import GetCookie from './cookies'
import IconMenu from './iconMenu'

//const paths = [{name: 'Home', path: '/home'}, {name: 'AllyCodes', path: '/allyCodes'}, {name: 'Squads', path: '/squads'}, {name: 'Squad Groups', path: '/squadGroups'}, {name: 'Help', path: '/help'}]
const linkedPaths = [{name: 'Home', path: '/home'}, {name: 'AllyCodes', path: '/allyCodes'}, { name: 'Squads', path: '/squads'}, {name: 'Squad Groups', path: '/squadGroups'}, {name: 'TW', path: '/tw'}, {name: 'TB', path: '/tb'}, {name: 'Help', path: '/help'}]
const nonLinkedPaths = [{name: 'AllyCodes', path: '/allyCodes'}, {name: 'Help', path: '/help'}]
export default function NavBar ({ systemTheme, setSystemTheme, webProfile, setWebProfile }) {
  //hooks
  const [ profileIcon, setProfileIcon ] = useState(webProfile?.avatar || '/discord-logo.png');
  const [ loginStatus ] = useState(GetCookie('discordId'));
  const [ linkStatus ] = useState(GetCookie('botLink'));
  const [ anchorElNav, setAnchorElNav ] = useState();
  const [ anchorElUser, setAnchorElUser ] = useState();
  const [ navMenuItems, setNavMenuItems ] = useState([])
  //effect
  useEffect(()=>{
    if(webProfile?.avatar){
      setProfileIcon(webProfile.avatar)
    }else{
      setProfileIcon('/discord-logo.png')
    }
    if(webProfile?.theme){
      setSystemTheme(webProfile.theme)
    }else{
      setSystemTheme('dark')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webProfile])
  useEffect(()=>{
    let array = []
    if(linkStatus === true){
      for(let i in linkedPaths){
        array.push({nameKey: linkedPaths[i].name, newValue: linkedPaths[i].path})
      }
    }else{
      for(let i in nonLinkedPaths){
        array.push({nameKey: nonLinkedPaths[i].name, newValue: nonLinkedPaths[i].path})
      }
    }
    setNavMenuItems(array)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkStatus])
  const profileMenuItems = [
    {
      nameKey: loginStatus ? 'Logout':'Login',
      newValue: loginStatus ? '/discord/logout':'/discord/login'
    }
  ]

  function handleSubmit(navPage){
    if(navPage) ButtonNav(navPage)
  }

  return(
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <Box sx={{ pl: '16px', flexGrow: 1, display: { xs: 'flex', md: 'none' } }} width="25">
          <IconMenu anchorElNav={anchorElNav} setAnchorElNav={setAnchorElNav} menuItems={navMenuItems} handleSubmit={ButtonNav}/>
          <MenuIcon onClick={(event)=>setAnchorElNav(event.currentTarget)}/>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <Box pr={2}><Avatar src={import.meta.env.VITE_BOT_AVATAR}/></Box>
          <Typography variant="h6" noWrap component="div">{import.meta.env.VITE_BOT_NAME}</Typography>
        </Box>
        <Box sx={{ pl: '16px', mr: 2, display: { xs: 'none', md: 'flex' } }}>
          <Box pr={2}><Avatar src={import.meta.env.VITE_BOT_AVATAR}/></Box>
          <Typography variant="h6" noWrap component="div">{import.meta.env.VITE_BOT_NAME}</Typography>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {navMenuItems.map(({nameKey, newValue}, index) => (
            <Button
              key={index}
              onClick={()=>ButtonNav(newValue)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >{nameKey}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ ml: 1 }} onClick={()=>setWebProfile({theme: (webProfile?.theme === 'dark' ? 'light':'dark')})} color="inherit">
            {systemTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Box sx={{ pr: '16px', flexGrow: 0 }}>
          <IconMenu anchorElNav={anchorElUser} setAnchorElNav={setAnchorElUser} menuItems={profileMenuItems} handleSubmit={handleSubmit}/>
          <Tooltip title={loginStatus ? 'Logout':'Login'}>
            <IconButton onClick={(event)=>setAnchorElUser(event.currentTarget)} sx={{ p: 0 }}>
              {profileIcon ? <Avatar src={profileIcon}/>:<AccountCircle />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
