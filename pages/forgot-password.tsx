import Box from "@mui/material/Box";
import {Avatar, Button, Card, CardContent, Grid, Link, TextField} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import React from "react";
import {useFormik} from "formik";
import {sendPasswordResetEmail} from "@firebase/auth";
import {AUTH} from "../configurations/firebase.config";
import {useRouter} from "next/router";

export default function ForgotPassword() {

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async values => {
      await sendPasswordResetEmail(AUTH, values.email)
        .then(_ => router.back())
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
              Mot de passe oublié
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Envoyer
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}