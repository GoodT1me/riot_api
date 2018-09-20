import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/07-matches.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
