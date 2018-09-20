import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/08-timelines.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
