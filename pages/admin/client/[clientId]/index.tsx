import {FC, useEffect, useState} from "react";
import AdminLayout from "../../../../components/layouts/AdminLayout";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import {getClient} from "../../../../configurations/ioc.container";
import {Client} from "../../../../domain/entities/Client";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
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
              <TableCell sx={{ fontWeight: "bold" }}>Région</TableCell>
              <TableCell>{client?.address.region}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Commune</TableCell>
              <TableCell>{client?.address.commune}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Lot</TableCell>
              <TableCell>{client?.address.lot} - {client?.address.fokontany}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Téléphones</TableCell>
              <TableCell>{client?.telephones}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell>{client?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>NIF</TableCell>
              <TableCell>{client?.nif}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Stat</TableCell>
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