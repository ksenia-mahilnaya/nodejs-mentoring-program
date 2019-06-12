import { DirWatcher } from './dirwatcher/dirWatcher';
import { Importer } from './importer/Importer';

const importer = new Importer();
const dirWatcher = new DirWatcher();

dirWatcher.watch('./data', 2000);

dirWatcher.on('dirwatcher:changed', () => {
  importer.import('./data').then((data) => {
    console.log(data);
  });
  // importer.importSync('./data');
});
