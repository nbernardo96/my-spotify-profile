import React, { useEffect } from 'react';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const settings = ['Logout'];

export const NavigationBar = (props) => {
  const token = props.token
  const logout = props.logout
  const user = props.user
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);

  useEffect(() => {
    if (user) {
      setUsername(user.display_name)
      setUserProfileImage(user.images[0].url)
    }
  }, [user])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === 'Logout') {
      logout()
      setUsername(null)
      setUserProfileImage(null)
    }
  }

  return (
    <AppBar position="static" sx={{ background: '#2F353E' }}>
      <Container maxWidth="100%">
        <Toolbar disableGutters>          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0, fontSize: 22 }}>
                {username}
              </Typography>
              { token ?
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile Picture" src={userProfileImage ? userProfileImage : null} />
                  </IconButton>
                </Tooltip>
              :
                null 
              }
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => handleMenuItemClick(setting)}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
