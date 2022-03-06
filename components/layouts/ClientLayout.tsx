import React, {PropsWithChildren, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useTheme} from "@mui/system";
import {useRouter} from "next/router";
import {AppBar} from "../AppBar";
import {AppDrawer, DrawerHeader} from "../AppDrawer";
import Cookies from "js-cookie";
import AppToolbar from "../AppToolbar";
import {ADMIN_ROLE, ROLE, roles} from "../../domain/entities/User";


interface MenuItem {
  label: string
  url: string
  roles: number[]
  icon: any
}

const gestionnaire = roles.indexOf(ROLE.GESTIONNAIRE)
const caissier = roles.indexOf(ROLE.CAISSIER)
const releveur = roles.indexOf(ROLE.RELEVEUR)
const admin = ADMIN_ROLE

const menu: MenuItem[] = [
  {
    url: '/client/dashboard',
    label: 'Tableau de bord',
    roles: [admin, gestionnaire],
    icon: <DashboardIcon/>
  }, {
    url: '/client/encaissement',
    label: 'Encaissement',
    roles: [admin, gestionnaire, caissier],
    icon: <DashboardIcon/>
  }, {
    url: '/client/releve',
    label: 'Relevé',
    roles: [admin, gestionnaire, releveur],
    icon: <DashboardIcon/>
  }
]

export default function ClientLayout({ children }: PropsWithChildren<any>) {
  const router = useRouter()
  const theme = useTheme();
  const userRole = parseInt(Cookies.get('role') ?? '0')
  const [open, setOpen] = useState(true);
  const [menuToShow, setMenuToShow] = useState(menu)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setMenuToShow(menu.filter(item => item.roles.includes(userRole as number)))
  }, [userRole])

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
          { menuToShow.map((item, index) =>
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