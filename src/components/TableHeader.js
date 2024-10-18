// TableHeader.js
import React from 'react';

const TableHeader = ({ sortBy, sortOrder, onSort }) => {
  const handleHeaderClick = (column) => {
    if (sortBy === column) {
      onSort(column, sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    } else {
      onSort(column, 'asc'); // Default to ascending order
    }
  };

  const handleHeaderClickTime = (column) => {
    if (sortBy === column) {
      onSort(column, sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    } else {
      onSort(column, 'asc'); // Default to ascending order
    }
  };

  return (
    <thead className="bg-gray-50 text-left sticky top-0 z-10">
      <tr className="border-b border-gray-300">
        <th
          className="p-4 pb-6 font-semibold cursor-pointer"
          onClick={() => handleHeaderClick('Date')}
        >
          Date {sortBy === 'Date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          className="p-4 font-semibold cursor-pointer"
          onClick={() => handleHeaderClick('Company')}
        >
          Company
        </th>
        <th
          className="p-4 font-semibold cursor-pointer"
          onClick={() => handleHeaderClick('City')}
        >
          City
        </th>
        <th
          className="p-4 font-semibold cursor-pointer"
          onClick={() => handleHeaderClick('Pages')}
        >
          Pages
        </th>
        <th
          className="p-4 font-semibold cursor-pointer"
          onClick={() => handleHeaderClickTime('Duration')}
        >
          Duration {sortBy === 'Duration' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          className="p-4 font-semibold cursor-pointer"
          onClick={() => handleHeaderClick('Interest')}
        >
          Interest
        </th>
        <th
          className="p-4 font-semibold cursor-pointer"
          onClick={() => handleHeaderClick('Source')}
        >
          Source
        </th>
        <th
          className="p-4 font-semibold cursor-pointer"
          onClick={() => handleHeaderClick('More')}
        >
          More
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
