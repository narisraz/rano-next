import {FC} from "react";
import AdminLayout from "../../../../../components/layouts/AdminLayout";
import UserDetail from "../../../../../components/UserDetail";
import {useRouter} from "next/router";

export default function AdminUserDetail() {

  const router = useRouter()
  const id = router.query.userId
  const clientId = router.query.clientId

  return <UserDetail id={id as string} clientId={clientId as string} />
}

AdminUserDetail.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}