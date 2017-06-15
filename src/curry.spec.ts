import 'mocha';
import { expect } from 'chai';
import curry from './curry';

describe('Implementation of currying function', () => {
  it('Currying of the function with multiple arguments', () => {
    function polyadic(arg1, arg2, arg3, arg4) {
      return arg1 + arg2 + arg3 + arg4;
    }

    expect(curry(polyadic)(1)(2)(3)(4)).to.equal(10);
    expect(curry(polyadic)(2)(3)(4)(5)).to.equal(14);
  });

  it('Currying of the function with a single argument', () => {
    function monadic(arg1) {
      return arg1;
    }

    expect(curry(monadic)(1)).to.equal(1);
    expect(curry(monadic)(2)).to.equal(2);
  });

  it('Currying of the function with no arguments', () => {
    function niladic() {
      return 0;
    }

    expect(curry(niladic)()).to.equal(0);
  });
});
