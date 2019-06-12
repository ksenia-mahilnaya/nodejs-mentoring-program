import EventEmitter from 'events';
import fs from 'fs';


export class DirWatcher extends EventEmitter {
  constructor() {
    super();
  }

  watch(path, delay) {
    fs.watch(path, (eventType, fileName) => {
      setTimeout(() => {
        this.emit('dirwatcher:changed', eventType, fileName);
      }, delay);
    });
  }
}
