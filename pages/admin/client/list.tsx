import {Button} from "@mui/material";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {FC} from "react";

export default function ClientList() {
  return (
    <Button>Yes</Button>
  )
}

ClientList.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}