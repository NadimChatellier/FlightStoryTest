import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass the query to the parent component to filter data
  };

  return (
    <div className="flex justify-center items-center w-full mb-8">
      <div className="flex items-center w-full max-w-3xl">
        <input
          type="text"
          placeholder="Search for a podcast"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
