export interface CreateProductDTO {
    title: string;
    image: string;
    description: string;
    price: number;
    // owner: string
}

export type UpdateProductDTO = Partial<CreateProductDTO>;