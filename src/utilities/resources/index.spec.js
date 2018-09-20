/* globals describe, it, beforeEach, afterEach, expect */

import sinon from 'sinon';
import proxyquire from 'proxyquire';


const routerStub = {
  get: sinon.stub(),
  post: sinon.stub(),
  put: sinon.stub(),
  delete: sinon.stub(),
};

function Router() {
  return routerStub;
}

const ApiRouter = proxyquire.noPreserveCache()('./index', {
  express: {
    Router,
  },
}).default;


describe('API Utilities :: ', () => {
  let router = null;
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    router = new ApiRouter();
  });

  afterEach(() => {
    if (sandbox) {
      sandbox.restore();
    }
  });

  describe('Router :: ', () => {
    it('should provide 4 http methods plus the router get', () => {
      expect(router.get).to.be.a('function');
      expect(router.post).to.be.a('function');
      expect(router.put).to.be.a('function');
      expect(router.delete).to.be.a('function');

      expect(router.router).to.be.a('function');
    });

    it('should return self in order to chain methods', () => {
      expect(router.get(undefined, undefined)).to.equal(router);
      expect(router.post(undefined, undefined)).to.equal(router);
      expect(router.put(undefined, undefined)).to.equal(router);
      expect(router.delete(undefined, undefined)).to.equal(router);
    });

    it('should call respective express router method with path and fn', () => {
      ['get', 'post', 'put', 'delete'].forEach((method) => {
        router[method]('path', () => true, () => false);

        expect(routerStub[method]).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.func,
          sinon.match.func,
        );
      });
    });
  });
});
