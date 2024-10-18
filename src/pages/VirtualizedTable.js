// VirtualizedTable.js
import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import sortWithWorker from '../utils/array';

const columns = ['ID', 'Name', 'Age', 'City', 'Duration']; // Example columns

const VirtualizedTable = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]); // State to store sorted data
  const [sortBy, setSortBy] = useState(null); // For sorting
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Function to load the data from the JSON file
  const loadData = async () => {
    try {
      const response = await fetch('/sessionDataOrginal.json'); // Fetch the data
      const jsonData = await response.json();

      // Validate the structure and extract the 'result' array
      if (
        !jsonData[0] ||
        !jsonData[0].result ||
        !Array.isArray(jsonData[0].result)
      ) {
        console.error('Invalid data format:', jsonData);
        return;
      }

      // Map and extract the necessary fields
      const sessionData = jsonData[0].result.map((session, index) => ({
        id: index + 1,
        date: new Date(session.startedAt).toLocaleString('de-DE'),
        companyName: session.company?.name || 'Unknown',
        city: session.company?.city || 'Unknown',
        duration:
          new Date(session.lastActivityAt).getTime() -
          new Date(session.startedAt).getTime(), // Duration in milliseconds
        interest: session.mainInterest || 'No interest',
      }));

      setData(sessionData); // Set the original data
      setSortedData(sessionData); // Initially set sorted data as the same
    } catch (error) {
      console.error('Failed to load the session data:', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Function to handle sorting based on a column
  const handleSort = (column) => {
    let sortedArray = [...sortedData];
    if (sortBy === column) {
      // Toggle sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }

    // Sort by the specified column
    sortedArray.sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sortedArray);
  };

  return (
    <div className="table-container">
      {/* Sorting Buttons */}
      <div className="sort-buttons flex space-x-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white"
          onClick={() => handleSort('date')}
        >
          Sort by Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white"
          onClick={() => handleSort('companyName')}
        >
          Sort by Company{' '}
          {sortBy === 'companyName' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white"
          onClick={() => handleSort('city')}
        >
          Sort by City {sortBy === 'city' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white"
          onClick={() => handleSort('duration')}
        >
          Sort by Duration{' '}
          {sortBy === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {/* Header */}
      <div className="table-header grid grid-cols-5 font-bold">
        {columns.map((col) => (
          <div key={col} className="table-cell p-2 border">
            {col}
          </div>
        ))}
      </div>

      {/* Body */}
      <List
        height={400} // height of the visible area
        itemCount={sortedData.length} // number of items
        itemSize={35} // row height
        width="100%" // width of the container
        itemData={sortedData} // Pass sorted data to the list
      >
        {({ index, style }) => {
          const row = sortedData[index];
          return (
            <div className="table-row grid grid-cols-5" style={style}>
              <div className="table-cell p-2 border">{row.id}</div>
              <div className="table-cell p-2 border">{row.companyName}</div>
              <div className="table-cell p-2 border">{row.city}</div>
              <div className="table-cell p-2 border">{row.date}</div>
              <div className="table-cell p-2 border">
                {Math.floor(row.duration / 1000)} seconds
              </div>
            </div>
          );
        }}
      </List>
    </div>
  );
};

export default VirtualizedTable;