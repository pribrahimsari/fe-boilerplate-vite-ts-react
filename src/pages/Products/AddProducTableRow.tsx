import { Button, CircularProgress, TableCell, TableRow, TextField } from "@mui/material";
import { Formik } from "formik";
import { Product } from "src/types/ProductTypes.ts";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const AddProducTableRow = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const addProduct = (productData: Partial<Product>): Promise<Product> => {
    const baseUrl = import.meta.env.VITE_DUMMYJSON_API_URL;
    const url = new URL("products/add", baseUrl);
    return axios.post(url.href, productData).then((res) => res.data);
  };
  const { mutate, isLoading } = useMutation(["addProduct"], addProduct, {
    onSuccess: (data) => {
      enqueueSnackbar(`Successfully saved: ${data.title}`, { variant: "success" });
      queryClient.invalidateQueries(["getProducts"]);
    },
  });

  const initialValues = {
    title: "",
    price: 0,
    category: "",
  };
  const handleSubmit = (values: Partial<Product>) => {
    // some validations
    mutate(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, submitForm }) => {
        return (
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>
              <TextField name="title" size="small" fullWidth value={values.title} onChange={handleChange} />
            </TableCell>
            <TableCell>
              <TextField name="price" size="small" value={values.price} onChange={handleChange} />
            </TableCell>
            <TableCell>
              <TextField
                name="category"
                size="small"
                fullWidth
                value={values.category}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <Button onClick={submitForm} disabled={isLoading} variant={"contained"}>
                {isLoading && <CircularProgress size="1.25rem" />}
                {!isLoading && "Submit"}
              </Button>
            </TableCell>
          </TableRow>
        );
      }}
    </Formik>
  );
};

export default AddProducTableRow;
