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