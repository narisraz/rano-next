import {useRouter} from "next/router";
import {FC} from "react";
import AdminLayout from "../../../../../../components/layouts/AdminLayout";
import {UserForm} from "../../../../../../components/forms/UserForm";

export default function EditUser() {

  const router = useRouter()
  const id = router.query.userId
  const clientId = router.query.clientId

  return <UserForm id={id as string} clientId={clientId as string} />

}

EditUser.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}