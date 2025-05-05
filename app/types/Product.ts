export interface Product {
    id: string; // ←  should be number
    title: string;
    price: number;
    description: string;
    images: string[];
    category: string; 
    availabilityStatus?: string;
    brand?: string;
    dimensions?: {
      depth: number;
      height: number;
      width: number;
    };
    discountPercentage?: number;
    rating?: number;
    returnPolicy?: string;
    reviews?: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[]; // this assumes a consistent review structure
    shippingInformation?: string;
    sku?: string;
    stock?: number;
    tags?: string[];
    thumbnail?: string;
    warrantyInformation?: string;
    weight?: number;
    minimumOrderQuantity?: number;
    meta?: {
      barcode: string;
      qrCode: string;
      createdAt: string;
      updatedAt: string;
    };
  }