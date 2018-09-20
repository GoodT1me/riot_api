import crypto from 'crypto';


export const getHashFromString = (data) => {
  const hash = crypto.createHash('sha512');
  hash.update(data);
  return hash.digest('hex');
};

export default {
  getHashFromString,
};
