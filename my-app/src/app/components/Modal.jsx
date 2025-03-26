import React, { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement } from "chart.js";
import ModalGraphSettings from "./modalGraphSettings/graphSettings";
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, LineElement);

export default function Modal({ episode, onClose }) {
  const [isMetricsVisible, setIsMetricsVisible] = useState(false); // State to toggle metrics visibility

  if (!episode) return null;
    //get the data and options for the charts
    const {subscribersData, subscribersOptions, interactionData, interactionOptions} = ModalGraphSettings({episode})

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      onClose();
    }
  };

  // Toggle visibility of the metrics section
  const toggleMetricsVisibility = () => {
    setIsMetricsVisible(!isMetricsVisible);
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex justify-center items-start z-50 overflow-y-auto"
      onClick={handleBackgroundClick}
    >
      {/* Modal Container */}
      <div className="bg-gray-800 text-white p-8 rounded-2xl max-w-[60vw] mt-10 mb-10 shadow-2xl relative flex flex-col gap-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white transition-transform transform hover:scale-110"
        >
          ✖
        </button>

        {/* Embedded YouTube Video */}
        <div className="w-full rounded-lg overflow-hidden border-4 border-gray-700">
          <iframe
            src={`https://www.youtube.com/embed/${episode.episode_id}`}
            title={episode.episode_name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[40vh]"
          ></iframe>
        </div>

        {/* Episode Details */}
        <div className="text-center mt-4">
          <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
            {episode.episode_name}
          </h2>
          <p className="text-sm text-gray-400 mt-2 italic">
            Released on {episode.release_date}
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center gap-x-8 text-gray-300 text-sm border-t border-gray-600 pt-4">
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
          className="block text-center bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg shadow-lg text-lg font-semibold transition-transform transform hover:scale-105 w-1/2 mx-auto mt-4"
        >
          ▶ Watch on YouTube
        </a>

        {/* Collapsible Performance Metrics Section */}
        <div className="w-full mt-6">
          <button
            onClick={toggleMetricsVisibility}
            className="w-full text-left bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition-all"
          >
            {isMetricsVisible ? "Hide Performance Metrics" : "Show Performance Metrics"}
          </button>

          {isMetricsVisible && (
  <div className="mt-8 text-gray-300 text-sm">

<div className="overflow-x-auto w-full mb-8 flex flex-col items-center">
<h3 className="text-xl font-bold mt-8">Statistics</h3>
  <table className="w-full max-w-lg mx-auto table-auto text-white text-lg shadow-lg rounded-lg overflow-hidden m-8">
    <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <tr>
        <th className="p-4 text-2xl border-r border-white w-1/2">Metrics</th>
        <th className="p-4 text-2xl w-1/2">Values</th>
      </tr>
    </thead>
    <tbody>
      {[
        { label: 'Estimated Minutes Watched', value: episode.estimatedMinutesWatched },
        { label: 'Average View Duration', value: `${episode.averageViewDuration} (seconds)` },
        { label: 'Average View Percentage', value: `${episode.averageViewPercentage}%` },
        { label: 'Shares', value: episode.shares },
        { label: 'Subscribers Gained', value: episode.subscribersGained },
        { label: 'Subscribers Lost', value: episode.subscribersLost },
      ].map((item, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
          <td className="p-4 font-medium border-r border-gray-500 w-1/2">{item.label}</td>
          <td className="p-4 text-right font-semibold w-1/2">{item.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    {/* Subscribers Gained vs Lost */}
    <div className="w-full mb-8 flex flex-col items-center">
      <h3 className="text-xl font-bold mt-8">Subscribers Gained vs Lost</h3>
      <p className="text-center text-sm text-gray-400 mb-4">
        This doughnut chart shows the number of subscribers gained and lost for this episode.
      </p>
      <div className="w-full max-w-[500px]">
        <Doughnut data={subscribersData} options={subscribersOptions} />
      </div>
    </div>

    {/* View to Shares Ratio */}
    <div className="w-full mb-8 flex flex-col items-center">
      <h3 className="text-xl font-bold mt-8">Video engement</h3>
      <div className="w-full max-w-[800px]">
        <h3 className="text-xl font-bold m-8">Engagement Rate  ({episode.views} views)</h3>
        <Bar data={interactionData} options={interactionOptions} />
      </div>
    </div>
  </div>
)}



        </div>
      </div>
    </div>
  );
}
