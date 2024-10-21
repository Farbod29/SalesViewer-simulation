import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/mediaQueries.css';
import sessionDataOrginal from '../data/sessionDataOrginal.json';
import { FaEllipsisV, FaYoutube } from 'react-icons/fa';

const SessionTable = () => {
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const popupRef = useRef(null); // Define popupRef

  useEffect(() => {
    // Sort the data
    const sortedData = sessionDataOrginal[0].result
      .map((session, index) => {
        const startedAt = new Date(session.startedAt).getTime();
        const lastActivityAt = new Date(session.lastActivityAt).getTime();
        const duration = lastActivityAt - startedAt;

        return {
          id: index + 1,
          date: new Date(session.startedAt).toLocaleString('de-DE'),
          companyName: session.company?.name || 'Unknown',
          city: session.company?.city || 'Unknown',
          branch: session.company?.sector?.name || 'Unknown',
          pages: session.visits?.length || 0,
          duration: isNaN(duration) ? 0 : duration,
          source: session.referer?.referer_url || 'N/A',
          interest: session.mainInterest || 'No interest',
          logo: session.company?.category?.icon || null,
          visits: session.visits || [],
        };
      })
      .sort((a, b) => {
        if (sortBy) {
          const aValue = a[sortBy];
          const bValue = b[sortBy];

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          } else {
            return sortOrder === 'asc'
              ? aValue > bValue
                ? 1
                : -1
              : bValue > aValue
              ? 1
              : -1;
          }
        }
        return 0;
      });

    setSortedData(sortedData); // Update sorted data state
  }, [sortBy, sortOrder]);

  const handleSort = useCallback(
    (column) => {
      if (sortBy === column) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    },
    [sortBy]
  );

  useEffect(() => {
    // Function to close popup when clicked outside
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopup(null); // Close the popup
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  return (
    <div className="container mx-auto p-8 text-left mb-10 ">
      {/* Filters */}
      <table className="min-w-full table-auto text-left text-xs mb-10"></table>

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto -collapse-gray-200 text-xs text-left">
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
                Branch{' '}
                {sortBy === 'branch' && (sortOrder === 'asc' ? '↑' : '↓')}
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
                Duration{' '}
                {sortBy === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('source')}
                className="p-2 cursor-pointer text-left source-column"
              >
                Source{' '}
                {sortBy === 'source' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('interest')}
                className="p-2 cursor-pointer text-left interest-column"
              >
                Interest{' '}
                {sortBy === 'interest' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-2 cursor-pointer text-left more-column">More</th>
            </tr>
          </thead>
          <span className="pt-2 text-white"> " "</span>
          <tbody>
            {sortBy === 'date'
              ? // If sorting by date, group the sessions by date
                Object.entries(
                  sortedData.reduce((acc, session) => {
                    const date = session.date;
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(session);
                    return acc;
                  }, {})
                ).map(([date, sessions]) => (
                  <React.Fragment key={date}>
                    {/* Render the group header with the date */}
                    <tr className="bg-gray-50">
                      <td colSpan="9" className="p-2 font-bold">
                        {date}
                      </td>
                    </tr>

                    {/* Render each session under this date */}
                    {sessions.map((session) => (
                      <tr
                        key={session.id}
                        className="hover:bg-gray-100 my-6 p-4 border rounded-lg"
                      >
                        {/* Date column */}
                        <td className="p-2 text-left date-column">
                          {session.date}
                        </td>
                        {/* Company column */}
                        <td className="p-2 text-left">{session.companyName}</td>
                        {/* Branch column */}
                        <td className="p-2 text-left hidden xl:table-cell branch-column">
                          {session.branch}
                        </td>
                        {/* City column */}
                        <td className="p-2 text-left hidden lg:table-cell city-column">
                          {session.city}
                        </td>
                        {/* Pages column */}
                        <td className="p-2 text-left hidden md:table-cell pages-column">
                          {session.pages}
                        </td>
                        {/* Duration column */}
                        <td className="p-2 text-left duration-column">
                          {session.duration}
                        </td>
                        {/* Source column */}
                        <td className="p-2 text-left hidden lg:table-cell source-column">
                          {session.source}
                        </td>
                        {/* Interest column */}
                        <td className="p-2 text-left hidden md:table-cell interest-column">
                          {session.interest}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              : // Otherwise, show sessions without grouping
                sortedData.map((session, index) => (
                  <React.Fragment key={session.id}>
                    <tr>
                      <td colSpan="9" className="h-1">
                        <div className="text-white pt-1">.</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 my-6 p-4 border rounded-lg">
                      <td className="p-2 text-left date-column">
                        {session.date}
                      </td>
                      <td className="p-2 text-left">
                        <div className="flex items-center space-x-2">
                          {session.logo ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: session.logo.replace(
                                  '<svg',
                                  '<svg class="w-3 h-3"'
                                ),
                              }}
                            />
                          ) : (
                            <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                          )}
                          <span>{session.companyName}</span>
                        </div>
                      </td>
                      <td className="p-2 text-left hidden xl:table-cell branch-column">
                        {session.branch}
                      </td>

                      <td className="p-2 text-left hidden lg:table-cell city-column">
                        {session.city}
                      </td>

                      <td
                        className="p-2 text-center relative hidden md:table-cell pages-column"
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <span
                          className={`p-1 rounded ${
                            hoveredRow === index ? 'bg-gray-100' : ''
                          }`}
                        >
                          {session.pages}
                        </span>
                        {hoveredRow === index && (
                          <div className="absolute z-20 bg-white shadow-lg p-4 border rounded-lg mt-2 left-0 text-left min-w-96">
                            <p className="font-bold text-gray-900 mb-2 text-left">
                              Visited Pages
                            </p>
                            <ul className="text-gray-600">
                              {session.visits?.map((visit, i) => (
                                <li key={i} className="py-1">
                                  <div className="flex justify-between text-left">
                                    <a
                                      href={visit.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      {visit.url}
                                    </a>
                                    <span className="ml-4">
                                      {Math.floor(
                                        (new Date(
                                          visit.lastActivityAt
                                        ).getTime() -
                                          new Date(visit.startedAt).getTime()) /
                                          1000
                                      )}{' '}
                                      sec
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <p className="font-bold mt-2">
                              Total Time: {Math.floor(session.duration / 1000)}{' '}
                              sec
                            </p>
                          </div>
                        )}
                      </td>

                      <td className="p-2 pr-12 duration-column">
                        <div className="flex items-center ml-8 mr-8">
                          <FaYoutube className="mr-2 text-gray-400" />
                          <span>{Math.floor(session.duration / 1000)} sec</span>
                        </div>
                      </td>
                      <td className="p-2 text-blue-600 truncate ml-7 text-left hidden lg:table-cell source-column">
                        {session.source}
                      </td>
                      <td className="p-2 text-left hidden md:table-cell interest-column">
                        {session.interest}
                      </td>
                      <td className="p-2 text-left relative">
                        <FaEllipsisV
                          className="text-gray-500 cursor-pointer z-50"
                          onClick={() =>
                            setActivePopup(activePopup === index ? null : index)
                          }
                        />
                        {activePopup === index && (
                          <div
                            className="absolute z-50 bg-white shadow-lg p-4 border rounded-lg mt-2 right-0 w-64"
                            ref={popupRef}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-bold text-gray-900">
                                More
                              </div>
                              <button
                                className="text-gray-500"
                                onClick={() => setActivePopup(null)}
                              >
                                ✕
                              </button>{' '}
                              {/* Close Button */}
                            </div>
                            <ul className="text-gray-700">
                              <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
                                <span className="material-icons text-gray-400">
                                  badge
                                </span>
                                <span>SalesViewer® IDcard</span>
                              </li>
                              <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
                                <span className="material-icons text-gray-400">
                                  person_add
                                </span>
                                <span>Assign employee</span>
                              </li>
                              <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
                                <span className="material-icons text-gray-400">
                                  visibility_off
                                </span>
                                <span>Hide company</span>
                              </li>
                              <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
                                <span className="material-icons text-gray-400">
                                  edit
                                </span>
                                <span>Unternehmen bearbeiten</span>
                              </li>
                              <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
                                <span className="material-icons text-gray-400">
                                  delete
                                </span>
                                <span>Session löschen</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionTable;
