import { Bar } from "react-chartjs-2";

export const TypeChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>

      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Amount of Expenses by Type",
            },
            legend: {
              display: false,
            },
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
