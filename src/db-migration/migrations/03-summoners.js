import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/03-summoners.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
