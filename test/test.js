require('babel-register')();
import chai, {expect, assert} from 'chai';
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
import { nsActionTypes } from '../src/index.js';

describe('reduxActionNamespacer', function() {

    describe('nsActionTypes()', function() {
        it('should set the locale', function () {
            let localeSet = 'en-GB';
            setLocale(localeSet);
            let localeGet = getLocale();
            expect(localeSet).to.equal(localeGet);
        });
    });
});