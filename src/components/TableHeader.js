import React from 'react';

const TableHeader = ({ sortBy, sortOrder, handleSort }) => {
  return (
    <thead className="bg-gray-50 text-left">
      <tr>
        <th
          onClick={() => handleSort('date')}
          className="p-2 cursor-pointer text-left date-column"
        >
          Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('companyName')}
          className="p-2 cursor-pointer text-left company-column"
        >
          Company{' '}
          {sortBy === 'companyName' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('branch')}
          className="p-2 cursor-pointer text-left branch-column"
        >
          Branch {sortBy === 'branch' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('city')}
          className="p-2 cursor-pointer text-left city-column"
        >
          City {sortBy === 'city' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('pages')}
          className="p-2 cursor-pointer text-left pages-column"
        >
          Pages {sortBy === 'pages' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('duration')}
          className="p-2 cursor-pointer text-left duration-column"
        >
          Duration {sortBy === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('source')}
          className="p-2 cursor-pointer text-left source-column"
        >
          Source {sortBy === 'source' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('interest')}
          className="p-2 cursor-pointer text-left interest-column"
        >
          Interest {sortBy === 'interest' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th className="p-2 cursor-pointer text-left more-column">More</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
