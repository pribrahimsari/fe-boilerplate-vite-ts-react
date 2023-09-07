import { useQuery } from "@tanstack/react-query";
import { getProducts } from "src/api/apiService.ts";
import { Box, CircularProgress } from "@mui/material";
import ProductsTable from "src/types/ProductsTable.tsx";

const ProductsPage = () => {
  const { data, isLoading, isFetching } = useQuery(["getProducts"], getProducts, {
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );

  if (!data) return <>Data N/A</>;

  return (
    <>
      {isFetching && <div>Refreshing...</div>}
      <ProductsTable data={data} />
    </>
  );
};

export default ProductsPage;
