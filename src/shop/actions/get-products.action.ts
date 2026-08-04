import { tesloApi } from "@/api/tesloAPI"
import type { ProductsResponse } from "@/interfaces/prodcuts.response"

export const getProductsAction = async (): Promise<ProductsResponse> => {
    const {data} = await tesloApi.get<ProductsResponse>('/products')

    const prodcutsWithImageUrl = data.products.map((product) => ({
        ...product,
        images: product.images.map(
            (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        )
    }))

    return {
        ...data,
        products: prodcutsWithImageUrl
    }
}