import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';
import plugin from '../src';
import changeLine from 'normalize-newline'

function normalize(str) {
  return changeLine(str.trim()).replace(/\n{2,}/g, '\n');
}

describe('transform constant string variable', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actualPath = path.join(fixtureDir, 'actual.js');
      const actual = transformFileSync(actualPath).code;

      const expected = fs.readFileSync(
          path.join(fixtureDir, 'expected.js')
      ).toString();
      // console.log('--' + normalize(actual) + '--*****--' + normalize(expected) + '--')
      assert.equal(normalize(actual), normalize(expected));
    });
  });
});
