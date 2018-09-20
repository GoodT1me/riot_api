import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/04-positions.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
