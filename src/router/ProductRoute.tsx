import Brand from "../pages/product/brand/Brand"
import BrandForm from "../pages/product/brand/BrandForm"
import TypeForm from "../pages/product/type/TypeForm"
import Type from "../pages/product/type/Type"

import { RouteType } from "./Index"
import Model from "../pages/product/model/Model"
import ModelForm from "../pages/product/model/ModelForm"
import Product from "../pages/product/product/Product"
import ProductForm from "../pages/product/product/ProductForm"
import Store from "../pages/product/store/Store"
import StoreForm from "../pages/product/store/StoreForm"
import Property from "../pages/product/property/Property"
import PropertyForm from "../pages/product/property/PropertyForm"
import Collection from "../pages/product/collection/Collection"
import CollectionForm from "../pages/product/collection/CollectionForm"
import { ProductFormNew } from "../pages/product/product/ProductFormNew"
import { ProductFormEdit } from "../pages/product/product/ProductFormEdit"

const BrandRoute: RouteType[] = [
  {
    path: "/brand",
    element: <Brand />,
  },
  {
    path: "/brand/create",
    element: <BrandForm newForm={true} />,
  },
  {
    path: "/brand/edit/:brandId",
    element: <BrandForm newForm={false} />,
  },
]

const TypeRoute: RouteType[] = [
  {
    path: "/type",
    element: <Type />
  },
  {
    path: "/type/create",
    element: <TypeForm newForm={true} />
  },
  {
    path: "/type/edit/:typeId",
    element: <TypeForm newForm={false} />
  },
]

const ModelRoute: RouteType[] = [
  {
    path: "/model",
    element: <Model />
  },
  {
    path: "/model/create",
    element: <ModelForm newForm={true} />
  },
  {
    path: "/model/edit/:modelId",
    element: <ModelForm newForm={false} />
  },
]

const InnerProductRoute: RouteType[] = [
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/product/create",
    element: <ProductFormNew />,
  },
  {
    path: "/product/edit/:sku",
    element: <ProductFormEdit />,
  },
]

const PropertyRoute: RouteType[] = [
  {
    path: "/property",
    element: <Property />,
  },
  {
    path: "/property/create",
    element: <PropertyForm newForm={true} />,
  },
  {
    path: "/property/edit/:propertyId",
    element: <PropertyForm newForm={false} />,
  },
]

const StoreRoute: RouteType[] = [
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/store/create",
    element: <StoreForm newForm={true} />,
  },
  {
    path: "/store/edit/:storeId",
    element: <StoreForm newForm={false} />,
  },
]

const CollectionRoute: RouteType[] = [
  {
    path: "/collection",
    element: <Collection />,
  },
  {
    path: "/collection/create",
    element: <CollectionForm newForm={true} />,
  },
  {
    path: "/collection/edit/:collectionId",
    element: <CollectionForm newForm={false} />,
  },
]

export const ProductRoute: RouteType[] =
  [
    ...CollectionRoute,
    ...BrandRoute,
    ...TypeRoute,
    ...ModelRoute,
    ...InnerProductRoute,
    ...PropertyRoute,
    ...StoreRoute,
    {
      path: "/discount",
      element: <div></div>,
    },
  ]
