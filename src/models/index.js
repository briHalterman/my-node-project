// let users = {
//   1: {
//     id: '1',
//     username: 'Robin Wieruch',
//   },
//   2: {
//     id: '2',
//     username: 'Dave Davids',
//   },
// };

// let messages = {
//   1: {
//     id: '1',
//     text: 'Hello World',
//     userId: '1',
//   },
//   2: {
//     id: '2',
//     text: 'By World',
//     userId: '2',
//   },
// };

// export default {
//   users,
//   messages,
// };

import Sequalize from 'sequelize';

import getUserModel from './user';
import getMessageModel from './message';

const sequalize = new Sequalize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres'
  }
);

const models = {
  User: getUserModel(sequalize, Sequalize),
  Message: getMessageModel(sequalize, Sequalize)
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequalize };

export default models;