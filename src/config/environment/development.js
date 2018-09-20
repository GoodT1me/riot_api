export default {
  sequelize: {
    database: 'uniceta_api',
    username: 'uniceta_root',
    password: 'admin123',
    options: {
      host: 'host',
      port: 3306,
      dialect: 'mysql',
      define: {
        timestamps: false,
        underscored: false,
      },
      logging: null,
    },
  },

  redis: {
    host: 'host',
  },

  log: 'debug',
};
