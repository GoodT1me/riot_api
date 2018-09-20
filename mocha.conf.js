import chai from 'chai';
import sinon from 'sinon';

import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiThings from 'chai-things';


// Load Chai assertions
global.expect = chai.expect;
global.assert = chai.assert;

// Load Sinon
global.sinon = sinon;

// Initialize Chai plugins
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiThings);


// Initialize post plugins initialization
chai.should();

process.env.NODE_ENV = 'development';
