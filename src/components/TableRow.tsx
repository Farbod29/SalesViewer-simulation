import React from 'react';
import { FaEllipsisV, FaYoutube } from 'react-icons/fa';
import PopupMenu from './PopupMenu';

interface Visit {
  url: string;
  lastActivityAt: string;
  startedAt: string;
}

interface Session {
  date: string;
  logo: string | null;
  companyName: string;
  branch: string;
  city: string;
  pages: number;
  duration: number;
  source: string;
  interest: string;
  visits: Visit[];
}

interface TableRowProps {
  session: Session;
  index: number;
  hoveredRow: number | null;
  setHoveredRow: (index: number | null) => void;
  setActivePopup: (index: number | null) => void;
  activePopup: number | null;
  popupRef: React.RefObject<HTMLDivElement>;
}

const TableRow: React.FC<TableRowProps> = ({
  session,
  index,
  hoveredRow,
  setHoveredRow,
  setActivePopup,
  activePopup,
  popupRef,
}) => {
  // Early return if session is undefined
  if (!session) {
    return (
      <tr>
        <td colSpan={9}>No session data available</td>
      </tr>
    );
  }

  // Safe access to properties with default values
  const {
    date = '',
    logo = null,
    companyName = 'Unknown',
    branch = 'Unknown',
    city = 'Unknown',
    pages = 0,
    duration = 0,
    source = 'N/A',
    interest = 'No interest',
    visits = [],
  } = session;

  return (
    <tr className="hover:bg-gray-200 border rounded-lg">
      <td className="p-0 text-left date-column w-28 pl-2">
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          {date}
        </div>
      </td>

      <td className="p-0 text-left w-40 truncate relative">
        <div className="flex items-center space-x-2 relative">
          {logo ? (
            <span
              dangerouslySetInnerHTML={{
                __html: logo.replace('<svg', '<svg class="w-3 h-3"'),
              }}
            />
          ) : (
            <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
          )}
          <div className="relative group">
            <span className="truncate max-w-xs inline-block z-60 pt-3">
              {companyName && companyName.length > 15
                ? `${companyName.substring(0, 15)}...`
                : companyName}
            </span>
            {companyName && companyName.length > 15 && (
              <div className="absolute left-0 top-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded p-1 w-max">
                {companyName}
              </div>
            )}
          </div>
        </div>
      </td>

      <td className="p-2 text-left hidden xl:table-cell branch-column w-36">
        <div className="relative group">
          <span className="truncate max-w-xs inline-block pt-2">
            {branch && branch.length > 18
              ? `${branch.substring(0, 18)}...`
              : branch}
          </span>
          {branch && branch.length > 18 && (
            <div className="absolute left-0 hidden group-hover:block z-10 bg-gray-900 text-white text-xs rounded p-1 mt-1 w-max">
              {branch}
            </div>
          )}
        </div>
      </td>

      <td className="p-2 text-left hidden lg:table-cell city-column w-36">
        {city}
      </td>

      <td
        className="p-2 text-center relative hidden md:table-cell pages-column w-20"
        onMouseEnter={() => setHoveredRow(index)}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <span
          className={`p-2 rounded ${hoveredRow === index ? 'bg-gray-100' : ''}`}
        >
          {pages}
        </span>
        {hoveredRow === index && (
          <div className="absolute z-20 bg-white shadow-lg p-2 border rounded-lg mt-2 left-0">
            <p
              className="font-bold text-gray-900 mb-2"
              style={{ minWidth: '500px' }}
            >
              Visited Pages
            </p>
            <ul className="text-gray-600">
              {visits && visits.length > 0 ? (
                visits.map((visit, i) => (
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
                ))
              ) : (
                <li className="py-1">No visits</li>
              )}
            </ul>
            <p className="font-bold mt-2">
              Total Time: {Math.floor(duration / 1000)} sec
            </p>
          </div>
        )}
      </td>

      <td className="p-2 duration-column w-28">
        <div className="flex items-center">
          <FaYoutube className="mr-2 text-gray-400" />
          <span>{Math.floor(duration / 1000)} sec</span>
        </div>
      </td>

      <td className="p-2 text-left hidden lg:table-cell source-column w-48">
        <div className="relative group">
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 truncate max-w-xs inline-block pt-2"
          >
            {source && source.length > 25
              ? `${source.substring(0, 25)}...`
              : source}
          </a>
          {source && source.length > 25 && (
            <div className="absolute left-0 top-full hidden group-hover:block z-50 bg-gray-900 text-white text-xs rounded p-1 w-max">
              {source}
            </div>
          )}
        </div>
      </td>

      <td className="p-2 text-left hidden md:table-cell interest-column w-28">
        {interest}
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
