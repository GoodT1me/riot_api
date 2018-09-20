import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/02-products.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
