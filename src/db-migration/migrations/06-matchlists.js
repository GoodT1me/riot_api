import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/06-matchlists.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
