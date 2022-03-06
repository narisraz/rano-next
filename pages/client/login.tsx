import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {AUTH, AUTH_STATE} from "../../configurations/firebase.config";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {encryptPassword} from "../../src/security";
import {AppBackdrop} from "../../components/AppBackdrop";
import {LoginForm} from "../../components/forms/LoginForm";
import Cookies from "js-cookie";

export default function Login() {

  const router = useRouter()
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [badCredential, setBadCredential] = useState(false)

  useEffect(() => {
    const ref = AUTH_STATE.subscribe(async user => {
      if (user?.uid) {
        const token = await user.getIdToken()
        Cookies.set('token', token)

        const tokenResult = await AUTH.currentUser?.getIdTokenResult()
        const role = tokenResult?.claims.role ?? 0
        Cookies.set('role', `${role}`)
        switch (role) {
          case 0: await router.replace("/client/dashboard")
          case 1: await router.replace("/client/indexing")
          case 2: await router.replace("/client/encaissement")
        }
      }
    })

    return () => ref.unsubscribe()
  })

  const login = async (email: string, password: string) => {
    setOpenBackdrop(true)
    await signInWithEmailAndPassword(AUTH, email, encryptPassword(password))
      .catch(_ => {
        setBadCredential(true)
        setOpenBackdrop(false)
      })
  }

  return (
    <>
      <AppBackdrop opened={openBackdrop} />
      <LoginForm loginAction={login} badCredential={badCredential} />
    </>
  )
}