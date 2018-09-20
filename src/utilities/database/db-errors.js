/* eslint import/prefer-default-export:0 */

export class NotFoundError extends Error {
  constructor(status = 404, message = 'EntityNotFound') {
    super(message);
    this.status = status;
  }
}
