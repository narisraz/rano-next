import {FC} from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import ClientForm from "../../../components/forms/ClientForm";


export default function NewClient() {

  return <ClientForm />

}

NewClient.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}