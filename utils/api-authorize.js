import { writeFile, readFile } from 'fs/promises';
import { Buffer } from 'buffer'

class Authorize {

   async getCurrentToken() {

   }

   async updateToken() {
      try {
         const controller = new AbortController();
         const { signal } = controller;
         const promise = readFile('./.env', { signal });

         // Abort the request before the promise settles.
         controller.abort();

      await promise;
      } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
      }
   }
}

export { Authorize }