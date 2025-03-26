 // Chart Data for Subscribers Gained vs Lost (Doughnut Chart)

 export default function ModalGraphSettings({ episode }) {
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
          label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
  };



// Likes, Comments, and Shares (Bar Chart)
const interactionData = {
  labels: ["Likes", "Comments", "Shares"],
  datasets: [
    {
      label: "Interactions",
      data: [
        parseInt(episode.likes),
        parseInt(episode.comments),
        parseInt(episode.shares)
      ],
      backgroundColor: ["#34d399", "#facc15", "#FDBA74"],
      borderRadius: 8,
    },
  ],
};

const interactionOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const value = tooltipItem.raw;
          const percentage = ((value / parseInt(episode.views)) * 100).toFixed(2);
          return `${value.toLocaleString()} (${percentage}% of total viewers)`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


return {subscribersData, subscribersOptions, interactionData, interactionOptions}
}

