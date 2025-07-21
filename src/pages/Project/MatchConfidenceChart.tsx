import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MatchConfidenceChart = ({ inputConfidence, dbConfidence }) => {
  const data = {
    labels: ['Input Confidence', 'DB Confidence'],
    datasets: [
      {
        label: '% Confidence',
        data: [inputConfidence, dbConfidence],
        backgroundColor: ['#4caf50', '#2196f3']
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Match Confidence' }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  return <Bar data={data} options={options} />;
};

export default MatchConfidenceChart;
