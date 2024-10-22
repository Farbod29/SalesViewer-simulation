import React from 'react';
import { FaEllipsisV, FaYoutube } from 'react-icons/fa';
import PopupMenu from './PopupMenu';

const TableRow = ({
  session,
  index,
  hoveredRow,
  setHoveredRow,
  setActivePopup,
  activePopup,
  popupRef,
}) => {
  return (
    <tr className="hover:bg-gray-200 border rounded-lg">
      <td className="p-0 text-left date-column w-28 pl-2">
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          {session.date}
        </div>
      </td>

      {/* Company with a fixed width and truncate for long names */}
      <td className="p-0 text-left w-40 truncate relative ">
        <div className="flex items-center space-x-2 relative">
          {session.logo ? (
            <span
              dangerouslySetInnerHTML={{
                __html: session.logo.replace('<svg', '<svg class="w-3 h-3"'),
              }}
            />
          ) : (
            <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
          )}
          {/* Truncate long company names and show full name on hover */}
          <div className="relative group">
            <span className="truncate max-w-xs inline-block z-60 pt-3">
              {session.companyName.length > 15
                ? session.companyName.substring(0, 15) + '...'
                : session.companyName}
            </span>
            {/* Tooltip for full company name */}
            {session.companyName.length > 15 && (
              <div className="absolute left-0 top-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded p-1 w-max">
                {session.companyName}
              </div>
            )}
          </div>
        </div>
      </td>

      {/* Branch with a fixed width and truncate for long names */}
      <td className="p-2 text-left hidden xl:table-cell branch-column w-36">
        <div className="relative group">
          <span className="truncate max-w-xs inline-block  pt-2">
            {session.branch.length > 18
              ? session.branch.substring(0, 18) + '...'
              : session.branch}
          </span>
          {session.branch.length > 18 && (
            <div className="absolute left-0 hidden group-hover:block z-10 bg-gray-900 text-white text-xs rounded p-1 mt-1 w-max">
              {session.branch}
            </div>
          )}
        </div>
      </td>

      <td className="p-2 text-left hidden lg:table-cell city-column w-36">
        {session.city}
      </td>

      <td
        className="p-2 text-center relative hidden md:table-cell pages-column w-20"
        onMouseEnter={() => setHoveredRow(index)}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <span
          className={`p-2 rounded ${hoveredRow === index ? 'bg-gray-100' : ''}`}
        >
          {session.pages}
        </span>
        {hoveredRow === index && (
          <div className="absolute z-20 bg-white shadow-lg p-2 border rounded-lg mt-2 left-0">
            <p className="font-bold text-gray-900 mb-2">Visited Pages</p>
            <ul className="text-gray-600">
              {session.visits?.map((visit, i) => (
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
                    <span>
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

      <td className="p-2 duration-column w-28">
        <div className="flex items-center">
          <FaYoutube className="mr-2 text-gray-400" />
          <span>{Math.floor(session.duration / 1000)} sec</span>
        </div>
      </td>

      <td className="p-2 text-left hidden lg:table-cell source-column w-48 ">
        <div className="relative group">
          <a
            href={session.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 truncate max-w-xs inline-block  pt-2"
          >
            {session.source.length > 25
              ? session.source.substring(0, 25) + '...'
              : session.source}
          </a>
          {session.source.length > 25 && (
            <div className="absolute left-0 top-full hidden group-hover:block z-50 bg-gray-900 text-white text-xs rounded p-1 w-max">
              {session.source}
            </div>
          )}
        </div>
      </td>

      <td className="p-2 text-left hidden md:table-cell interest-column w-28">
        {session.interest}
      </td>

      <td className="p-2 relative w-12 pr-4 text-right">
        <FaEllipsisV
          className="text-gray-500 cursor-pointer z-50"
          onClick={() => setActivePopup(activePopup === index ? null : index)}
        />
        {activePopup === index && (
          <PopupMenu setActivePopup={setActivePopup} popupRef={popupRef} />
        )}
      </td>
    </tr>
  );
};

export default TableRow;