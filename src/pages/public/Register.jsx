import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { registerValidationSchema } from "./loginValidatonSchema";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import PopupModal from "../../components/PopupModal";
const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  const { registeredUsers, setRegisteredUsers } = useContext(Context);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      const isRegistered = registeredUsers?.find(
        (q) => q.email == values.email
      );
      if (!isRegistered) {
        setOpen(true);
        setRegisteredUsers([...registeredUsers, values]);
        setTitle("you registered succesfully");
      } else {
        setTitle("already registered");
        setOpen(true);
      }
    },
  });
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                fullWidth
                margin="normal"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                margin="normal"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <PopupModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        title={title}
      />
    </>
  );
}
