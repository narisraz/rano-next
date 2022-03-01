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
import {
  Alert,
  AlertTitle,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField
} from "@mui/material";
import {StyledFieldset} from "./StyledFieldset";
import {AUTH, AUTH_STATE} from "../../configurations/firebase.config";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export interface UserFormProps {
  id?: string
  clientId?: string
}

export function UserForm({ id, clientId }: UserFormProps) {
  const refs: Subscription[] = [];
  const router = useRouter()
  const [emailAlreadyInUser, setEmailAlreadyInUser] = useState<string>()
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
    password: ''
  })

  useEffect(() => {
    if (id) {
      const refClientUser = combineLatest([
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
          password: ''
        })
      })
      refs.push(refClientUser)
    } else {
      const refClient = getClient.execute(clientId as string).subscribe(client => {
        setClientName(client?.name ?? '')
        setOpenBackdrop(false)
      })
      refs.push(refClient)
    }

    return () => {
      refs.forEach(ref => ref.unsubscribe())
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

      if (!id) {
        const refAuth = AUTH_STATE.subscribe(async loggedUser => {
          if (loggedUser?.email != user.email) {
            await createUserWithEmailAndPassword(AUTH, values.email, values.password)
              .then(_ => AUTH.updateCurrentUser(loggedUser))
              .then(async _ => {
                if (!emailAlreadyInUser) {
                  const user$ = addUser.execute(user)
                  await lastValueFrom(user$)
                    .then(() => router.replace("/admin/client/list"));
                }
              })
              .catch(() => {
                setOpenBackdrop(false)
                setEmailAlreadyInUser(user.email)
              })
          }
        })
        refs.push(refAuth)
      } else {
        const user$ = updateUser.execute(Builder(user).id(id).build())
        await lastValueFrom(user$)
          .then(() => router.replace("/admin/client/list"));
      }
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
      <AppBackdrop opened={openBackdrop} />
      <h3>{clientName} - Nouvel employé</h3>
      <Divider />
      <Box sx={{m: 2}}></Box>
      <form onSubmit={formik.handleSubmit}>
        {emailAlreadyInUser && <Alert severity="error" sx={{mb: 2}}>
          <AlertTitle>Erreur</AlertTitle>
          L&apos;adresse email <strong>{emailAlreadyInUser}</strong> correspond a un compte déjà existant
        </Alert>}
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