import { Product } from "src/types/ProductTypes.ts";
import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Add, Cancel, Delete, Edit, Remove, Save } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Formik } from "formik";
import { useCartContext } from "src/context/cartContext.tsx";

const useStyles = makeStyles()(() => ({
  row: {
    cursor: "pointer",
  },
}));

const ProductTableRow = ({ product }: { product: Product }) => {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { addProductToCart, isInCart, removeFromCart } = useCartContext();

  const [isEdit, setIsEdit] = useState(false);

  const deleteM = useMutation(
    ["deleteProduct"],
    (id: number): Promise<Product> => {
      const url = `https://dummyjson.com/products/${id}`;
      return axios.delete(url);
    },
    {
      onSuccess: () => {
        enqueueSnackbar("Deleted");
      },
    }
  );

  const updateM = useMutation(
    ["updateProduct"],
    (product: Product): Promise<Product> => {
      const { id, ...rest } = product;

      const url = `${import.meta.env.VITE_DUMMYJSON_API_URL}/products/${id}`;
      return axios.put(url, rest);
    },
    {
      onSuccess: () => enqueueSnackbar("Updated"), // invalidation query is necessary here
    }
  );

  if (isEdit)
    return (
      <Formik
        initialValues={product}
        onSubmit={(values) => {
          // some validations
          updateM.mutate(values);
        }}
      >
        {({ values, handleChange, submitForm }) => (
          <TableRow hover className={classes.row}>
            <TableCell>{product.id}</TableCell>
            <TableCell>
              <TextField name="title" size="small" fullWidth value={values.title} onChange={handleChange} />
            </TableCell>
            <TableCell>
              <TextField name="price" size="small" fullWidth value={values.price} onChange={handleChange} />
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
              <IconButton onClick={() => setIsEdit(false)}>
                <Cancel />
              </IconButton>
              <IconButton onClick={submitForm} disabled={updateM.isLoading}>
                <Save />
              </IconButton>
            </TableCell>
          </TableRow>
        )}
      </Formik>
    );

  return (
    <TableRow hover className={classes.row}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>
        {isInCart(product.id) ? (
          <IconButton onClick={() => removeFromCart(product.id)}>
            <Remove />
          </IconButton>
        ) : (
          <IconButton onClick={() => addProductToCart(product)}>
            <Add />
          </IconButton>
        )}
        <IconButton onClick={() => setIsEdit(true)}>
          <Edit />
        </IconButton>
        <IconButton disabled={deleteM.isLoading} onClick={() => deleteM.mutate(product.id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
