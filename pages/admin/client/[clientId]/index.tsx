import {FC} from "react";
import AdminLayout from "../../../../components/layouts/AdminLayout";
import {useRouter} from "next/router";
import ClientDetail from "../../../../components/ClientDetail";

export default function AdminClientDetail() {
  const router = useRouter()
  const id = router.query.clientId

  return <ClientDetail id={id as string}/>

}

AdminClientDetail.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}