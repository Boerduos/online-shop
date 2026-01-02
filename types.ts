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
  phone: string;
  fullAddress: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  date: string;
}

export type ViewState = 'landing' | 'products' | 'detail' | 'cart' | 'success';