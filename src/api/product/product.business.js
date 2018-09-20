import sqlConfig from '../../config/sequelize';

import * as DB from '../../utilities/database';
import { ValidationError } from '../../utilities/resources/errors';

const { Product } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const getWhereClauseByActive = () => Object.assign({}, {
  where: {
    active: 1
  }
});

const validate = (product) => {
  if (! product.pr_name) {
    throw new ValidationError(400, 'required product name');
  }
};

export default {

  list() {
    return DB.list(Product);
  },

  getById(ProductId) {
    const options = Object.assign(getWhereClauseById(ProductId));
    return DB.find(Product, options);
  },

  getByCode(code) {
    return DB.find(Product, {
      where: {
        code
      }
    });
  },

  async create(body) {
    validate(body);
    return DB.create(Product, body);
  },

  async update(id, body) {
    await DB.find(Product, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validate(body);

    Object.assign(body, { id });

    return DB.update(Product, body);
  },

  destroy(ProductId) {
    return DB.destroy(Product, getWhereClauseById(ProductId));
  }
};
