import { GetProductsQueryResult } from "src/types/ProductTypes.ts";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import ProductTableRow from "src/types/ProductTableRow.tsx";

const useStyles = makeStyles()(() => ({
  headCell: {
    textTransform: "capitalize",
  },
}));

const headCells = ["id", "title", "price", "category", "action"];

const HeadCells = () => {
  const { classes } = useStyles();
  return (
    <TableHead>
      {headCells.map((headCell) => (
        <TableCell key={headCell} className={classes.headCell}>
          {headCell}
        </TableCell>
      ))}
    </TableHead>
  );
};

/**
 * DEFAULT COMPONENT
 * @param data
 * @constructor
 */
const ProductsTable = ({ data }: { data: GetProductsQueryResult }) => {
  const { products } = data;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <HeadCells />
        <TableBody>
          {!products.length && (
            <TableRow>
              <TableCell colSpan={headCells.length}>
                <Typography component={"p"} sx={{ textAlign: "center" }}>
                  <i>-- No results --</i>
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {products.length &&
            products.map((product) => <ProductTableRow key={product.id} product={product} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
