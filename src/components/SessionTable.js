import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import sessionData from '../sessionData.json'; // Import your JSON data
import ButtonClassic from './iconComponents/buttonClassic';

const groupByDate = (sessions) => {
  return sessions.reduce((acc, session) => {
    const date = format(new Date(session.startedAt), 'yyyy-MM-dd'); // Format date as yyyy-MM-dd
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {});
};

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

  const handleHeaderClickTime = () => {
    if (sortBy === 'Date') {
      // Cycle through sorting modes: ascending -> descending -> reset to default
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortBy(null); // Reset to no sorting
        setSortOrder('asc');
      } else {
        setSortOrder('asc'); // Default to ascending order
      }
    } else {
      setSortBy('Date');
      setSortOrder('asc'); // Default to ascending order
    }
  };

  const handleHeaderClickCompanyName = () => {
    if (sortBy === 'Company' && sortOrder === 'desc') {
      // Reset to no sorting after third click
      setSortBy(null);
      setSortOrder('asc');
    } else if (sortBy === 'Company') {
      // Toggle between ascending and descending
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // First click: set to ascending sort
      setSortBy('Company');
      setSortOrder('asc');
    }
  };

  const handleHeaderCityName = () => {
    if (sortBy === 'city' && sortOrder === 'desc') {
      setSortBy(null); // Reset sorting
      setSortOrder('asc');
    } else if (sortBy === 'city') {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle between asc and desc
    } else {
      setSortBy('city'); // Set sort by city
      setSortOrder('asc');
    }
  };

  const groupByCompany = (sessions) => {
    return sessions.reduce((acc, session) => {
      const companyName = session.company.name || 'Unknown Company';
      if (!acc[companyName]) {
        acc[companyName] = [];
      }
      acc[companyName].push(session);
      return acc;
    }, {});
  };

  const sortData = (data) => {
    if (sortBy === 'Date' || !sortBy) {
      // Default to date sorting
      return data.sort((a, b) => {
        const dateA = new Date(a.startedAt).getTime();
        const dateB = new Date(b.startedAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === 'Company') {
      const sorted = data.sort((a, b) => {
        const nameA = a.company.name.toLowerCase();
        const nameB = b.company.name.toLowerCase();
        return sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA); // Toggle between ascending and descending
      });

      const grouped = groupByCompany(sorted);
      return Object.values(grouped).flat(); // Return grouped data only when sorting by company
    } else if (sortBy === 'Pages') {
      return data.sort((a, b) => {
        const pagesA = a.visits.length;
        const pagesB = b.visits.length;
        return sortOrder === 'desc' ? pagesA - pagesB : pagesB - pagesA;
      });
    } else if (sortBy === 'Duration') {
      return data.sort((a, b) => {
        const durationA = calculateTotalTime(a.visits);
        const durationB = calculateTotalTime(b.visits);
        return sortOrder === 'asc'
          ? durationA - durationB
          : durationB - durationA;
      });
    } else if (sortBy === 'Interest') {
      return data.sort((a, b) => {
        const interestA = a.mainInterest.toLowerCase();
        const interestB = b.mainInterest.toLowerCase();
        return sortOrder === 'asc'
          ? interestA.localeCompare(interestB)
          : interestB.localeCompare(interestA);
      });
    } else if (sortBy === 'city') {
      return data.sort((a, b) => {
        const cityA =
          a.company && a.company.city ? a.company.city.toLowerCase() : '';
        const cityB =
          b.company && b.company.city ? b.company.city.toLowerCase() : '';
        return sortOrder === 'asc'
          ? cityA.localeCompare(cityB)
          : cityB.localeCompare(cityA);
      });
    } else {
      return data;
    }
  };

  // Reset logic when clicking on Company three times

  const sortedData = sortData([...sessionData[0].result]); // Sort the data based on current state
  const groupedSessions = groupByCompany(sortedData);
  const groupedByDateSessions = groupByDate(sortedData);
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
              onClick={() => handleHeaderClickCompanyName('Company')}
            >
              Company{' '}
              {sortBy === 'Company' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="p-4 font-semibold cursor-pointer"
              onClick={() => handleHeaderCityName()}
            >
              City {sortBy === 'city' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="p-4 font-semibold cursor-pointer"
              onClick={() => handleHeaderClick('Pages')}
            >
              Pages {sortBy === 'Pages' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="p-4 font-semibold cursor-pointer"
              onClick={() => handleHeaderClick('Duration')}
            >
              Duration{' '}
              {sortBy === 'Duration' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="p-4 font-semibold cursor-pointer"
              onClick={() => handleHeaderClick('Interest')}
            >
              Interest
              {sortBy === 'Interest' && (sortOrder === 'asc' ? '↑' : '↓')}
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
          {sortBy === 'Date'
            ? Object.entries(groupByDate(sortedData)).map(
                ([date, sessions]) => (
                  <React.Fragment key={date}>
                    {/* Display date header */}
                    <tr className="bg-gray-200">
                      <td colSpan={8} className="p-4 font-bold text-gray-700">
                        {date}
                      </td>
                    </tr>
                    {/* Display sessions under each date */}
                    {sessions.map((session, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 transition-colors relative"
                      >
                        <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(session.startedAt).toLocaleString('de-DE')}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {session.company.name || 'Unknown Company'}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                          {session.company.city}
                        </td>
                        {/* other columns */}
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )
            : sortBy === 'Company'
            ? Object.entries(groupedSessions).map(
                ([companyName, sessions], index) => (
                  <React.Fragment key={companyName}>
                    {/* Display a title row for the company */}
                    <tr className="bg-gray-200">
                      <td colSpan={8} className="p-4 font-bold text-gray-700">
                        {companyName} {/* Group title */}
                      </td>
                    </tr>
                    {sessions.map((session, sessionIndex) => (
                      <tr
                        key={sessionIndex}
                        className="hover:bg-gray-100 transition-colors relative"
                      >
                        {/* Date */}
                        <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(session.startedAt).toLocaleString('de-DE')}
                        </td>

                        {/* Company Name with logo */}
                        <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            {session.company.category &&
                            session.company.category.icon ? (
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
                              <span
                                className="mr-2"
                                style={{ fontSize: '10px' }}
                              >
                                🏢
                              </span>
                            )}
                            {session.company.name || 'Unknown Company'}
                          </div>
                        </td>

                        {/* city */}
                        <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                          {session.company.city}
                        </td>

                        {/* Pages with hover effect */}
                        <td
                          className="p-4 whitespace-nowrap text-sm text-gray-700 relative"
                          onMouseEnter={() => setHoveredPages(sessionIndex)}
                          onMouseLeave={() => setHoveredPages(null)}
                        >
                          <span
                            className={`p-1 rounded ${
                              hoveredPages === sessionIndex ? 'bg-gray-100' : ''
                            }`}
                          >
                            {session.visits.length}
                          </span>
                          {hoveredPages === sessionIndex && (
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
                                {Math.floor(
                                  calculateTotalTime(session.visits) / 60
                                )}{' '}
                                min
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

                        {/* More Options */}
                        <td className="p-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-2">
                          <ButtonClassic />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )
            : sortedData.map((session, index) => (
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
                      {session.company.category &&
                      session.company.category.icon ? (
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

                  {/* city */}
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                    {session.company.city}
                  </td>

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
                          {Math.floor(calculateTotalTime(session.visits) / 60)}{' '}
                          min
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
