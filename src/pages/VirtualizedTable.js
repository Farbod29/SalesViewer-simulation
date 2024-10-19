import React, { useState, useEffect } from 'react';
import sessionDataOrginal from '../data/sessionDataOrginal.json';
import { FaEllipsisV, FaYoutube } from 'react-icons/fa';
import ReactDOM from 'react-dom';

const VirtualizedTable = () => {
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const sessionData = sessionDataOrginal[0].result.map((session, index) => {
      const startedAt = new Date(session.startedAt).getTime();
      const lastActivityAt = new Date(session.lastActivityAt).getTime();
      const duration = lastActivityAt - startedAt;

      return {
        id: index + 1,
        date: new Date(session.startedAt).toLocaleString('de-DE'),
        companyName: session.company?.name || 'Unknown',
        city: session.company?.city || 'Unknown',
        branch: session.company?.sector?.name || 'Unknown',
        pages: session.visits?.length || 0, // Ensure `visits` is an array
        duration: isNaN(duration) ? 0 : duration,
        source: session.referer?.referer_url || 'N/A',
        interest: session.mainInterest || 'No interest',
        logo: session.company?.category?.icon || null,
        visits: session.visits || [], // Ensure visits is at least an empty array
      };
    });
    setSortedData(sessionData);
  }, []);

  const handleSort = (column) => {
    let sortedArray = [...sortedData];
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }

    sortedArray.sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sortedArray);
  };

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
                className="p-2 cursor-pointer text-left"
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('companyName')}
                className="p-2 cursor-pointer text-left"
              >
                Company{' '}
                {sortBy === 'companyName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('branch')}
                className="p-2 cursor-pointer text-left mr-12 pl-14"
              >
                Branch{' '}
                {sortBy === 'branch' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('city')}
                className="p-2 pl-12 cursor-pointer text-left"
              >
                City {sortBy === 'city' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('pages')}
                className="pr-8 cursor-pointer text-left"
              >
                Pages {sortBy === 'pages' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('duration')}
                className="p-3 pl-8 cursor-pointer text-left ml-12"
              >
                Duration{' '}
                {sortBy === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('source')}
                className="p-2 cursor-pointer text-left"
              >
                Source{' '}
                {sortBy === 'source' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>

              <th
                onClick={() => handleSort('interest')}
                className="p-2 cursor-pointer text-left"
              >
                Interest{' '}
                {sortBy === 'interest' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <span className="pt-2 text-white"> " "</span>
          <tbody>
            {sortedData.map((session, index) => (
              <React.Fragment key={session.id}>
                <tr>
                  <td colSpan="9" className="h-1">
                    <div className="text-white pt-1">.</div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 my-6 p-4 border rounded-lg">
                  <td className="p-2 text-left">{session.date}</td>
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
                  <td className="p-2 text-left">{session.branch}</td>
                  <td className="p-2 text-left">{session.city}</td>

                  <td
                    className="p-2 text-center relative"
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
                                    (new Date(visit.lastActivityAt).getTime() -
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
                          Total Time: {Math.floor(session.duration / 1000)} sec
                        </p>
                      </div>
                    )}
                  </td>

                  <td className="p-2 pr-12">
                    <div className="flex items-center ml-8 mr-8">
                      <FaYoutube className="mr-2 text-gray-400" />
                      <span>{Math.floor(session.duration / 1000)} sec</span>
                    </div>
                  </td>
                  <td className="p-2 text-blue-600 truncate ml-7 text-left">
                    {session.source}
                  </td>
                  <td className="p-2 text-left">{session.interest}</td>
                  <td className="p-2 text-left relative">
                    <FaEllipsisV
                      className="text-gray-500 cursor-pointer z-50"
                      onClick={() =>
                        setActivePopup(activePopup === index ? null : index)
                      }
                    />
                    {activePopup === index && (
                      <div className="absolute z-50 bg-white shadow-lg p-4 border rounded-lg mt-2 right-0 w-64 ">
                        <div className="font-bold text-gray-900 mb-2">More</div>
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

export default VirtualizedTable;
