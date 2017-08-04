const fs = require('fs');

class Storage {
  constructor() {
    this.patientStorage = {};
    this.testStorage = {};
  }

  updateStorage(filePath) {
    const parsedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const alteredPatients = {};

    parsedData.forEach((test, index) => {
      let { patient_id, name, date } = test;
      if (!this.patientStorage[patient_id]) {
        this.patientStorage[patient_id] = {};
      }
      if (!this.patientStorage[patient_id][name]) {
        this.patientStorage[patient_id][name] = [];
      }

      this.patientStorage[patient_id][name].push(test);

      this.testStorage[test.result_id] = test;
      if (!alteredPatients[patient_id]) {
        alteredPatients[patient_id] = {};
      }
      if (!alteredPatients[patient_id][name]) {
        alteredPatients[patient_id][name] = true;
      }
    });

    for (let patient in alteredPatients) {
      for (let test in alteredPatients[patient]) {
        this.patientStorage[patient][test].sort((a, b) => {
          if (new Date(a.date) > new Date(b.date)) {
            return -1;
          } else {
            return 1;
          }
        });
      }
    }
  }

  findLastThree(resultId) {
    const patientId = this.testStorage[resultId].patient_id;
    const testName = this.testStorage[resultId].name;

    const testArr = this.patientStorage[patientId][testName];
    const result = {
      last_three_values: [],
      result_id: resultId
    };

    for (let i = 0; i < testArr.length; i++) {
      if (testArr[i].result_id === resultId) {
        if (testArr[i + 1]) {
          result.last_three_values.push(testArr[i + 1]);
        }
        if (testArr[i + 2]) {
          result.last_three_values.push(testArr[i + 2]);
        }
        if (testArr[i + 3]) {
          result.last_three_values.push(testArr[i + 3]);
        }
      }
    }

    return result;
  }
}

export default Storage;
// const storage = new Storage();

// storage.updateStorage('./initial_lab_results.json');
// console.log(storage.findLastThree(10540));
// storage.updateStorage('./new_lab_results.json');

// console.log(storage.findLastThree(1245));
