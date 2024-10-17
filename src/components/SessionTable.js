import React, { useState, useRef } from 'react';
import sessionData from '../sessionData.json'; // Import your JSON data
import ButtonClassic from './iconComponents/buttonClassic';

const SessionTable = () => {
  const [hoveredPages, setHoveredPages] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const tableRef = useRef(null);
  const theadRef = useRef(null);

  const calculateTimeSpent = (visit) => {
    const startTime = new Date(visit.startedAt).getTime();
    const endTime = new Date(visit.lastActivityAt).getTime();
    return Math.round((endTime - startTime) / 1000); // Time in seconds
  };

  const calculateTotalTime = (visits) => {
    return visits.reduce(
      (total, visit) => total + calculateTimeSpent(visit),
      0
    );
  };

  const handleHeaderClick = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    } else {
      setSortBy(column);
      setSortOrder('asc'); // Default to ascending order
    }
  };

  const handleHeaderClickTime = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    } else {
      setSortBy(column);
      setSortOrder('asc'); // Default to ascending order
    }
  };

  const sortData = (data) => {
    if (sortBy === 'Date') {
      return data.sort((a, b) => {
        const dateA = new Date(a.startedAt).getTime();
        const dateB = new Date(b.startedAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === 'Duration') {
      return data.sort((a, b) => {
        const durationA = calculateTotalTime(a.visits);
        const durationB = calculateTotalTime(b.visits);
        return sortOrder === 'asc'
          ? durationA - durationB
          : durationB - durationA;
      });
    } else {
      return data; // Default: return unsorted data
    }
  };

  const sortedData = sortData([...sessionData[0].result]); // Sort the data based on current state

  return (
    <div className="shadow-sm rounded-lg relative w-full" ref={tableRef}>
      {/* Sticky header */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead
          className="bg-gray-50 text-left sticky top-0 z-10"
          ref={theadRef}
        >
          <tr className="border-b border-gray-300">
            <th
              className="p-4 pb-6 font-semibold cursor-pointer"
              onClick={() => handleHeaderClickTime('Date')}
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
              Duration{' '}
              {sortBy === 'Duration' && (sortOrder === 'asc' ? '↑' : '↓')}
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
        <tbody className="bg-white divide-y divide-gray-300">
          {sortedData.map((session, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors relative"
            >
              {/* Date */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(session.startedAt).toLocaleString('de-DE')}
              </td>

              {/* Company Name */}
              <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center">
                  {session.company.category && session.company.category.icon ? (
                    <span
                      className="mr-2 inline-block"
                      dangerouslySetInnerHTML={{
                        __html: session.company.category.icon.replace(
                          '<svg',
                          '<svg style="max-width: 15px; height: auto;"'
                        ),
                      }}
                    />
                  ) : (
                    <span className="mr-2" style={{ fontSize: '10px' }}>
                      🏢
                    </span>
                  )}
                  {session.company.name || 'Unknown Company'}
                </div>
              </td>

              {/* City */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {session.company.city}
              </td>

              {/* Pages */}
              <td
                className="p-4 whitespace-nowrap text-sm text-gray-700 relative"
                onMouseEnter={() => setHoveredPages(index)}
                onMouseLeave={() => setHoveredPages(null)}
              >
                <span
                  className={`p-1 rounded ${
                    hoveredPages === index ? 'bg-gray-100' : ''
                  }`}
                >
                  {session.visits.length}
                </span>
                {/* Hover pop-up showing the visited pages */}
                {hoveredPages === index && (
                  <div className="absolute z-20 bg-white shadow-lg p-4 border rounded-lg mt-2 left-0">
                    <p className="font-bold text-gray-900 mb-2">
                      Visited Pages
                    </p>
                    <ul className="text-gray-600">
                      {session.visits.map((visit, i) => (
                        <li key={i} className="py-1">
                          <div className="flex justify-between">
                            <a
                              href={visit.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {visit.url}
                            </a>
                            <span className="ml-4">
                              {calculateTimeSpent(visit)} seconds
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="font-bold mt-2">
                      Total Time:{' '}
                      {Math.floor(calculateTotalTime(session.visits) / 60)} min
                    </p>
                  </div>
                )}
              </td>

              {/* Duration */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {calculateTotalTime(session.visits)} seconds
              </td>

              {/* Main Interest */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {session.mainInterest !== 'none'
                  ? session.mainInterest
                  : 'No main interest'}
              </td>

              {/* Source */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {session.referer.referer_medium || 'N/A'}
              </td>

              {/* More Options (e.g., Icons for Interest) */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-2">
                <ButtonClassic />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionTable;
