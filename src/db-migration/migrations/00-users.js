import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/00-users.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
