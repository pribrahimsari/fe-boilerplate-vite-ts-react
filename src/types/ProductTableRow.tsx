import { Product } from "src/types/ProductTypes.ts";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

const useStyles = makeStyles()(() => ({
  row: {
    cursor: "pointer",
  },
}));

const ProductTableRow = ({ product }: { product: Product }) => {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <TableRow hover className={classes.row}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>
        <IconButton>
          <Add />
        </IconButton>
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton disabled={deleteM.isLoading}>
          <Delete onClick={() => deleteM.mutate(product.id)} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
