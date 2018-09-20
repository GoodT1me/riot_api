import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/09-statuses.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
