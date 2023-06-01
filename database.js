import { database } from './firebase'; // 假設您已在另一個檔案中初始化了 Firebase

const usersRef = database.ref('users');
const productsRef = database.ref('products');

const users = [
  // 使用者資料
];

const products = [
  // 產品資料
];

// 批量新增使用者資料
users.forEach(user => {
  const newUserRef = usersRef.push(user);
  const newUserId = newUserRef.key;
});

// 批量新增產品資料
products.forEach(product => {
  const newProductRef = productsRef.push(product);
  const newProductId = newProductRef.key;
});
