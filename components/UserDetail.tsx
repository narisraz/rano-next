import {AppBackdrop} from "./AppBackdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import {Client} from "../domain/entities/Client";
import {getClient, getUser} from "../configurations/ioc.container";
import {combineLatest} from "rxjs";
import {roles, User} from "../domain/entities/User";


interface UserDetailProps {
  id: string,
  clientId: string
}

export default function UserDetail({ id, clientId }: UserDetailProps) {

  const [user, setUser] = useState<User>()
  const [client, setClient] = useState<Client>()
  const [openBackdrop, setOpenBackdrop] = useState(true)

  useEffect(() => {
    const ref = combineLatest([
      getUser.execute(id),
      getClient.execute(clientId as string)
    ]).subscribe(([user, client]) => {
      setOpenBackdrop(false)
      setClient(client)
      setUser(user)
    })

    return () => ref.unsubscribe()
  }, [clientId, id])

  return (
    <Box>
      <AppBackdrop opened={openBackdrop} />
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h5" gutterBottom>
          {client?.name}
        </Typography>
        <Button href={`/admin/client/${client?.id}/user/edit/${user?.id}`} startIcon={<AddIcon />} variant={"contained"}>
          Editer
        </Button>
      </Box>
      <Box sx={{m: 2}}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Rôle</TableCell>
              <TableCell>{roles[user?.role ?? 0]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Nom</TableCell>
              <TableCell>{user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Prénom</TableCell>
              <TableCell>{user?.firstName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Région</TableCell>
              <TableCell>{user?.address?.region}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Commune</TableCell>
              <TableCell>{user?.address?.commune}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Lot</TableCell>
              <TableCell>{user?.address?.lot} - {client?.address.fokontany}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Téléphones</TableCell>
              <TableCell>{user?.telephones}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}