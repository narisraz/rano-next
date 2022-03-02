import React, {FC, useEffect, useState} from "react";
import AdminLayout from "../../../../../components/layouts/AdminLayout";
import {UserForm, UserFormField} from "../../../../../components/forms/UserForm";
import {useRouter} from "next/router";
import {addUser, getClient} from "../../../../../configurations/ioc.container";
import {Client} from "../../../../../domain/entities/Client";
import {AppBackdrop} from "../../../../../components/AppBackdrop";
import {lastValueFrom, Subscription} from "rxjs";
import {User} from "../../../../../domain/entities/User";
import {AUTH, AUTH_STATE} from "../../../../../configurations/firebase.config";
import {Alert, AlertTitle} from "@mui/material";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {encryptPassword} from "../../../../../src/security";


export default function NewUser() {
  const router = useRouter()
  const clientId = router.query.clientId
  const subscriptions: Subscription[] = []
  const [client, setClient] = useState<Client>()
  const [formFieldValue, setFormFieldValue] = useState<UserFormField>(new UserFormField())
  const [openBackdrop, setOpenBackdrop] = useState(true)
  const [emailAlreadyInUser, setEmailAlreadyInUser] = useState<string>()

  function saveAction(user: User) {
    setOpenBackdrop(true)
    const refAuth = AUTH_STATE.subscribe(async loggedUser => {
      if (loggedUser?.email != user.email) {
        await createUserWithEmailAndPassword(AUTH, user.email, encryptPassword(user.password))
          .then(_ => AUTH.updateCurrentUser(loggedUser))
          .then(_ => addUser.execute(user))
          .then(async user$ => lastValueFrom(user$))
          .then(_ => router.replace("/admin/client/list"))
          .catch(_ => {
            setOpenBackdrop(false)
            setEmailAlreadyInUser(user.email)
          })
      }
    })
    subscriptions.push(refAuth)
  }

  useEffect(() => {
    const refClient = getClient.execute(clientId as string).subscribe(client => {
      setOpenBackdrop(false)
      setClient(client)
      setFormFieldValue({
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
    })
    subscriptions.push(refClient)

    return () => subscriptions.forEach(value => value.unsubscribe())
  }, [clientId])

  const Error = () => {
    return (
      <>
        {emailAlreadyInUser && <Alert severity="error">
            <AlertTitle>Erreur</AlertTitle>
            L&apos;adresse email <strong>{emailAlreadyInUser}</strong> correspond a un compte déjà existant
        </Alert>}
      </>
    )
  }

  return (
    <>
      <AppBackdrop opened={openBackdrop} />
      <UserForm client={client} formFieldValue={formFieldValue} action={saveAction} Error={Error} />
    </>
  )
}

NewUser.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}