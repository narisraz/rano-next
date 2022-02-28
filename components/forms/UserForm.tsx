import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {addUser, getClient, getUser, updateUser} from "../../configurations/ioc.container";
import {useFormik} from "formik";
import {Builder} from "builder-pattern";
import {roles, User} from "../../domain/entities/User";
import {Address} from "../../domain/entities/Address";
import {combineLatest, lastValueFrom, Subscription} from "rxjs";
import Box from "@mui/material/Box";
import {AppBackdrop} from "../AppBackdrop";
import {Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {StyledFieldset} from "./StyledFieldset";

export interface UserFormProps {
  id?: string,
  clientId?: string
}

export function UserForm({ id, clientId }: UserFormProps) {
  const router = useRouter()
  const [clientName, setClientName] = useState('')
  const [openBackdrop, setOpenBackdrop] = useState(true)
  const [initialValues, setInitialValues] = useState({
    name: '',
    firstName: '',
    region: '',
    commune: '',
    fokontany: '',
    telephones: '',
    lot: '',
    email: '',
    role: 0,
    active: false,
  })

  useEffect(() => {
    let ref: Subscription;
    if (id) {
      ref = combineLatest([
        getUser.execute(id as string),
        getClient.execute(clientId as string)
      ]).subscribe(([user, client]) => {
        setClientName(client?.name ?? '')
        setOpenBackdrop(false)
        setInitialValues({
          name: user?.name ?? '',
          firstName: user?.firstName ?? '',
          region: user?.address?.region ?? '',
          commune: user?.address?.commune ?? '',
          fokontany: user?.address?.fokontany ?? '',
          telephones: user?.telephones ?? '',
          lot: user?.address?.lot ?? '',
          email: user?.email ?? '',
          role: user?.role ?? 0,
          active: user?.active ?? false,
        })
      })
    } else {
      ref = getClient.execute(clientId as string).subscribe(client => {
        setClientName(client?.name ?? '')
        setOpenBackdrop(false)
      })
    }

    return () => {
      ref.unsubscribe()
    }
  }, [id, clientId])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      setOpenBackdrop(true)
      const user = Builder(User)
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

      const user$ = id ? updateUser.execute(Builder(user).id(id).build()) : addUser.execute(user)
      await lastValueFrom(user$)
        .then(() => setOpenBackdrop(false))
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
          <TextField sx={{ width: '30%' }} label="Email" variant="outlined" name="email" value={formik.values.email} onChange={formik.handleChange} />
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