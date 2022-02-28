import {
  Button,
  Collapse,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {FC, useEffect, useState} from "react";
import {deleteClient, deleteUser, listClient} from "../../../configurations/ioc.container";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Typography from "@mui/material/Typography";
import {ListClientResponse} from "../../../domain/entities/responses/ListClientResponse";
import {roles, User} from "../../../domain/entities/User";
import {AppBackdrop} from "../../../components/AppBackdrop";
import {DeleteConfirmDialog} from "../../../components/DeleteConfirmDialog";
import {Client} from "../../../domain/entities/Client";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ClientList() {
  const [clients, setClients] = useState<ListClientResponse[]>([])
  const [openBackdrop, setOpenBackdrop] = useState(true)

  useEffect(() => {
    const ref = listClient.run().subscribe(value => {
      setOpenBackdrop(false)
      setClients(value)
    })
    return () => ref.unsubscribe()
  })

  return (
    <Box>
      <AppBackdrop opened={openBackdrop} />
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h5" gutterBottom>
          Liste des clients ({clients.length})
        </Typography>
        <Button href={"/admin/client/new"} startIcon={<AddIcon />} variant={"contained"}>
          Nouveau client
        </Button>
      </Box>
      <Box sx={{m: 2}}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell align="right">Téléphones</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Commune</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {clients.map(client =>
              <Row key={client.id} client={client} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

function Row(props: {client : ListClientResponse}) {

  const { client } = props
  const [showEmployeeList, setShowEmployeeList] = useState(false)
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('')
  const enum DeleteAction { CLIENT, USER}
  const [deleteAction, setDeleteAction] = useState<DeleteAction>()
  const [selectedUser, setSelectedUser] = useState<User>()

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const deleteData = (action: DeleteAction | undefined): () => void => {
    switch (action) {
      case DeleteAction.USER: return removeUser
      case DeleteAction.CLIENT: return removeClient
      case undefined: return () => undefined
    }
  }

  const removeClient = () => {
    deleteClient.execute(client.id)
  }

  const removeUser = () => {
    deleteUser.execute(selectedUser!.id)
      .then(closeDialog)
  }

  return <>
    <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
      <StyledTableCell>
        <IconButton size="small" onClick={() => setShowEmployeeList(!showEmployeeList)}>
          {showEmployeeList ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
        </IconButton>
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {client.name}
      </StyledTableCell>
      <StyledTableCell align="right">{client.telephones}</StyledTableCell>
      <StyledTableCell align="right">{client.email}</StyledTableCell>
      <StyledTableCell align="right">{client.address?.commune}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color={"success"} href={`/admin/client/${client.id}`}>
          <VisibilityIcon />
        </IconButton>
        <IconButton color={"warning"} href={`/admin/client/edit/${client.id}`}>
          <ModeEditIcon />
        </IconButton>
        <IconButton color={"error"} onClick={() => {
          setDialogTitle('Client')
          setDeleteAction(DeleteAction.CLIENT)
          setOpenDialog(true)
        }}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
      <StyledTableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
        <DeleteConfirmDialog title={dialogTitle} open={openDialog} close={closeDialog} action={deleteData(deleteAction)}></DeleteConfirmDialog>
        <Collapse in={showEmployeeList} timeout="auto" unmountOnExit>
          <Box sx={{margin: 1}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant="h6" gutterBottom>
                {client.users.length
                  ? `Liste des employés de ${client.name} (${client.users.length})`
                  : `Pas encore d'employé pour ${client.name}`
                }
              </Typography>
              <Button href={`/admin/client/${client.id}/user/new`} startIcon={<AddIcon/>} variant={"text"}>
                Nouvel employé
              </Button>
            </Box>
            {client.users.length > 0 &&
              <Table size="small" sx={{width: "100%"}}>
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
                  {client.users.map((user) => (
                    <StyledTableRow key={user.email}>
                      <StyledTableCell component="th" scope="row">
                        {roles[user.role]}
                      </StyledTableCell>
                      <StyledTableCell>{user.name}</StyledTableCell>
                      <StyledTableCell>{user.firstName}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>{user.active ? <CheckIcon color={"success"} /> : <CloseIcon color={"error"} />}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton color={"success"}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color={"warning"} href={`/admin/client/${client.id}/user/edit/${user.id}`}>
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton color={"error"} onClick={() => {
                          setDialogTitle('Employé')
                          setSelectedUser(user)
                          setDeleteAction(DeleteAction.USER)
                          setOpenDialog(true)
                        }}>
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            }
          </Box>
        </Collapse>
      </StyledTableCell>
    </StyledTableRow>
  </>;
}

ClientList.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}