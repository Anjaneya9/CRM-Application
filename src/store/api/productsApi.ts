import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse, CreateProductData, UpdateProductData } from '../../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit?: number; skip?: number }>({
      query: ({ limit = 30, skip = 0 } = {}) => `/products?limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    addProduct: builder.mutation<Product, CreateProductData>({
      query: (newProduct) => ({
        url: '/products/add',
        method: 'POST',
        body: newProduct,
      }),
      // Optimistic update for adding
      async onQueryStarted(newProduct, { dispatch, queryFulfilled }) {
        try {
          const { data: addedProduct } = await queryFulfilled;
          
          // Update the products list cache
          dispatch(
            productsApi.util.updateQueryData('getProducts', {}, (draft) => {
              draft.products.unshift(addedProduct);
              draft.total += 1;
            })
          );
        } catch {
          // If the mutation fails, the optimistic update will be reverted automatically
        }
      },
      // invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<Product, UpdateProductData>({
      query: ({ id, ...updatedProduct }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
      // Optimistic update for editing
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // Optimistically update the products list
        const patchResult = dispatch(
          productsApi.util.updateQueryData('getProducts', {}, (draft) => {
            const product = draft.products.find((p) => p.id === id);
            if (product) {
              Object.assign(product, patch);
            }
          })
        );

        // Optimistically update the individual product cache
        const patchSingleResult = dispatch(
          productsApi.util.updateQueryData('getProduct', id, (draft) => {
            Object.assign(draft, patch);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, revert the optimistic updates
          patchResult.undo();
          patchSingleResult.undo();
        }
      },
      // invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),
    deleteProduct: builder.mutation<{ isDeleted: boolean; id: number }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      // Optimistic update for deletion
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically remove from the products list
        const patchResult = dispatch(
          productsApi.util.updateQueryData('getProducts', {}, (draft) => {
            const index = draft.products.findIndex((p) => p.id === id);
            if (index !== -1) {
              draft.products.splice(index, 1);
              draft.total -= 1;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, revert the optimistic update
          patchResult.undo();
        }
      },
      // invalidatesTags: (result, error, id) => [
      //   { type: 'Product', id },
      //   { type: 'Product', id: 'LIST' },
      // ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;