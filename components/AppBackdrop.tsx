import {Backdrop, CircularProgress} from "@mui/material";

export interface BackdropProps {
  opened: boolean
}

export function AppBackdrop({ opened } : BackdropProps) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={opened}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}