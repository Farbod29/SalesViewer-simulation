import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import sessionDataOrginal from '../data/sessionDataOrginal.json';
import { FaYoutube, FaEllipsisV } from 'react-icons/fa'; // Add icons

// Define columns in the order required
const columns = [
  'Date',
  'Company',
  'Branch',
  'City',
  'Pages',
  'Duration',
  'Source',
  'Interest',
  'More',
];

const VirtualizedTable = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]); // State to store sorted data
  const [sortBy, setSortBy] = useState(null); // For sorting criteria
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc' sorting order

  // Load and process the data on component mount
  useEffect(() => {
    const sessionData = sessionDataOrginal[0].result.map((session, index) => {
      const startedAt = new Date(session.startedAt).getTime();
      const lastActivityAt = new Date(session.lastActivityAt).getTime();
      const duration = lastActivityAt - startedAt; // Duration in milliseconds

      return {
        id: index + 1,
        date: new Date(session.startedAt).toLocaleString('de-DE'),
        companyName: session.company?.name || 'Unknown',
        companyLogo: session.company?.category?.icon || null, // Company logo
        branch: session.company?.sector?.name || 'N/A',
        city: session.company?.city || 'Unknown',
        pages: session.visits.length || 0,
        duration: isNaN(duration) ? 0 : duration, // Prevent NaN values
        hasVideo: session.hasVideo === '1', // Determine if session has a video
        source: session.referer?.referer_url || 'Direct',
        interest: session.mainInterest || 'No interest',
      };
    });

    setData(sessionData);
    setSortedData(sessionData);
  }, []);

  // Sorting function
  const handleSort = (column) => {
    let sortedArray = [...sortedData];
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    } else {
      setSortBy(column);
      setSortOrder('asc'); // Default to ascending order
    }

    // Sorting logic
    sortedArray.sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sortedArray);
  };

  return (
    <div className="table-container shadow-sm rounded-lg p-4 bg-white">
      {/* Sorting Buttons */}
      <div className="sort-buttons flex space-x-4 mb-4">
        {columns.map((col) => (
          <button
            key={col}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white transition"
            onClick={() => handleSort(col.toLowerCase())}
          >
            Sort by {col}{' '}
            {sortBy === col.toLowerCase() && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="table-header grid grid-cols-9 font-bold bg-gray-50 sticky top-0 z-10">
        {columns.map((col) => (
          <div key={col} className="table-cell p-2 border text-center">
            {col}
          </div>
        ))}
      </div>

      {/* Body */}
      <List
        height={400} // Height of the visible area
        itemCount={sortedData.length} // Number of rows
        itemSize={50} // Row height
        width="100%" // Full width
        itemData={sortedData} // Pass sorted data to the list
      >
        {({ index, style }) => {
          const row = sortedData[index];
          return (
            <div
              className="table-row grid grid-cols-9 items-center hover:bg-gray-100 transition-colors"
              style={style}
            >
              {/* Date */}
              <div className="table-cell p-2 border text-center">
                {row.date}
              </div>

              {/* Company with Logo */}
              <div className="table-cell p-2 border flex items-center space-x-2">
                {row.companyLogo ? (
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: row.companyLogo }}
                    style={{ maxWidth: '20px' }}
                  />
                ) : (
                  <span className="inline-block bg-gray-300 w-6 h-6 rounded-full" />
                )}
                <span>{row.companyName}</span>
              </div>

              {/* Branch */}
              <div className="table-cell p-2 border text-center">
                {row.branch}
              </div>

              {/* City */}
              <div className="table-cell p-2 border text-center">
                {row.city}
              </div>

              {/* Pages */}
              <div className="table-cell p-2 border text-center">
                {row.pages}
              </div>

              {/* Duration with YouTube icon if has video */}
              <div className="table-cell p-2 border text-center flex items-center justify-center space-x-2">
                {row.hasVideo && <FaYoutube className="text-red-600" />}
                <span>{Math.floor(row.duration / 1000)} sec</span>
              </div>

              {/* Source */}
              <div className="table-cell p-2 border text-center">
                {row.source}
              </div>

              {/* Interest */}
              <div className="table-cell p-2 border text-center">
                {row.interest}
              </div>

              {/* More (three dots icon) */}
              <div className="table-cell p-2 border text-center">
                <FaEllipsisV className="cursor-pointer" />
              </div>
            </div>
          );
        }}
      </List>
    </div>
  );
};

export default VirtualizedTable;