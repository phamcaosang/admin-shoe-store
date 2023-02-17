export interface BrandInMoldel {
    brandId: string,
    brandName: string
}
export interface TypeInModel {
    productTypeId: string,
    typeName: string
}

export interface ModelType {
    id: string,
    name: string,
    description: string,
    brand: BrandInMoldel,
    type: TypeInModel
}


export const dataModel: ModelType[] = [
    {
        id: "1",
        name: "NIKE MERCURIAL",
        description: "Mô tả cho model NIKE MERCURIAL",
        brand: {
            brandId: "1",
            brandName: "Nike"
        },
        type: {
            productTypeId: "3",
            typeName: "Giày"
        }
    },
    {
        id: "2",
        name: "NIKE PHANTOM",
        description: "Mô tả cho model NIKE PHANTOM",
        brand: {
            brandId: "1",
            brandName: "Nike"
        },
        type: {
            productTypeId: "3",
            typeName: "Giày"
        }
    },
    {
        id: "3",
        name: "NIKE TIEMPO",
        description: "Mô tả cho model NIKE TIEMPO",
        brand: {
            brandId: "1",
            brandName: "Nike"
        },
        type: {
            productTypeId: "3",
            typeName: "Giày"
        }
    },
    {
        id: "4",
        name: "ADIDAS X",
        description: "Mô tả cho model ADIDAS X",
        brand: {
            brandId: "2",
            brandName: "ADIDAS"
        },
        type: {
            productTypeId: "3",
            typeName: "Giày"
        }
    },
    {
        id: "5",
        name: "ADIDAS PREDATOR",
        description: "Mô tả cho model ADIDAS PREDATOR",
        brand: {
            brandId: "2",
            brandName: "ADIDAS"
        },
        type: {
            productTypeId: "3",
            typeName: "Giày"
        }
    }
]