import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {FC} from "react";
import {listClient} from "../../../configurations/di";
import {bind} from "@react-rxjs/core";


const [useClients] = bind(listClient.run(), [])

export default function ClientList() {
  const clients = useClients()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
            <TableRow
              key={client.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
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
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ClientList.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}