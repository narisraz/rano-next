import {Button, Collapse, IconButton, Paper, Table, TableBody, TableContainer, TableHead} from "@mui/material";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {FC, useEffect, useState} from "react";
import {deleteClient, listClient} from "../../../configurations/ioc.container";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Typography from "@mui/material/Typography";
import {ListClientResponse} from "../../../domain/entities/responses/ListClientResponse";
import {AppBackdrop} from "../../../components/AppBackdrop";
import {DeleteConfirmDialog} from "../../../components/DeleteConfirmDialog";
import {Client} from "../../../domain/entities/Client";
import {StyledTableRow} from "../../../components/table/StyledTableRow";
import {StyledTableCell} from "../../../components/table/StyledTableCell";
import UserList from "../../../components/UserList";


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

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const removeClient = () => {
    deleteClient.execute(client.id)
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
          <VisibilityIcon/>
        </IconButton>
        <IconButton color={"warning"} href={`/admin/client/edit/${client.id}`}>
          <ModeEditIcon/>
        </IconButton>
        <IconButton color={"error"} onClick={() => {
          setOpenDialog(true)
        }}>
          <DeleteIcon/>
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
      <StyledTableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
        <DeleteConfirmDialog title={'Client'} open={openDialog} close={closeDialog}
                             action={removeClient}></DeleteConfirmDialog>
        <Collapse in={showEmployeeList} timeout="auto" unmountOnExit>
          <UserTable client={client} />
        </Collapse>
      </StyledTableCell>
    </StyledTableRow>
  </>;
}

function UserTable(props: { client: ListClientResponse }) {
  const { client } = props
  return <Box sx={{margin: 1}}>
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
        <UserList clientId={client.id} users={client.users}/>
    }
  </Box>;
}

ClientList.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}