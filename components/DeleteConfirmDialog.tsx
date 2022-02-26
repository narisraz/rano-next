import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useState} from "react";

interface DeleteConfirmDialogProps {
  title: string
  open: boolean,
  close: () => void
  action: () => void
}

export function DeleteConfirmDialog({ title, open, close, action }: DeleteConfirmDialogProps) {

  return (
    <Dialog
      open={open}
      onClose={() => close()}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Souhaitez-vous vraiment supprimer cet élément
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()}>Annuler</Button>
        <Button onClick={action} autoFocus>
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  )
}