import { Bar } from "react-chartjs-2";

export const TypeChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Amount of Expenses by Type</h2>
<Bar
  data={chartData}
  options={{
    plugins: {
      title: {
        display: true,
        text: "Total money spent by type",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw; 
            const type = context.label; 
            return `Total Money Spent on ${type}: $${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Expense Type",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Amount ($)",
        },
        beginAtZero: true,
      },
    },
  }}
/>
    </div>
  );
};
