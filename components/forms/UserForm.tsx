import React, {FC, useState} from "react";
import {useFormik} from "formik";
import {Builder} from "builder-pattern";
import {roles, User} from "../../domain/entities/User";
import {Address} from "../../domain/entities/Address";
import Box from "@mui/material/Box";
import {StyledFieldset} from "./StyledFieldset";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Client} from "../../domain/entities/Client";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton, InputAdornment, InputLabel, MenuItem,
  OutlinedInput,
  Select,
  Switch
} from "@mui/material";

export class UserFormField {
  name: string = ''
  firstName: string = ''
  region: string = ''
  commune: string = ''
  fokontany: string = ''
  telephones: string = ''
  lot: string = ''
  email: string = ''
  role: number = 0
  active: boolean = false
  password: string = ''
}

export interface UserFormProps {
  id?: string
  client?: Client
  formFieldValue: UserFormField
  action: (user: User, password?: string) => void
  Error?: FC
}

export function UserForm({ id, client, formFieldValue, action, Error }: UserFormProps) {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formFieldValue,
    onSubmit: async (values: UserFormField) => {
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
        .clientId(client?.id ?? '')
        .password(id ? formFieldValue?.password ?? '' : values.password)
        .build()

      id ? action(user) : action(user)
    }
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <h3>{client?.name} - Nouvel employé</h3>
      <Divider sx={{mb: 2}} />
      <form onSubmit={formik.handleSubmit}>
        {Error && <Box sx={{mb: 2}}>
            <Error/>
        </Box>}
        <Box sx={{ mb: 2 }}>
          <StyledFieldset>
            <legend>Authentification : </legend>
            <TextField disabled={id != undefined} sx={{ width: '40ch', mr: 2 }} label="Email" variant="outlined" name="email" value={formik.values.email} onChange={formik.handleChange} />
            {id == undefined && <FormControl variant="outlined">
              <InputLabel>Mot de passe</InputLabel>
              <OutlinedInput
                name={"password"}
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mot de passe"
              />
            </FormControl>}
          </StyledFieldset>
        </Box>
        <Box sx={{ mb: 2 }}>
          <StyledFieldset>
            <legend>Informations personnels : </legend>
            <TextField label="Nom" variant="outlined" sx={{ mr: 2 }} name="name" value={formik.values.name} onChange={formik.handleChange} />
            <TextField label="Prénom" variant="outlined" sx={{ mr: 2 }} name="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
            <TextField label="Téléphones" variant="outlined" name="telephones" value={formik.values.telephones} onChange={formik.handleChange} />
          </StyledFieldset>
        </Box>
        <Box sx={{ mb: 2 }}>
          <StyledFieldset>
            <legend>Adresse : </legend>
            <TextField label="Région" variant="outlined" sx={{ mr: 2 }} name="region" value={formik.values.region} onChange={formik.handleChange} />
            <TextField label="Commune" variant="outlined" sx={{ mr: 2 }} name="commune" value={formik.values.commune} onChange={formik.handleChange} />
            <TextField label="Fokontany" variant="outlined" sx={{ mr: 2 }} name="fokontany" value={formik.values.fokontany} onChange={formik.handleChange} />
            <TextField label="Lot" variant="outlined" name="lot" value={formik.values.lot} onChange={formik.handleChange} />
          </StyledFieldset>
        </Box>
        <Box sx={{ mb: 2 }}>
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
        <Box sx={{ mb: 2 }}>
          <FormGroup>
            <FormControlLabel control={<Switch name={"active"} checked={formik.values.active} onChange={formik.handleChange} />} label="Active" />
          </FormGroup>
        </Box>
        <Button variant={"contained"} type={"submit"}>Sauvegarder</Button>
      </form>
    </Box>
  )
}