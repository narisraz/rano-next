import {useRouter} from "next/router";
import React, {FC, useEffect, useState} from "react";
import AdminLayout from "../../../../../../components/layouts/AdminLayout";
import {UserForm, UserFormField} from "../../../../../../components/forms/UserForm";
import {combineLatest, lastValueFrom} from "rxjs";
import {getClient, getUser, updateUser} from "../../../../../../configurations/ioc.container";
import {Client} from "../../../../../../domain/entities/Client";
import {AppBackdrop} from "../../../../../../components/AppBackdrop";
import {User} from "../../../../../../domain/entities/User";
import {Builder} from "builder-pattern";
import {encryptPassword} from "../../../../../../src/security";

export default function EditUser() {

  const router = useRouter()
  const id = router.query.userId
  const clientId = router.query.clientId
  const [formFieldValue, setFormFieldValue] = useState<UserFormField>(new UserFormField())
  const [client, setClient] = useState<Client>()
  const [openBackdrop, setOpenBackdrop] = useState(true)

  async function updateAction(user: User) {
    setOpenBackdrop(true)
    const user$ = updateUser.execute(
      Builder(user)
        .id(id as string)
        .password(encryptPassword(user.password))
        .build()
    )
    await lastValueFrom(user$)
      .then(() => router.replace("/admin/client/list"));
  }

  useEffect(() => {
    const refClientUser = combineLatest([
      getUser.execute(id as string),
      getClient.execute(clientId as string)
    ]).subscribe(([user, client]) => {
      setOpenBackdrop(false)
      setClient(client)
      setFormFieldValue({
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
        password: user?.password ?? ''
      })
    })

    return () => refClientUser.unsubscribe()
  }, [id, clientId])

  return (
    <>
      <AppBackdrop opened={openBackdrop} />
      <UserForm id={id as string} client={client} formFieldValue={formFieldValue} action={updateAction} />
    </>
  )

}

EditUser.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}