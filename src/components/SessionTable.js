import React, { useState, useEffect, useRef, useCallback } from 'react';
import sessionDataOriginal from '../data/sessionDataOrginal.json';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const SessionTable = () => {
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const sortedData = sessionDataOriginal[0].result.map((session, index) => {
      const startedAt = new Date(session.startedAt).getTime();
      const lastActivityAt = new Date(session.lastActivityAt).getTime();
      const duration = lastActivityAt - startedAt;
      return {
        id: index + 1,
        date: new Date(session.startedAt).toLocaleString('de-DE'),
        dateOnly: new Date(session.startedAt).toLocaleDateString('de-DE'), // Extract only the date part
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
    });

    // Sort the data based on the selected column
    sortedData.sort((a, b) => {
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

    setSortedData(sortedData);
  }, [sortBy, sortOrder]);

  // Define the sorting function
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

  return (
    <div className="container mx-auto p-8 text-left mb-10">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto -collapse-gray-200 text-xs text-left">
          <TableHeader
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
          <TableBody
            sortedData={sortedData}
            sortBy={sortBy} // Pass sortBy to decide grouping
            hoveredRow={hoveredRow}
            setHoveredRow={setHoveredRow}
            setActivePopup={setActivePopup}
            activePopup={activePopup}
            popupRef={popupRef}
          />
        </table>
      </div>
    </div>
  );
};

export default SessionTable;
