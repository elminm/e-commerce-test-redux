import * as Yup from "yup";
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is Required").email("Invalid Email"),
  password: Yup.string()
    .required("Password Must Fill")
    .min(3, "Password Min 3 Character"),
});
export const registerValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is Required").email("Invalid Email"),
  username: Yup.string()
    .required("Username must Fill")
    .min(4, "Min 4 Character"),
  password: Yup.string()
    .required("Password Must Fill")
    .min(3, "Password Min 3 Character"),
  confirmPassword: Yup.string()
    .required("You need to confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
export const editValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description must Fill"),
  price: Yup.number().integer().min(1).required("Price Must Fill"),
});
