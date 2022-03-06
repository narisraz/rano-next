import {FC} from "react";
import ClientLayout from "../../components/layouts/ClientLayout";
import Box from "@mui/material/Box";

export default function Encaissement() {
  return (
    <>
      <Box>
        Encaissement
      </Box>
    </>
  )
}

Encaissement.getLayout = function getLayout(page: FC) {
  return (
    <ClientLayout>
      {page}
    </ClientLayout>
  )
}