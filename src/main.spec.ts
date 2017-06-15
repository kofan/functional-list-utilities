import 'mocha';
import { expect } from 'chai';
import {
  shallowEquals,
  map,
  reduce,
  filter,
  createMapReduceEngine
} from './main';

const noop = () => false;

describe('List utilities implemented with functional paradigm', () => {
  it('compares two lists using shallow algorithm', () => {
    expect(shallowEquals([1, 2, 3], [1, 2, 3])).to.be.true;
    expect(shallowEquals([1, 2, 3], [2, 3, 4])).to.be.false;
  });

  it('maps the list', () => {
    const actualSquares = map([1, 2, 3, 4, 5], (n) => (n ** 2));
    const expectedSquares = [1, 4, 9, 16, 25];

    expect(actualSquares).to.deep.equal(expectedSquares);
  });

  it('reduces the list', () => {
    const actualSum = reduce([1, 2, 3, 4, 5], (n, sum) => (n + sum), 0);
    const expectedSum = 15;

    expect(actualSum).to.equal(expectedSum);
  });

  it('filters the list', () => {
    const actualEvenNumbers = filter([1, 2, 3, 4, 5], (n) => (n % 2 === 0));
    const expectedEvenNumbers = [2, 4];

    expect(actualEvenNumbers).to.deep.equal(expectedEvenNumbers);
  });

  it('creates and uses map-reducer engine', () => {
    const mapper = (item: number) => (item ** 2);
    const reducer = (square: number, sum: number) => (sum + square);
    const initial = 0;

    const adderOfSquares = createMapReduceEngine(mapper, reducer, initial);
    const actualSumOfSquars = adderOfSquares([1, 2, 3, 4, 5]);
    const expectedSumOfSquars = 55;

    expect(actualSumOfSquars).to.deep.equal(expectedSumOfSquars);
  });

  it('throws TypeError when invalid list is provided', () => {
    expect(() => map(null, noop)).to.throw(TypeError);

    expect(() => reduce(null, noop, null)).to.throw(TypeError);
    
    expect(() => filter(null, noop)).to.throw(TypeError);
  })
});
