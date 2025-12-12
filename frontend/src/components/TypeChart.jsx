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
              text: "Total Money Spent on this Category ",
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
