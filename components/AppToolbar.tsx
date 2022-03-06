import {IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import {AUTH} from "../configurations/firebase.config";
import Cookies from "js-cookie";
import {useRouter} from "next/router";


interface AppToolbarProps {
  drawerOpened: boolean
  handleDrawerOpen: () => void
}

export default function AppToolbar({ drawerOpened, handleDrawerOpen }: AppToolbarProps) {

  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await AUTH.signOut()
      .then(_ => Cookies.remove("role"))
      .then(_ => Cookies.remove("token"))
      .then(_ => router.replace('/client/login'))
  }

  return (
    <>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
          sx={{
            marginRight: '36px',
            ...(drawerOpened && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div>
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Se déconnecter</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </>
  )
}