import { Product } from "src/types/ProductTypes.ts";
import { TableCell, TableRow } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  row: {
    cursor: "pointer",
  },
}));

const ProductTableRow = ({ product }: { product: Product }) => {
  const { classes } = useStyles();

  return (
    <TableRow hover className={classes.row}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>TODO</TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
