import _ from 'lodash';

import { getHashFromString } from '../../utilities/crypto';

export default {
  getUserFromRequestBody(body) {
    return _.merge(body, {
      currentPassword: body.currentPassword || null,
      password: body.password ? getHashFromString(body.password) : null,
      confirmPassword: body.confirmPassword ? getHashFromString(body.confirmPassword) : null
    });
  },
};
