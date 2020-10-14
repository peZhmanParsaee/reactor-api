const expect = require('chai').expect;
const parser = require('../../../../src/common/helpers/parser');

describe('parser.convertToInt', () => {
  it('should return 1 if "1" is passed', () => {
    const result = parser.convertToInt('1');
    expect(result).to.equal(1);
  });
});
