import {NextFetchEvent, NextRequest, NextResponse} from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const host = 'http:/localhost:3000'

  const fetcher = (input: RequestInfo, init?: RequestInit) => fetch(input, init).then(res => res.json())
  const isLoginPage = (url: string) => url.includes('/client/login')
  const isLoggedIn = (result: any) => result.uid != undefined
  const redirectToLogin = () => NextResponse.redirect(`${host}/client/login`)
  const rewriteToAccessForbidden = () => NextResponse.rewrite(`${host}/403`)
  const redirectToRoleDefaultPage = (role: number) => {
    switch (role) {
      case -1: return NextResponse.redirect(`${host}/admin/client/list`)
      case 0: return NextResponse.redirect(`${host}/client/dashboard`)
      case 1: return NextResponse.redirect(`${host}/client/releve`)
      case 2: return NextResponse.redirect(`${host}/client/encaissement`)
    }
  }
  const hasRightAccess = (role: number, url: string) => {
    if (url.includes('encaissement')) {
      return [-1, 0, 2].includes(role)
    } else if (url.includes('releve')) {
      return [-1, 0, 1].includes(role)
    } else if (url.includes('dashboard')) {
      return [-1, 0].includes(role)
    }
  }

  try {
    const token = req.cookies['token']
    const result = await fetcher(`${host}/api/auth?token=${token}`)

    if (isLoggedIn(result)) {
      if (isLoginPage(req.url)) {
        return redirectToRoleDefaultPage(result.role)
      }
      if(!hasRightAccess(result.role, req.url)) {
        return rewriteToAccessForbidden()
      }
      return NextResponse.next()
    } else {
      if (isLoginPage(req.url)) {
        return NextResponse.next()
      }
      return redirectToLogin()
    }
  } catch (e) {

  }
}