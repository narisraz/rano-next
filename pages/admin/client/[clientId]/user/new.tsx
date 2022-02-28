import Box from "@mui/material/Box";
import {Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import {roles, User} from "../../../../../domain/entities/User";
import {FC, useEffect, useState} from "react";
import AdminLayout from "../../../../../components/layouts/AdminLayout";
import {addUser, getClient} from "../../../../../configurations/ioc.container";
import {Builder} from "builder-pattern";
import {lastValueFrom} from "rxjs";
import {Address} from "../../../../../domain/entities/Address";
import {StyledFieldset} from "../../../../../components/forms/StyledFieldset";
import {AppBackdrop} from "../../../../../components/AppBackdrop";


export default function NewUser() {
  const router = useRouter()
  const clientId = router.query.clientId
  const [clientName, setClientName] = useState('')
  const [openBackdrop, setOpenBackdrop] = useState(true)

  useEffect(() => {
    const ref = getClient.execute(clientId as string).subscribe(value => {
      setClientName(value?.name ?? '')
      setOpenBackdrop(false)
    })
    return () => ref.unsubscribe()
  }, [clientId])

  const formik = useFormik({
    initialValues: {
      name: '',
      firstName: '',
      region: '',
      commune: '',
      fokontany: '',
      telephones: '',
      lot: '',
      email: '',
      role: 0,
      active: true,
    },
    onSubmit: async (values) => {
      const user$ = addUser.execute(Builder(User)
        .name(values.name)
        .firstName(values.firstName)
        .address(Builder(Address)
          .region(values.region)
          .commune(values.commune)
          .fokontany(values.fokontany)
          .lot(values.lot)
          .build()
        )
        .telephones(values.telephones)
        .email(values.email)
        .role(values.role)
        .active(values.active)
        .clientId(clientId as string)
        .build()
      )
      await lastValueFrom(user$)
        .then(() => router.replace("/admin/client/list"));
    }
  })

  return (
    <Box>
      <AppBackdrop opened={openBackdrop} />
      <h3>{clientName} - Nouvel employé</h3>
      <Divider />
      <Box sx={{m: 2}}></Box>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <TextField label="Email" variant="outlined" name="email" value={formik.values.email} onChange={formik.handleChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <StyledFieldset>
            <legend>Informations personnels : </legend>
            <TextField label="Nom" variant="outlined" sx={{ mr: 2 }} name="name" value={formik.values.name} onChange={formik.handleChange} />
            <TextField label="Prénom" variant="outlined" sx={{ mr: 2 }} name="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
            <TextField label="Téléphones" variant="outlined" name="telephones" value={formik.values.telephones} onChange={formik.handleChange} />
          </StyledFieldset>
        </Box>
        <Box sx={{ mt: 2 }}>
          <StyledFieldset>
            <legend>Adresse : </legend>
            <TextField label="Région" variant="outlined" sx={{ mr: 2 }} name="region" value={formik.values.region} onChange={formik.handleChange} />
            <TextField label="Commune" variant="outlined" sx={{ mr: 2 }} name="commune" value={formik.values.commune} onChange={formik.handleChange} />
            <TextField label="Fokontany" variant="outlined" sx={{ mr: 2 }} name="fokontany" value={formik.values.fokontany} onChange={formik.handleChange} />
            <TextField label="Lot" variant="outlined" name="lot" value={formik.values.lot} onChange={formik.handleChange} />
          </StyledFieldset>
        </Box>
        <Box sx={{ mt: 2 }}>
          <FormControl>
            <InputLabel>Rôle</InputLabel>
            <Select
              name="role"
              value={formik.values.role}
              label="Rôle"
              onChange={formik.handleChange}
            >
              {roles.map((role, index) =>
                <MenuItem key={index} value={index}>{role}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <Button sx={{ mt: 2 }} variant={"contained"} type={"submit"}>Sauvegarder</Button>
      </form>
    </Box>
  )
}

NewUser.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}