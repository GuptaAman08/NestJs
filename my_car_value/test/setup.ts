import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'db.test'));
  } catch (error) {
    console.log('file already exits');
  }
});
