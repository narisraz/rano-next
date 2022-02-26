import {
  Button,
  Collapse,
  IconButton,
  Paper, styled,
  Table,
  TableBody, TableCell, tableCellClasses,
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import {ListClientResponse} from "../../../domain/entities/responses/ListClientResponse";
import {roles} from "../../../domain/entities/User";


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

const [useClients] = bind(listClient.run(), [])

export default function ClientList() {
  const clients = useClients()

  return (
    <Box>
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
  const [open, setOpen] = useState(false)

  return <>
    <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
      <StyledTableCell>
        <IconButton size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
        </IconButton>
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {client.name}
      </StyledTableCell>
      <StyledTableCell align="right">{client.telephones}</StyledTableCell>
      <StyledTableCell align="right">{client.email}</StyledTableCell>
      <StyledTableCell align="right">{client.address?.commune}</StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
      <StyledTableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={5}>
        <Collapse in={open} timeout="auto" unmountOnExit>
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