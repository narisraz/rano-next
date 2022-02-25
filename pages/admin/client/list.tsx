import {
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {FC, useState} from "react";
import {listClient} from "../../../configurations/ioc.container";
import {bind} from "@react-rxjs/core";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from "@mui/material/Typography";
import {ListClientResponse} from "../../../domain/entities/responses/ListClientResponse";


const [useClients] = bind(listClient.run(), [])

export default function ClientList() {
  const clients = useClients()

  return (
    <Box>
      <Button href={"/admin/client/new"} startIcon={<AddIcon />} variant={"contained"}>
        Nouveau
      </Button>
      <Box sx={{m: 2}}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Téléphones</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">NIF</TableCell>
              <TableCell align="right">Stat</TableCell>
              <TableCell align="right">Région</TableCell>
              <TableCell align="right">Commune</TableCell>
              <TableCell align="right">Fokontany</TableCell>
            </TableRow>
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
  const [open, setOpen] = useState(false)

  return <>
    <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
      <TableCell>
        <IconButton size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        {client.name}
      </TableCell>
      <TableCell align="right">{client.telephones}</TableCell>
      <TableCell align="right">{client.email}</TableCell>
      <TableCell align="right">{client.nif}</TableCell>
      <TableCell align="right">{client.stat}</TableCell>
      <TableCell align="right">{client.address?.region}</TableCell>
      <TableCell align="right">{client.address?.commune}</TableCell>
      <TableCell align="right">{client.address?.fokontany}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={9}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{margin: 1}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant="h6" gutterBottom>
                Liste des utilisateurs de {client.name}
              </Typography>
              <Button href={`/admin/client/${client.id}/user/new`} startIcon={<AddIcon/>} variant={"text"}>
                Nouvel utilisateur
              </Button>
            </Box>
            <Table size="small" sx={{width: "100%"}}>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Droit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {client.users.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell component="th" scope="row">
                      {user.email}
                    </TableCell>
                    <TableCell>{user.roleLabel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>;
}

ClientList.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}