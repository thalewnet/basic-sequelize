const { Sequelize, DataTypes, json } = require('sequelize');
const sequelize = new Sequelize({
  host: 'localhost',
  username: 'root001',
  password: '046012574',
  database: 'todo_seq',
  dialect: 'mysql', // ตัวกำหนดว่าใช้ DB อันไหน
});

/////////////////////////////////////////////////////////////////////////////  For testing connecting Database /////////////////////////

// sequelize
//   .authenticate()
//   .then(() => console.log('DB connected'))
//   .catch((err) => {
//     console.log('Cannot connect DB', err);
//   }); // return ค่าเป็น promise ดังนั้นต้อง .then .catch ที่เขียนเป็น then catch เพราะอยู่ใน top level ของ code หากเขียนเป็น async await ต้องประกาศ fn อีกทีนึงแล้วค่ยอเรียกใช้ fn

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const User = sequelize.define(
  'User',
  {
    // สาามารถละได้หากชื่อ primary key คือ id และเป็น auto increment ด้วยจะมี property ตามด้านล่างเลย
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      //   field: 'fname', //ตั้งชื่อ Column
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      //   field: 'last_name',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // column ห้ามมีค่าที่ซ้ำกันใน column
      validate: {
        isEmail: true,
      },
    },
  },
  { underscored: true }
  //   { tableName: 'person', timestamps: false, underscored: true } // underscored => map ชื่อ column กับ property ของ model
);

// sequelize.sync() สร้างใหม่เหมือนกัน แต่จะไม่ทำอะไร table เก่า แค่สร้างอันใหม่ หากสร้างเสร็จแล้วให้ comment คำสั่ง sync ไปเลย
// sequelize.sync({ force: true }); // sync คือ sync หรือ mapping model เข้าไปกับ MySQL  force คือทำการ Drop table ทั้งหมดใน DB หากมีก่อนหน้า และจะสร้างใหม่

// findOne เป็น promise object ซึ่งปกติใช้ async await ทำ

// User.findOne({ where: { id: 1 } }).then((user) =>
//   console.log(JSON.stringify(user, null, 2))
// );

//Mapping model into old db

// const Account = sequelize.define(
//   'Account',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       autoIncrement: true,
//       field: 'ACCOUNT_ID',
//     },
//     availBalance: {
//       type: DataTypes.FLOAT,
//       defaultValue: null,
//       field: 'AVAIL_BALANCE',
//     },
//   },
//   {
//     tableName: 'account',
//   }
// );
const List = sequelize.define(
  'List',
  {
    // สามารถ ละ id ได้
    //   id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true,
    //   },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
    },
    // กรณีมีแต่ type อย่างเดียว สามารถเขียนแบบ shorthand ได้ แบบข้างล่าง
    // dueDate: DataTypes.DATEONLY
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   },
    // },
  },
  {
    underscored: true,
  }
);

module.exports = { sequelize, User, List };
