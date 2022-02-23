import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {FC} from "react";

export default function ClientList() {
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
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Nom
            </TableCell>
            <TableCell align="right">Téléphones</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">NIF</TableCell>
            <TableCell align="right">Stat</TableCell>
            <TableCell align="right">Région</TableCell>
            <TableCell align="right">Commune</TableCell>
            <TableCell align="right">Fokontany</TableCell>
          </TableRow>
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