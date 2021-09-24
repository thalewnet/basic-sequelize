const { User, List } = require('./db/index'); // ต้อง import เข้ามาในไฟล์ index ถึงจะสามารถ connect ได้ เพราะ nodemon เรียกใช้ไฟล์นี้
const { Op } = require('sequelize');
//  #1 INSERT ROW USING INSTANCE, UPDATE ROW USING INSTANCE

//  Instance object จาก Class ซึ่งโดยปกติจะใช้จาก new keyword แต่ sequlize จะให้สร้างผ่าน method
// const objUser = new User() // สามารถใช้ได้ แต่ไม่แนะนำให้ใช้

// USE THIS
//  . build() นี้เป็น Static method ใช้สำหรับสร้าง object(เรียกใช้ method จากชื่อ Class โดยตรง) => เป็น synchornous

// const user = User.build({
//   email: 'john@gmail.com',
//   firstName: 'John',
//   lastName: 'Doe',
// });

// console.log(JSON.stringify(user, null, 2));

// user.save(); //save is instance method (เรียกกใช้ method จาก Instance หรือ Object เรียกว่า instance method) => ใช้สำหรับ create และ update
// .save() เป็น asynchornous หรือ return ค่าเป็น promise object

// UPDATE ROWS USING INSTANCE

// const update = async () => {
//   const user = await User.findOne({ where: { id: 1 } });
//   console.log(user.toJSON());
//   user.email = 'joe@gmail.com';
//   user.firstName = 'Joe';
//   user.save(); //Instance method
// };

// update();

// DELETE ROWS USING INSTNACE
// const del = async () => {
//   const user = await User.findOne({ where: { id: 1 } });
//   console.log(user.toJSON());
//   user.destroy(); // .destory() => instance method
// };

// del();

//  USING STATIC METHOD

// CREATE ROWS BY CREATE METHOD
// const staticCreate = async () => {
//   const newUser = await User.create({
//     email: 'peter@gmail.com',
//     firstName: 'Peter',
//     lastName: 'Parker',
//   });
//   console.log(newUser.toJSON());
// };

// staticCreate();

// UPDATE ROWS BY UPDATE METHOD

// const staticUpdate = async () => {
//   const result = await User.update(
//     { firstName: 'Paul', email: 'Paul@gmail.com' },
//     { where: { id: 4 } }
//   );
//   console.log(result);
// };

// staticUpdate();

// DELETE ROWS BY DESTROY METHOD

// const staticDelete = async () => {
//   const result = await User.destroy({ where: { id: 3 } });
//   console.log(result);
// };

// staticDelete();

// Create Multiple Record

// .bulkCreate([{},{},{},{}]) => รับ parameter เป็น array ของ object แต่ละ row
// User.bulkCreate([
//   {
//     email: 'jack@gmail.com',
//     firstName: 'Jack',
//     lastName: 'Ma',
//   },
//   {
//     email: 'harry@gmail.com',
//     firstName: 'Harry',
//     lastName: 'Potter',
//   },
//   {
//     email: 'ronaldo@gmail.com',
//     firstName: 'Crist',
//     lastName: 'Ronaldo',
//   },
//   {
//     email: 'wan@gmail.com',
//     firstName: 'Wan',
//     lastName: 'Mark',
//   },
//   {
//     email: 'Sponge@gmail.com',
//     firstName: 'Spongie',
//     lastName: 'Bob',
//   },
// ]);

// ****** SELECT QUERY *******//

const run = async () => {
  // SELECT ALL
  //   const rows = await User.findAll(); // .findAll() => คล้ายกับ SELECT * FROM users
  //   console.log(JSON.stringify(rows, null, 2));
  // SELECT some COLUMN USING ATTRIBUTES
  //   const result = await User.findAll({
  //     attributes: ['email', 'firstName'],
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  // หากไม่ได้ต้องการจะเปลี่ยนชื่อใส่ชื่อ property ตาม model แต่หากต้องการจะเปลี่ยนชื่อใหม่ ต้องใช้ ['',''] ซึ่งตัวแรกเป็นชื่อจากใน table ตัวสองคือชื่อใหม่
  //   const result = await User.findAll({
  //     attributes: ['email', 'firstName', ['created_at', 'createTime']],
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  // Exclude SOME Field => หากมีหลายๆ column ต้องเขียนยาว จะมี exclude มาบอกว่าไม่เอาตัวนั้นออก
  //   const result = await User.findAll({
  //     // attributes: ['email', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
  //     attributes: { exclude: ['id'] },
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  // SELECT WHERE CLAUSE
  // Using AND clause
  //   const result = await User.findAll({ where: { id: 4, firstName: 'Paul' } });
  //   if (result.length === 0) return console.log('Does not match in DB');
  //   console.log(JSON.stringify(result, null, 2));
  // Using OR clause
  //   const result = await User.findAll({
  //     where: { [Op.or]: [{ id: 4 }, { firstName: 'Wan' }] },
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  //   const result = await User.findAll({
  //     where: { [Op.or]: [{ id: 4 }, { firstName: 'Wan' }] },
  //     attributes: { exclude: ['id', 'createdAt'] },
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  //   const result = await User.findAll({
  //     where: {
  //       lastName: {
  //         // [Op.like]: 'P%',
  //         [Op.startsWith]: 'P',
  //       },
  //     },
  //     attributes: ['firstName', 'lastName'],
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  // };
  //   const result = await User.findAll({
  //     where: {
  //       lastName: {
  //         // [Op.like]: 'P%',
  //         [Op.startsWith]: 'P',
  //       }
  //     },
  //     attributes: ['firstName', 'lastName'],
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  //   const result = await User.findAll({
  //     where: {
  //       [Op.or]: [
  //         { firstName: { [Op.startsWith]: 'H' } },
  //         { lastName: { [Op.startsWith]: 'B' } },
  //       ],
  //     },
  //     attributes: ['firstName', 'lastName'],
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  // };
  //   const result = await User.findAll({
  //     where: {
  //       // [Op.or]: [{ id: 10 }, { id: 6 }, { id: 7 }, { id: 8 }],
  //       //   id: { [Op.in]: [6, 7, 9, 10] },
  //       id: [6, 7, 9, 10], // => shortHand Op.in
  //     },
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  //   const result = await User.findAll({
  //     where: { id: { [Op.gte]: 5 } },
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  //   const result = await User.findAll({
  //     where: { [Op.or]: [{ id: { [Op.lt]: 8 } }, { id: { [Op.gte]: 11 } }] },
  //   });
  //   console.log(JSON.stringify(result, null, 2));

  const result = await User.findAll({
    where: { id: { [Op.between]: [4, 9] } },
  });
  console.log(JSON.stringify(result, null, 2));
};
run();
