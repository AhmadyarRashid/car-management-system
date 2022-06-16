// NPM Dependencies
import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate, useLocation} from "react-router-dom";

// App Dependencies
import {
  AppBar,
  Drawer, DrawerHeader
} from './dashboardLayout.styled';
import constant from "../../utils/constant";
import {LogoutOutlined} from "@mui/icons-material";

export default function DashboardLayout({children}) {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && {display: 'none'}),
            }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
          {constant.sideBarList.map(({text, icon, url}, index) => (
            <ListItem key={text} disablePadding sx={{display: 'block'}}>
              <ListItemButton
                onClick={() => navigate(url, { replace: true })}
                selected={location.pathname === url}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key="logout" disablePadding sx={{display: 'block'}}>
            <ListItemButton
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/sign-in', {replace: true});
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{opacity: open ? 1 : 0}}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <DrawerHeader/>
        {children}
      </Box>
    </Box>
  );
}
