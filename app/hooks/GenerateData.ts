// utils/generateAndUploadProducts.ts
import { faker } from '@faker-js/faker';
import { db } from '../Firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  slug: string;
  creationAt: string;
  updatedAt: string;
  type: 'casual' | 'formal' | 'party' | 'gym' | 'uncategorized';
}

const clothingTypes: Product['type'][] = ['casual', 'formal', 'party', 'gym'];

function generateFakeProduct(index: number): Product {
  const isNew = index < 5; // First 5 are newly added
  const creationDate = isNew
  ? faker.date.between({ from: new Date('2025-04-01'), to: new Date('2025-04-30') })
  : faker.date.between({ from: new Date('2024-01-01'), to: new Date('2024-12-31') });

  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    images: [faker.image.url()],
    category: {
      id: faker.number.int({ min: 1, max: 10 }),
      name: 'clothes',
      image: faker.image.url(),
      slug: 'clothes',
    },
    slug: faker.lorem.slug(),
    creationAt: creationDate.toISOString(),
    updatedAt: faker.date.recent({ days: 10 }).toISOString(),
    type: faker.helpers.arrayElement(clothingTypes),
  };
}

export async function uploadFakeProducts(count = 10) {
  const products = Array.from({ length: count }, (_, i) => generateFakeProduct(i));
  const colRef = collection(db, 'products');

  for (const product of products) {
    const docRef = doc(colRef, product.id);
    await setDoc(docRef, product);
    console.log(`Uploaded: ${product.title}`);
  }

  console.log(' All products uploaded to Firebase.');
}
