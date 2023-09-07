import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { addUser } from "src/api/apiService.ts";
import { User } from "src/types/UserTypes.ts";

const AddUserPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    firstName: "",
    lastName: "",
    age: 0,
  };

  const addUserM = useMutation(["addUser"], addUser, {
    onSuccess: (newUser) => {
      console.debug(newUser);
      enqueueSnackbar("Success", { variant: "success" });
    },
  });

  const handleSubmit = (values: Partial<User>) => {
    const valuesToPost = {
      ...values,
      age: Number(values.age),
    };
    addUserM.mutate(valuesToPost);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => {
        // console.debug({ formikProps });
        return (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="firstName"
                label="First Name"
                size="small"
                fullWidth
                value={formikProps.values.firstName}
                onChange={formikProps.handleChange}
              />
              <TextField
                name="lastName"
                label="Last Name"
                size="small"
                fullWidth
                value={formikProps.values.lastName}
                onChange={formikProps.handleChange}
              />
              <TextField
                name="age"
                label="Age"
                size="small"
                fullWidth
                value={formikProps.values.age || ""}
                onChange={formikProps.handleChange}
              />
              <Button type="submit" variant="contained" disabled={addUserM.isLoading}>
                {addUserM.isLoading ? <CircularProgress size="1rem" /> : "Save"}
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddUserPage;
