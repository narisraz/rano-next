import type {NextFetchEvent, NextRequest} from 'next/server'
import {NextResponse} from "next/server";


export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const host = 'http:/localhost:3000'
  
  const fetcher = (input: RequestInfo, init?: RequestInit) => fetch(input, init).then(res => res.json())
  const adminRole = (role: number) => role < 0
  const redirectToRoleDefaultPage = (role: number) => {
    switch (role) {
      case 0: return NextResponse.redirect(`${host}/client/dashboard`)
      case 1: return NextResponse.redirect(`${host}/client/indexing`)
      case 2: return NextResponse.redirect(`${host}/client/invoicing`)
    }
  }
  const isLoginPage = (url: string) => url.includes('/login')
  const isLoggedIn = (result: any) => result.uid != undefined
  const redirectToLogin = () => NextResponse.redirect(`${host}/admin/login`)
  const redirectToClientList = () => NextResponse.redirect(`${host}/admin/client/list`)

  try {

    const token = req.cookies['token']
    const result = await fetcher(`${host}/api/auth?token=${token}`)

    if (isLoggedIn(result)) {
      if (isLoginPage(req.url)) {
        return redirectToClientList()
      } else if (!adminRole(result.role)) {
        return redirectToRoleDefaultPage(result.role)
      }
      return NextResponse.next()
    } else {
      if (isLoginPage(req.url)) {
        return NextResponse.next()
      }
      return redirectToLogin()
    }

  } catch (e) {
    return redirectToLogin()
  }
}