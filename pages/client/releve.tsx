import Box from "@mui/material/Box";
import {FC} from "react";
import ClientLayout from "../../components/layouts/ClientLayout";

export default function Releve() {
  return (
    <>
      <Box>
        Relevé
      </Box>
    </>
  )
}

Releve.getLayout = function getLayout(page: FC) {
  return (
    <ClientLayout>
      {page}
    </ClientLayout>
  )
}