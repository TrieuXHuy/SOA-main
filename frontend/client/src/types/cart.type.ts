export interface CartItem {
  cartItemID: string;
  userID: string;
  productID: string;
  productName: string;
  exportPrice: number;
  sale: number;
  imageUrl: string;
  productTypeID: string;
  productTypeName: string | null;
  supplierName: string | null;
  totalItems: number;
  priceUnit: number;
}

export interface ExtendedCartItem extends CartItem {
  disabled: boolean;
  checked: boolean;
}
