import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import sessionDataOrginal from '../data/sessionDataOrginal.json';

const columns = ['ID', 'Name', 'Age', 'City', 'Duration']; // Example columns

const VirtualizedTable = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]); // State to store sorted data
  const [sortBy, setSortBy] = useState(null); // For sorting
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Function to load the data from the JSON file
  useEffect(() => {
    const sessionData = sessionDataOrginal[0].result.map((session, index) => {
      const startedAt = new Date(session.startedAt).getTime();
      const lastActivityAt = new Date(session.lastActivityAt).getTime();
      const duration = lastActivityAt - startedAt; // Duration in milliseconds

      return {
        id: index + 1,
        date: new Date(session.startedAt).toLocaleString('de-DE'),
        companyName: session.company?.name || 'Unknown',
        city: session.company?.city || 'Unknown',
        duration: isNaN(duration) ? 0 : duration, // Prevent NaN values
        interest: session.mainInterest || 'No interest',
      };
    });

    setData(sessionData);
    setSortedData(sessionData);
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
