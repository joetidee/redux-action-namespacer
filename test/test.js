require('babel-register')();
import chai, {expect, assert} from 'chai';
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
import { nsActionTypes, nsActionTypesCheck } from '../src/index.js';


describe('reduxActionNamespacer', function() {

    let expectedValidResult = {
        table: {
            loading: 'table.loading',
            data: 'table.data',
            query: {
                sort: 'table.query.sort',
                limit: 'table.query.limit',
                search: 'table.query.search',
            }
        }
    };

    let actionsTypeHashValid = [
        'table', [
            'loading',
            'data',
            'query', [
                'sort',
                'limit',
                'search'
            ]
        ]
    ];

    let actionsTypeHashInvalid = [
        'table', [
            'loading',
            'data',
            'query', [
                'sort',
                'limit',
                'search'
            ]
        ],
        'table', [
            'data'
        ]
    ];

    describe('nsActionTypes()', function() {
        it('should return an object', function () {
            let result = nsActionTypes(actionsTypeHashValid);
            expect(result).to.be.an('object');
        });
        it('should return an object in the correct format', function () {
            let result = nsActionTypes(actionsTypeHashValid);
            expect(result).to.deep.equal(expectedValidResult);
        });
    });

    describe('nsActionTypesCheck()', function() {
        it('should return true on a valid array', function () {
            let result = nsActionTypesCheck(actionsTypeHashValid);
            expect(result).to.be.true;
        });
        it('should throw an error if a array is not supplied', function () {
            expect(() => nsActionTypesCheck()).to.throw(Error);
        });
        it('should throw an error if a array is invalid', function () {
            expect(() => nsActionTypesCheck(actionsTypeHashInvalid)).to.throw(Error);
        });
    });
});