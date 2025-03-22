import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Modal({ episode, onClose }) {
  const [isMetricsVisible, setIsMetricsVisible] = useState(false); // State to toggle metrics visibility

  if (!episode) return null;

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      onClose();
    }
  };

  // Chart Data for Engagement Metrics
  const engagementData = {
    labels: ["Views", "Likes", "Dislikes", "Comments"],
    datasets: [
      {
        label: "Engagement Metrics",
        data: [
          parseInt(episode.views),
          parseInt(episode.likes),
          parseInt(episode.dislikes),
          parseInt(episode.comments),
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"],
        borderRadius: 8,
      },
    ],
  };

  const engagementOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Chart Data for Performance Metrics
  const performanceData = {
    labels: ["Average View Duration", "Average View Percentage", "Shares", "Subscribers Gained", "Subscribers Lost"],
    datasets: [
      {
        label: "Performance Metrics",
        data: [
          parseFloat(episode.averageViewDuration),
          parseFloat(episode.averageViewPercentage),
          parseInt(episode.shares),
          parseInt(episode.subscribersGained),
          parseInt(episode.subscribersLost),
        ],
        backgroundColor: ["#4B8B3B", "#FDBA74", "#3b82f6", "#10b981", "#ef4444"],
        borderRadius: 8,
      },
    ],
  };

  const performanceOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Chart Data for Subscribers Gained vs Lost (Doughnut Chart)
  const subscribersData = {
    labels: ["Gained", "Lost"],
    datasets: [
      {
        data: [parseInt(episode.subscribersGained), parseInt(episode.subscribersLost)],
        backgroundColor: ["#10b981", "#ef4444"],
      },
    ],
  };

  const subscribersOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()}`
        }
      },
    },
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
  <div className="mt-4 text-gray-300 text-sm">
    {/* Engagement Metrics and Performance Metrics on the same line */}
    <div className="flex justify-between gap-8">
      {/* Engagement Metrics Bar Chart */}
      <div className="w-full h-64 mb-8">
        <h3 className="text-xl font-bold mt-8">Engagement Metrics</h3>
        <Bar data={engagementData} options={engagementOptions} />
      </div>

      {/* Performance Metrics Bar Chart */}
      <div className="w-full h-64 mb-8">
        <h3 className="text-xl font-bold mt-8">Performance Metrics</h3>
        <Bar data={performanceData} options={performanceOptions} />
      </div>
    </div>

    {/* Subscribers Gained vs Lost on a new line */}
    <div className="w-full h-64 mb-8">
      <h3 className="text-xl font-bold mt-8">Subscribers Gained vs Lost</h3>
      <Doughnut data={subscribersData} options={subscribersOptions} />
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}
