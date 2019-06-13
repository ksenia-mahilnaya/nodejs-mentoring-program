import fs from 'fs';
import csv from 'csvtojson';

export class Importer {
  constructor() {
  }

  import(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, fileNames) => {
        if (err) {
          reject(err);
        } else {
          fileNames.forEach((fileName) => {
            csv()
              .fromFile(`${path}/${fileName}`)
              .then((jsonObj) => {
                resolve([fileName, jsonObj]);
              }).catch((err) => {
              throw err;
            });
          });
        }
      });
    });
  }

  importSync(path) {
    return fs.readdirSync(path).forEach((file) => {
      csv()
        .fromFile(`${path}/${file}`)
        .then((jsonObj)=>{
          console.log([file, jsonObj]);
        });
    });
  }
}
