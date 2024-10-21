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
    <>
      <tr className="hover:bg-gray-100 my-6 p-4 border rounded-lg">
        <td className="p-2 text-left date-column">{session.date}</td>
        <td className="p-2 text-left">
          <div className="flex items-center space-x-2">
            {session.logo ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: session.logo.replace('<svg', '<svg class="w-3 h-3"'),
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
            onClick={() => setActivePopup(activePopup === index ? null : index)}
          />
          {activePopup === index && (
            <PopupMenu setActivePopup={setActivePopup} popupRef={popupRef} />
          )}
        </td>
      </tr>
    </>
  );
};

export default TableRow;
