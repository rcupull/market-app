import { Post } from 'types/post';

export const dummyPostClothing: Post = {
  name: 'Basic Tee 6-Pack',
  createdBy: '123',
  price: 192,
  currency: 'USD',
  _id: '123',
  reviews: [200, 45, 7, 1, 1],
  createdAt: '2021-01-01',
  routeName: 'clothing',
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
      width: 50,
      height: 50,
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
      width: 50,
      height: 50,
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
      width: 50,
      height: 50,
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
      width: 50,
      height: 50,
    },
  ],
  colors: ['white', 'black', 'gray'],
  clothingSizes: ['M', '3XL', 'XL'],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
