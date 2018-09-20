import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/01-languages.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
