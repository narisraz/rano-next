import Box from "@mui/material/Box";
import {
  Button, Checkbox,
  Chip,
  FormControl,
  InputLabel, ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme
} from "@mui/material";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import {roles} from "../../../../../domain/entities/User";
import {FC, useState} from "react";
import AdminLayout from "../../../../../components/layouts/AdminLayout";
import {number} from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function NewUser() {
  const theme = useTheme();
  const router = useRouter()
  const clientId = router.query.clientId?.at(0)
  const [role, setRole] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof role>) => {
    const {
      target: { value },
    } = event;
    setRole(typeof value === 'string' ? value.split(',') : value,);
  };

  function getStyles(name: string, role: readonly string[], theme: Theme) {
    return {
      fontWeight:
        role.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      roles: '',
      active: true,
      clientId: clientId
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values))
      /*
      const user$ = addUser.execute(Builder(User)
        .email(values.email)
        .roles(values.roles)
        .active(values.active)
        .clientId(values.clientId ?? "")
        .build()
      )
      await lastValueFrom(user$)
        .then(() => router.replace("/admin/client/list"));*/
    }
  })

  return (
    <Box>
      <div>
        <h2>{clientId}</h2>
      </div>
      <h3>Nouvel utilisateur</h3>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <TextField label="Nom" variant="outlined" name="name" value={formik.values.email} onChange={formik.handleChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Rôles</InputLabel>
            <Select
              name={"role"}
              multiple
              value={role}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {roles.map((name, index) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, role, theme)}
                >
                  <Checkbox checked={role.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button sx={{ mt: 2 }} variant={"contained"} type={"submit"}>Sauvegarder</Button>
      </form>
    </Box>
  )
}

NewUser.getLayout = function getLayout(page: FC) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}