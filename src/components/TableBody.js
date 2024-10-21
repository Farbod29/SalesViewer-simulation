import React from 'react';
import TableRow from './TableRow';

const TableBody = ({
  sortedData,
  sortBy, // Get sortBy to decide grouping
  hoveredRow,
  setHoveredRow,
  setActivePopup,
  activePopup,
  popupRef,
}) => {
  return (
    <tbody>
      {sortBy === 'date'
        ? // Group the sessions by date if sorting by date
          Object.entries(
            sortedData.reduce((acc, session) => {
              const date = session.dateOnly;
              if (!acc[date]) {
                acc[date] = [];
              }
              acc[date].push(session);
              return acc;
            }, {})
          ).map(([date, sessions]) => (
            <React.Fragment key={date}>
              {/* Render the group header for the date */}
              <tr className="bg-gray-50">
                <td colSpan="9" className="p-2 font-bold">
                  {date}
                </td>
              </tr>

              {/* Render each session under this date */}
              {sessions.map((session, index) => (
                <TableRow
                  key={session.id}
                  session={session}
                  index={index}
                  hoveredRow={hoveredRow}
                  setHoveredRow={setHoveredRow}
                  setActivePopup={setActivePopup}
                  activePopup={activePopup}
                  popupRef={popupRef}
                />
              ))}
            </React.Fragment>
          ))
        : sortBy === 'companyName'
        ? // Group the sessions by company name if sorting by company
          Object.entries(
            sortedData.reduce((acc, session) => {
              const companyName = session.companyName;
              if (!acc[companyName]) {
                acc[companyName] = [];
              }
              acc[companyName].push(session);
              return acc;
            }, {})
          ).map(([companyName, sessions]) => (
            <React.Fragment key={companyName}>
              {/* Render the group header for the company */}
              <tr className="bg-gray-50">
                <td colSpan="9" className="p-2 font-bold">
                  {companyName}
                </td>
              </tr>

              {/* Render each session under this company */}
              {sessions.map((session, index) => (
                <TableRow
                  key={session.id}
                  session={session}
                  index={index}
                  hoveredRow={hoveredRow}
                  setHoveredRow={setHoveredRow}
                  setActivePopup={setActivePopup}
                  activePopup={activePopup}
                  popupRef={popupRef}
                />
              ))}
            </React.Fragment>
          ))
        : // No grouping, just display the sorted sessions
          sortedData.map((session, index) => (
            <React.Fragment key={session.id}>
              <TableRow
                session={session}
                index={index}
                hoveredRow={hoveredRow}
                setHoveredRow={setHoveredRow}
                setActivePopup={setActivePopup}
                activePopup={activePopup}
                popupRef={popupRef}
              />
            </React.Fragment>
          ))}
    </tbody>
  );
};

export default TableBody;
