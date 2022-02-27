import ClientForm from "../../../../components/forms/ClientForm";
import {FC} from "react";
import AdminLayout from "../../../../components/layouts/AdminLayout";
import {useRouter} from "next/router";


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