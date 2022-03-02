import Box from "@mui/material/Box";
import {Alert, AlertTitle, Avatar, Button, Card, CardContent, Grid, Link, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useFormik} from "formik";
import React from "react";

interface LoginFormProps {
  loginAction: (email: string, password: string) => void
  badCredential: boolean
}

export function LoginForm({ loginAction, badCredential }: LoginFormProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      loginAction(values.email, values.password)
    }
  })

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight={"100vh"}
    >
      {badCredential && <Box sx={{mb: 2}}>
        <Alert severity="error">
          <AlertTitle>Erreur</AlertTitle>
          Email ou mot de passe erroné
        </Alert>
      </Box>}
      <Card variant="elevation">
        <CardContent>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Se connecter
            </Typography>
          </Box>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              label="Email"
              required
              fullWidth
              name="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              label="Mot de passe"
              required
              fullWidth
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}