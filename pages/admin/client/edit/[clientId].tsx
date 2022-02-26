import ClientForm from "../../../../components/forms/ClientForm";
import {FC, useEffect, useState} from "react";
import AdminLayout from "../../../../components/layouts/AdminLayout";
import {useRouter} from "next/router";
import {bind} from "@react-rxjs/core";
import {getClient} from "../../../../configurations/ioc.container";

const [client] = bind((id: string) => getClient.execute(id), undefined)

export default function EditClient() {

  const router = useRouter()
  const id = router.query.clientId

  return <ClientForm id={id as string}/>

}

EditClient.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}