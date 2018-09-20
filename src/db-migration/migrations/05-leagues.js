import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/05-leagues.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
