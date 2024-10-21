import React from 'react';

const PopupMenu = ({ setActivePopup, popupRef }) => {
  return (
    <div
      className="absolute z-50 bg-white shadow-lg p-4 border rounded-lg mt-2 right-0 w-64"
      ref={popupRef}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-gray-900">More</div>
        <button className="text-gray-500" onClick={() => setActivePopup(null)}>
          ✕
        </button>
      </div>
      <ul className="text-gray-700">
        <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
          <span className="material-icons text-gray-400">badge</span>
          <span>SalesViewer® IDcard</span>
        </li>
        <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
          <span className="material-icons text-gray-400">person_add</span>
          <span>Assign employee</span>
        </li>
        <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
          <span className="material-icons text-gray-400">visibility_off</span>
          <span>Hide company</span>
        </li>
        <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
          <span className="material-icons text-gray-400">edit</span>
          <span>Edit company</span>
        </li>
        <li className="py-1 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
          <span className="material-icons text-gray-400">delete</span>
          <span>Delete session</span>
        </li>
      </ul>
    </div>
  );
};

export default PopupMenu;
