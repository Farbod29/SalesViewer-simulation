// array.js
// Change to properly initialize the worker using URL.createObjectURL

function sortWithWorker(array, sortBy) {
  return new Promise((resolve, reject) => {
    const blob = new Blob(
      [
        `
        onmessage = function (e) {
          const { array, sortBy } = e.data;
  
          const sortedArray = array.sort((a, b) => {
            if (sortBy === 'age') {
              return a.age - b.age;
            } else if (sortBy === 'name') {
              return a.name.localeCompare(b.name);
            } else if (sortBy === 'city') {
              return a.city.localeCompare(b.city);
            }
            return 0; // Default no sorting
          });
  
          postMessage(sortedArray);
        }
      `,
      ],
      { type: 'application/javascript' }
    );

    const worker = new Worker(URL.createObjectURL(blob));

    worker.postMessage({ array, sortBy });

    worker.onmessage = function (e) {
      resolve(e.data);
    };

    worker.onerror = function (error) {
      reject(error);
    };
  });
}

export default sortWithWorker;
