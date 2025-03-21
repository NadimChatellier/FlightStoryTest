"use client";
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import SearchBar from './components/searchbar';

export default function Home() {
  const [data, setData] = useState([]); // For storing CSV data
  const [error, setError] = useState(null); // For storing error messages
  const [loading, setLoading] = useState(true); // For loading state
  const [currentPage, setCurrentPage] = useState(1); // For current page
  const [itemsPerPage] = useState(21); // Items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/DiaryOfACEO_episodes.csv');
        const fileData = await res.text();
        Papa.parse(fileData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
            setLoading(false);
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once after mount

  // Get current page data
  const indexOfLastEpisode = currentPage * itemsPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - itemsPerPage;
  const currentEpisodes = data.slice(indexOfFirstEpisode, indexOfLastEpisode);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const getPaginationRange = (currentPage, totalPages) => {
    const range = 5; // Set the number of page buttons to display
    let startPage = Math.max(1, currentPage - Math.floor(range / 2));
    let endPage = Math.min(totalPages, startPage + range - 1);
  
    // Adjust startPage if endPage exceeds totalPages
    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - range + 1);
    }
  
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-300 p-8 sm:p-12">
      <main className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Flight Story Podcast Search</h1>
        
        <SearchBar />
  
        {error ? (
          <p className="text-red-500 text-center mt-6">Error: {error}</p>
        ) : loading ? (
          <p className="text-gray-400 text-center mt-6">Loading data...</p>
        ) : currentEpisodes.length > 0 ? (
          <>
            {/* Grid Layout for Episodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {currentEpisodes.map((episode, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  {/* Image with Object-Cover */}
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={episode.thumbnail_url}
                      alt={episode.episode_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Content Container */}
                  <div className="flex flex-col p-6">
                    <h2 className="text-2xl font-semibold text-white mb-2">{episode.episode_name}</h2>
                    <p className="text-gray-400 text-sm mb-4">{episode.release_date}</p>
                    <p className="text-gray-300 text-sm line-clamp-3">{episode.description}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="flex justify-center gap-6 mt-10">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold disabled:opacity-50 hover:bg-blue-400 transition-all"
    >
      Previous
    </button>

    {/* Page Buttons */}
    {getPaginationRange(currentPage, totalPages).map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-blue-400 hover:text-white transition-all`}
      >
        {page}
      </button>
    ))}

    {/* Ellipsis for skipped pages */}
    {currentPage > 3 && totalPages > 5 && (
      <span className="text-gray-400 px-4 py-2">...</span>
    )}

    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold disabled:opacity-50 hover:bg-blue-400 transition-all"
    >
      Next
    </button>
  </div>
          </>
        ) : (
          <p className="text-gray-500 text-center mt-10">No data available.</p>
        )}
      </main>
    </div>
  );
  
}
