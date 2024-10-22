import React from 'react';

// Define the possible sort columns
type SortableColumn =
  | 'date'
  | 'companyName'
  | 'branch'
  | 'city'
  | 'pages'
  | 'duration'
  | 'source'
  | 'interest';

// Define the sort order type
type SortOrder = 'asc' | 'desc';

// Define the props interface
interface TableHeaderProps {
  sortBy: SortableColumn;
  sortOrder: SortOrder;
  handleSort: (column: SortableColumn) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  sortBy,
  sortOrder,
  handleSort,
}) => {
  return (
    <thead className="bg-gray-50 text-left z-50 shadow-md">
      <tr>
        <th
          onClick={() => handleSort('date')}
          className="p-2 cursor-pointer text-left date-column w-28"
        >
          Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('companyName')}
          className="p-2 cursor-pointer text-left company-column w-40 truncate"
        >
          Company{' '}
          {sortBy === 'companyName' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('branch')}
          className="p-2 cursor-pointer text-left branch-column w-40"
        >
          Branch {sortBy === 'branch' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('city')}
          className="p-2 cursor-pointer text-left city-column w-40"
        >
          City {sortBy === 'city' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('pages')}
          className="p-2 cursor-pointer text-left pages-column w-8"
        >
          Pages {sortBy === 'pages' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('duration')}
          className="p-2 cursor-pointer text-left duration-column w-20"
        >
          Duration {sortBy === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('source')}
          className="p-2 cursor-pointer text-left source-column w-44 truncate"
        >
          Source {sortBy === 'source' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th
          onClick={() => handleSort('interest')}
          className="p-2 cursor-pointer text-left interest-column w-40"
        >
          Interest {sortBy === 'interest' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th className="cursor-pointer more-column pr-1 text-left w-14">More</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
