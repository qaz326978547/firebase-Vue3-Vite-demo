
import { apiStore } from '@/stores/api.js'
const { initUsers, initProducts } = apiStore()

export const users = [
  {
    username: 'Rax',
    password: '123456',
    email: 'qqqq@gmail.com'
  },
  {
    username: 'Mary',
    password: '123456',
    email: 'qqqddddq@gmail.com'
  }
];

export const products = [
  {
    title: 'Product 1',
    price: 100,
    count: 10,
    img: 'img/product1.jpg',
    content: 'Content 1'
  },
  {
    title: 'Product 2',
    price: 200,
    count: 20,
    img: 'img/product2.jpg',
    content: 'Content 2'
  }
];

initUsers(users)
  .then(() => console.log('Users initialized'))
  .catch((error) => console.error(error));
initProducts(products)
  .then(() => console.log('Products initialized'))
  .catch((error) => console.error(error));
