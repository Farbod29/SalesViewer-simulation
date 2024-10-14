import React, { useState } from 'react';
import sessionData from '../sessionData.json'; // Import your JSON data

const SessionTable = () => {
  const [hoveredSession, setHoveredSession] = useState(null);

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-50 text-left">
          <tr className="border-b space-x-2">
            <th className="p-4 font-semibold">Dates</th>
            <th className="p-4 font-semibold">Company</th>
            <th className="p-4 font-semibold">City</th>
            <th className="p-4 font-semibold">Pages</th>
            <th className="p-4 font-semibold">Duration</th>
            <th className="p-4 font-semibold">Main Interest</th>
            <th className="p-4 font-semibold">Score</th>
            <th className="p-4 font-semibold">More</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sessionData[0].result.map((session, index) => (
            <tr
              key={index}
              onMouseEnter={() => setHoveredSession(index)}
              onMouseLeave={() => setHoveredSession(null)}
              className="hover:bg-gray-100 transition-colors"
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
                {new Date(session.lastActivityAt).getMinutes() -
                  new Date(session.startedAt).getMinutes()}{' '}
                min
              </td>

              {/* Main Interest */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {session.mainInterest || 'N/A'}
              </td>

              {/* Score */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {session.score}
              </td>

              {/* More Options (e.g., Icons for Interest) */}
              <td className="p-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
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

      {/* Hover effect to show interests */}
      {hoveredSession !== null && (
        <div className="absolute bg-white shadow-lg p-2 border rounded-lg mt-2">
          <p className="font-bold text-gray-900">Interest Overview</p>
          <ul className="text-gray-600">
            {sessionData[0].result[hoveredSession].interests.map(
              (interest, i) => (
                <li key={i} className="py-1">
                  {interest.name} - Time: {interest.time}s
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SessionTable;
