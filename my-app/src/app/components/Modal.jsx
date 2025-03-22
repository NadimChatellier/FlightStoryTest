import React from "react";

export default function Modal({ episode, onClose }) {
  if (!episode) return null;

  // Close the modal when clicking on the background
  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      onClose();
    }
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg w-4xl relative shadow-lg">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-200">
          ✖
        </button>

        {/* Episode Thumbnail */}
        <img
          src={episode.thumbnail_url_maxres}
          alt={episode.episode_name}
          className="w-full rounded-md mb-4"
        />

        {/* Episode Title and Release Date */}
        <h2 className="text-2xl font-bold">{episode.episode_name}</h2>
        <p className="text-sm text-gray-400">{episode.release_date}</p>

        {/* Stats Section */}
        <div className="mt-4 flex justify-between text-gray-400 text-sm">
          <p>👍 {episode.likes}</p>
          <p>👎 {episode.dislikes}</p>
          <p>👀 {episode.views}</p>
          <p>💬 {episode.comments}</p>
        </div>

        {/* Watch on YouTube Button */}
        <a
          href={`https://www.youtube.com/watch?v=${episode.episode_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-blue-600 hover:bg-blue-500 text-white mt-6 p-2 rounded-lg"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}

