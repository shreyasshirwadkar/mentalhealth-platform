"use client";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface MoodEntry {
  timestamp: string;
  mood: string;
}

interface MoodChartProps {
  moodHistory: MoodEntry[];
}

const MoodChart: FC<MoodChartProps> = ({ moodHistory }) => {
  const moodValues: Record<string, number> = {
    Happiest: 5,
    "Very Happy": 4,
    Happy: 3,
    Sad: 2,
    "Very Sad": 1,
    Angry: 0,
  };

  const moodLabels = [
    "Angry",
    "Very Sad",
    "Sad",
    "Happy",
    "Very Happy",
    "Happiest",
  ];

  const chartData: ChartData<"line"> = {
    datasets: [
      {
        label: "Mood Trends",
        data: moodHistory.map((entry) => ({
          x: new Date(entry.timestamp).getTime(),
          y: moodValues[entry.mood] ?? 0,
        })),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "HH:mm",
          displayFormats: { hour: "HH:mm" },
        },
        title: { display: true, text: "Time of Day" },
      },
      y: {
        ticks: {
          callback: (value) => moodLabels[value as number] || "",
          stepSize: 1,
        },
        title: { display: true, text: "Mood Level" },
      },
    },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Mood Trends Over Time" },
    },
  };

  return (
    <div className="md:w-[50vw] w-[90vw] h-full md:h-[50vh]   p-4">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MoodChart;
