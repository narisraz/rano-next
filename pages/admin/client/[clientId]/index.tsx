import ClientForm from "../../../../components/forms/ClientForm";
import {FC, useEffect, useState} from "react";
import AdminLayout from "../../../../components/layouts/AdminLayout";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import {getClient} from "../../../../configurations/ioc.container";
import {bind} from "@react-rxjs/core";
import {Builder} from "builder-pattern";
import {Client} from "../../../../domain/entities/Client";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {AppBackdrop} from "../../../../components/AppBackdrop";

export default function ClientDetail() {

  const router = useRouter()
  const id = router.query.clientId
  const [client, setClient] = useState<Client>()
  const [openBackdrop, setOpenBackdrop] = useState(true)

  useEffect(() => {
    const ref = getClient.execute(id as string).subscribe(value => {
      setOpenBackdrop(false)
      setClient(value)
    })
    return () => ref.unsubscribe()
  }, [id])

  return (
    <Box>
      <AppBackdrop opened={openBackdrop} />
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h5" gutterBottom>
          {client?.name}
        </Typography>
        <Button href={`/admin/client/edit/${client?.id}`} startIcon={<AddIcon />} variant={"contained"}>
          Editer
        </Button>
      </Box>
      <Box sx={{m: 2}}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <TableCell>Région</TableCell>
              <TableCell>{client?.address.region}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Commune</TableCell>
              <TableCell>{client?.address.commune}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lot</TableCell>
              <TableCell>{client?.address.lot} - {client?.address.fokontany}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Téléphones</TableCell>
              <TableCell>{client?.telephones}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{client?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NIF</TableCell>
              <TableCell>{client?.nif}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stat</TableCell>
              <TableCell>{client?.stat}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )

}

ClientDetail.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}