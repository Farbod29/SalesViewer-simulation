import React, { useState, useEffect, useRef, useCallback } from 'react';
import sessionDataOriginal from '../data/sessionDataOrginal.json';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import '../styles/mediaQueries.css';

// Import or define the SortableColumn type to match TableHeader
type SortableColumn =
  | 'date'
  | 'companyName'
  | 'branch'
  | 'city'
  | 'pages'
  | 'duration'
  | 'source'
  | 'interest';

interface Visit {
  url: string;
  lastActivityAt: string;
  startedAt: string;
}

// interface Company {
//   name?: string;
//   city?: string;
//   sector?: {
//     name?: string;
//   };
//   category?: {
//     icon?: string;
//   };
// }

interface Session {
  id: string;
  dateOnly: string;
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

const SessionTable: React.FC = () => {
  const [sortedData, setSortedData] = useState<Session[]>([]);
  // Update the sortBy state to use SortableColumn
  const [sortBy, setSortBy] = useState<SortableColumn>('date'); // Set a default value
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [activePopup, setActivePopup] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sortedData: Session[] =
      sessionDataOriginal[0]?.result?.map((session: any, index: number) => {
        const startedAt = new Date(session.startedAt).getTime();
        const lastActivityAt = new Date(session.lastActivityAt).getTime();
        const duration = lastActivityAt - startedAt;

        return {
          id: session.id || `session-${index}`,
          dateOnly: new Date(session.startedAt).toISOString().split('T')[0],
          date: new Date(session.startedAt).toLocaleString('de-DE'),
          logo: session.company?.category?.icon || null,
          companyName: session.company?.name || 'Unknown',
          branch: session.company?.sector?.name || 'Unknown',
          city: session.company?.city || 'Unknown',
          pages: Array.isArray(session.visits) ? session.visits.length : 0,
          duration: isNaN(duration) ? 0 : duration,
          source:
            session.referer && typeof session.referer === 'object'
              ? session.referer.referer_url
              : 'N/A',
          interest: session.mainInterest || 'No interest',
          visits: session.visits || [],
        };
      }) || [];

    // Update the sorting logic
    sortedData.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      // Handle null values
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sortOrder === 'asc' ? 1 : -1;
      if (bValue === null) return sortOrder === 'asc' ? -1 : 1;

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
    });

    setSortedData(sortedData);
  }, [sortBy, sortOrder]);

  // Update the handleSort function to use SortableColumn
  const handleSort = useCallback(
    (column: SortableColumn) => {
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
          <table className="w-full table-auto border-collapse text-xs text-left z-30 table-spacing pt-2 mt-8 shadow-md">
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
