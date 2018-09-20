import { readSqlFileAndExecute } from '../../utilities/database';

export default {
  up(queryInterface) {
    return readSqlFileAndExecute(
      `${__dirname}/10-champ_rotations.sql`,
      queryInterface.sequelize,
    );
  },

  down() {
  }
};
