import {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {Builder} from "builder-pattern";
import {useRouter} from "next/router";
import {lastValueFrom} from "rxjs";
import {addClient, getClient, updateClient} from "../../configurations/ioc.container";
import {Client} from "../../domain/entities/Client";
import {Address} from "../../domain/entities/Address";
import {StyledFieldset} from "./StyledFieldset";
import AdminLayout from "../layouts/AdminLayout";


export interface ClientFormProps {
  id?: string
}

export default function ClientForm({ id }: ClientFormProps) {

  const router = useRouter()
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    telephones: '',
    nif: '',
    stat: '',
    region: '',
    commune: '',
    fokontany: '',
    lot: ''
  })

  useEffect(() => {
    getClient.execute(id as string).subscribe(value => setInitialValues({
      name: value?.name ?? '',
      email: value?.email ?? '',
      telephones: value?.telephones ?? '',
      nif: value?.nif ?? '',
      stat: value?.stat ?? '',
      region: value?.address.region ?? '',
      commune: value?.address.commune ?? '',
      fokontany: value?.address.fokontany ?? '',
      lot: value?.address.lot ?? ''
    }))
  }, [id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      const client = Builder(Client)
        .nif(values.nif)
        .name(values.name)
        .email(values.email)
        .telephones(values.telephones)
        .address(Builder(Address)
          .lot(values.lot)
          .commune(values.commune)
          .region(values.region)
          .fokontany(values.fokontany)
          .build()
        )
        .build()

      const client$ = id ? updateClient.execute(Builder(client).id(id).build()) : addClient.execute(client)
      await lastValueFrom(client$)
        .then(() => router.replace("/admin/client/list"));
    }
  })

  return (
    <Box>
      <h3>Noveau client</h3>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <TextField label="Nom" variant="outlined" name="name" value={formik.values.name} onChange={formik.handleChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField sx={{ width: '30%' }} label="Email" variant="outlined" name="email" value={formik.values.email} onChange={formik.handleChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField label="Téléphones" variant="outlined" name="telephones" value={formik.values.telephones} onChange={formik.handleChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <StyledFieldset>
            <legend>Informations légales : </legend>
            <TextField label="NIF" variant="outlined" sx={{ mr: 2 }} name="nif" value={formik.values.nif} onChange={formik.handleChange} />
            <TextField label="Stat" variant="outlined" name="stat" value={formik.values.stat} onChange={formik.handleChange} />
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
        <Button sx={{ mt: 2 }} variant={"contained"} type={"submit"}>Sauvegarder</Button>
      </form>
    </Box>
  )
}

ClientForm.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}