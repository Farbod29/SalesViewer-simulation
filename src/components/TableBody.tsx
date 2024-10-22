import React from 'react';
import TableRow from './TableRow';

interface Visit {
  url: string;
  lastActivityAt: string;
  startedAt: string;
}

interface Session {
  id: string | number;
  dateOnly: string; // This will keep the date format
  date: string; // This should be a valid date string
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

interface TableBodyProps {
  sortedData: Session[];
  sortBy: keyof Session | null;
  hoveredRow: number | null;
  setHoveredRow: (index: number | null) => void;
  setActivePopup: (index: number | null) => void;
  activePopup: number | null;
  popupRef: React.RefObject<HTMLDivElement>;
}

interface GroupedSessions {
  [key: string]: Session[];
}

// Function to convert date string to a valid Date object
const parseDate = (dateString: string): Date => {
  const parts = dateString.split(','); // Split date and time
  const datePart = parts[0].trim(); // Get date part
  const timePart = parts[1]?.trim(); // Get time part

  if (!datePart || !timePart) {
    return new Date(NaN); // Return an invalid date if parts are missing
  }

  const [day, month, year] = datePart.split('.').map(Number); // Extract day, month, year
  const [hours, minutes, seconds] = timePart.split(':').map(Number); // Extract hours, minutes, seconds

  // Create a new date object using the extracted values
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

const TableBody: React.FC<TableBodyProps> = ({
  sortedData,
  sortBy,
  hoveredRow,
  setHoveredRow,
  setActivePopup,
  activePopup,
  popupRef,
}) => {
  const groupSessions = (
    data: Session[],
    key: keyof Session
  ): GroupedSessions => {
    return data.reduce((acc: GroupedSessions, session: Session) => {
      const groupKey = String(session[key]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(session);
      return acc;
    }, {});
  };

  const renderGroupContent = (
    sessions: Session[],
    groupKey: string,
    groupTitle: string
  ) => (
    <React.Fragment key={groupKey}>
      <tr className="bg-gray-50 shadow-md">
        <td colSpan={9} className="p-2 font-bold shadow-md">
          {groupTitle}
        </td>
      </tr>

      {sessions.map((session, index) => {
        // Convert date string to a valid Date object
        const parsedDate = parseDate(session.date);
        const formattedTime = isNaN(parsedDate.getTime())
          ? 'Invalid Date' // Handle invalid dates
          : parsedDate.toLocaleTimeString('de-DE');

        return (
          <React.Fragment key={session.id}>
            <TableRow
              session={{
                ...session,
                date: formattedTime, // Use formatted time
              }}
              index={index}
              hoveredRow={hoveredRow}
              setHoveredRow={setHoveredRow}
              setActivePopup={setActivePopup}
              activePopup={activePopup}
              popupRef={popupRef}
            />
            <tr>
              <td colSpan={9} className="p-1"></td>
            </tr>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );

  if (sortBy === 'date') {
    const groupedByDate = groupSessions(sortedData, 'dateOnly');
    return (
      <tbody>
        {Object.entries(groupedByDate).map(([date, sessions]) =>
          renderGroupContent(sessions, date, date)
        )}
      </tbody>
    );
  }

  if (sortBy === 'companyName') {
    const groupedByCompany = groupSessions(sortedData, 'companyName');
    return (
      <tbody>
        {Object.entries(groupedByCompany).map(([companyName, sessions]) =>
          renderGroupContent(sessions, companyName, companyName)
        )}
      </tbody>
    );
  }

  return (
    <tbody>
      {sortedData.map((session, index) => (
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
          <tr>
            <td colSpan={9} className="p-2"></td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableBody;
