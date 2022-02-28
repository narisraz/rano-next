import {FC} from "react";
import AdminLayout from "../../../../../components/layouts/AdminLayout";
import {UserForm} from "../../../../../components/forms/UserForm";
import {useRouter} from "next/router";


export default function NewUser() {
  const router = useRouter()
  const clientId = router.query.clientId

  return <UserForm clientId={clientId as string}/>
}

NewUser.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}