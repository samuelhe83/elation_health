import { expect } from 'chai';
import * as fs from 'fs';
import Storage from '../Storage';

describe('Storage functionality', () => {
  const storage = new Storage();

  storage.updateStorage('./initial_lab_results.json');

  const expectations = JSON.parse(fs.readFileSync('./sample_expectations_rd1.json', 'utf-8'));
  const lastThree = [storage.findLastThree(126), storage.findLastThree(10540), storage.findLastThree(1245)];

  it('should read last three results for initial lab results', () => {
    expect(lastThree).to.deep.equal(expectations);
  });

  storage.updateStorage('./new_lab_results.json');
  const updatedLastThree = [storage.findLastThree(1245), storage.findLastThree(119)];

  const updatedExpectations = JSON.parse(fs.readFileSync('./sample_expectations_rd2.json', 'utf-8'));

  it('should read last three results for updated lab results', () => {
    expect(updatedLastThree).to.deep.equal(updatedExpectations);
  });
});

