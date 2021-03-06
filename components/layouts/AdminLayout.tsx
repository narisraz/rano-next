import React, {PropsWithChildren, useState} from "react";
import Box from "@mui/material/Box";
import {Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useTheme} from "@mui/system";
import {useRouter} from "next/router";
import {AppBar} from "../AppBar";
import {AppDrawer, DrawerHeader} from "../AppDrawer";
import AppToolbar from "../AppToolbar";


interface MenuItem {
  label: string
  url: string
  icon: any
}

export default function AdminLayout({ children }: PropsWithChildren<any>) {
  const router = useRouter()
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menu: MenuItem[] = [
    {
      url: '/admin/client/dashboard',
      label: 'Tableau de bord',
      icon: <DashboardIcon/>
    }, {
      url: '/admin/client/encaissement',
      label: 'Encaissement',
      icon: <DashboardIcon/>
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <AppToolbar drawerOpened={open} handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <AppDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          { menu.map((item, index) =>
            <ListItemButton key={index} component="a" href={item.url} selected={router.pathname == item.url}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label}/>
            </ListItemButton>
          )}
        </List>
        <Divider />
      </AppDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}