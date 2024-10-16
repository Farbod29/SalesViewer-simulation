import React, { useState } from 'react';
import sessionData from '../sessionData.json'; // Import your JSON data

const SessionTable = () => {
  const [hoveredSession, setHoveredSession] = useState(null);

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

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-50 text-left">
          <tr className="border-b space-x-2 border-gray-300">
            <th className="p-4 font-semibold ">Date</th>
            <th className="p-4 font-semibold">Company</th>
            <th className="p-4 font-semibold">City</th>
            <th className="p-4 font-semibold">Pages</th>
            <th className="p-4 font-semibold">Duration</th>
            <th className="p-4 font-semibold">Interest</th>
            <th className="p-4 font-semibold">Source</th>
            <th className="p-4 font-semibold">More</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {sessionData[0].result.map((session, index) => (
            <tr
              key={index}
              onMouseEnter={() => setHoveredSession(index)}
              onMouseLeave={() => setHoveredSession(null)}
              className="hover:bg-gray-200 transition-colors"
            >
              {/* Date */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(session.startedAt).toLocaleString('de-DE')}
              </td>

              {/* Company Name */}
              <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {session.company.name}
              </td>

              {/* City */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {session.company.city}
              </td>

              {/* Pages */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {session.visits.length}
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
                <button className="text-gray-400 hover:text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 9.5A1.5 1.5 0 1 1 3 6.5a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hover effect to show visited pages */}
      {hoveredSession !== null && (
        <div className="absolute bg-white shadow-lg p-4 border rounded-lg mt-2">
          <p className="font-bold text-gray-900 mb-2">Visited Pages</p>
          <ul className="text-gray-600">
            {sessionData[0].result[hoveredSession].visits.map((visit, i) => (
              <li key={i} className="py-1 px-24 ">
                <div className="flex justify-between">
                  <span>{visit.url}</span>
                  <span className="ml-16">
                    {calculateTimeSpent(visit)} seconds
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2 font-bold text-gray-900">
            Total Session Time:{' '}
            {Math.floor(
              calculateTotalTime(sessionData[0].result[hoveredSession].visits) /
                60
            )}{' '}
            min
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionTable;