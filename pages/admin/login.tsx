import {LoginForm} from "../../components/forms/LoginForm";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {AUTH, AUTH_STATE} from "../../configurations/firebase.config";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {AppBackdrop} from "../../components/AppBackdrop";
import {encryptPassword} from "../../src/security";

export default function Login() {

  const router = useRouter()
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [badCredential, setBadCredential] = useState(false)

  useEffect(() => {
    const ref = AUTH_STATE.subscribe(user => {
      if (user?.uid)
        router.replace("/admin/client/list")
    })

    return () => ref.unsubscribe()
  })

  const login = async (email: string, password: string) => {
    setOpenBackdrop(true)
    await signInWithEmailAndPassword(AUTH, email, encryptPassword(password))
      .then(_ => router.replace("/admin/client/list"))
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