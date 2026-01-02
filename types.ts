export interface Product {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  shortDescription: string;
  longDescription: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  billingAddress: Address;
  shippingAddress: Address;
  date: string;
}

export type ViewState = 'landing' | 'products' | 'detail' | 'cart' | 'success';