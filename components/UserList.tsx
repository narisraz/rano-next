import {IconButton, Table, TableBody, TableHead} from "@mui/material";
import {roles, User} from "../domain/entities/User";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {StyledTableCell} from "./table/StyledTableCell";
import {StyledTableRow} from "./table/StyledTableRow";
import {DeleteConfirmDialog} from "./DeleteConfirmDialog";
import {useState} from "react";
import {deleteUser} from "../configurations/ioc.container";

interface UserListProps {
  clientId: string
  users: User[]
}

export default function UserList({ clientId, users }: UserListProps) {

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>()

  const removeUser = () => {
    deleteUser.execute(selectedUser!.id)
      .then(closeDialog)
  }

  const closeDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Table size="small" sx={{width: "100%"}}>
      <DeleteConfirmDialog title={'Employé'} open={openDialog} close={closeDialog} action={removeUser}></DeleteConfirmDialog>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>Rôle</StyledTableCell>
          <StyledTableCell>Nom</StyledTableCell>
          <StyledTableCell>Prénom</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell>Activé</StyledTableCell>
          <StyledTableCell align="center">Actions</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <StyledTableRow key={user.email}>
            <StyledTableCell component="th" scope="row">
              {roles[user.role]}
            </StyledTableCell>
            <StyledTableCell>{user.name}</StyledTableCell>
            <StyledTableCell>{user.firstName}</StyledTableCell>
            <StyledTableCell>{user.email}</StyledTableCell>
            <StyledTableCell>{user.active ? <CheckIcon color={"success"} /> : <CloseIcon color={"error"} />}</StyledTableCell>
            <StyledTableCell align="center">
              <IconButton color={"success"} href={`/admin/client/${clientId}/user/${user.id}`}>
                <VisibilityIcon />
              </IconButton>
              <IconButton color={"warning"} href={`/admin/client/${clientId}/user/edit/${user.id}`}>
                <ModeEditIcon />
              </IconButton>
              <IconButton color={"error"} onClick={() => {
                setOpenDialog(true)
                setSelectedUser(user)
              }}>
                <DeleteIcon />
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  )
}