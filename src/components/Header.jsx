import { CircularProgress, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import React from 'react'
import { drawerWidth } from '../misc/utils';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function Header({ open, setOpen, selectedCompany, companyInfoLoading ,companyList}) {
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        {companyList?.length>0 && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        )}
        {companyInfoLoading ? (<CircularProgress />) : (<Typography variant="h6" noWrap component="div">
          {selectedCompany?.companyName}
        </Typography>)}
      </Toolbar>
    </AppBar>
  )
}
