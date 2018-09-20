/* eslint import/prefer-default-export:0 */

export class ValidationError extends Error {
  constructor(status = 400, message = 'EntityNotFound') {
    super(message);
    this.status = status;
  }
}
