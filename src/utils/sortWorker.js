// sortWorker.js
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
    // Add more sort logic if needed for other fields
    return 0; // No sorting if not matched
  });

  postMessage(sortedArray); // Send the sorted array back to the main thread
};
