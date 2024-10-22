import React, { useState, useEffect, useRef, useCallback } from 'react';
import sessionDataOriginal from '../data/sessionDataOrginal.json';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import '../styles/mediaQueries.css'; // Add this line for the new CSS

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
    <div className="container mx-auto p-1 sm:p-8 text-left mb-1 z-50">
      <div className="table-container relative">
        <table className="w-full table-auto border-collapse text-xs text-left z-50 table-spacing">
          <TableHeader
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
        </table>
        <div className="overflow-y-auto max-h-[760px]">
          <table className="w-full table-auto border-collapse text-xs text-left z-30 table-spacing pt-2 mt-8">
            <TableBody
              sortedData={sortedData}
              sortBy={sortBy}
              hoveredRow={hoveredRow}
              setHoveredRow={setHoveredRow}
              setActivePopup={setActivePopup}
              activePopup={activePopup}
              popupRef={popupRef}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionTable;