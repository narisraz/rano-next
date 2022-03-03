import {useRouter} from "next/router";
import React, {useState} from "react";
import {AUTH} from "../../configurations/firebase.config";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {encryptPassword} from "../../src/security";
import {AppBackdrop} from "../../components/AppBackdrop";
import {LoginForm} from "../../components/forms/LoginForm";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import nookies from "nookies";
import {firebaseAdmin} from "../../configurations/firebaseadmin.config";

export default function Login() {

  const router = useRouter()
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [badCredential, setBadCredential] = useState(false)

  const login = async (email: string, password: string) => {
    setOpenBackdrop(true)
    await signInWithEmailAndPassword(AUTH, email, encryptPassword(password))
      .then(_ => router.replace("/client/list"))
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

interface Props {
  uid: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    const { uid } = token;

    if (uid) {
      return {
        props: {
          uid: ''
        },
        redirect: {
          statusCode: 302,
          destination: '/client/list'
        }
      }
    }

    return {
      props: {
        uid: ''
      },
    }

  } catch (e) {
    return {
      props: {
        uid: ''
      },
    }
  }
}