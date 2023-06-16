import { FormattedData } from "../types/formattedData";

export const formatData = (data: any[]): FormattedData => {
    const finalData: FormattedData = {
      labels: [],
      datasets: [
        {
          label: "Price",
          data: [],
          backgroundColor: "rgb(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
        },
      ],
    };
  
    const formattedDates = data.map((val) => {
      const ts = val[0];
      const date = new Date(ts * 1000);
      const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
      return formattedDate;
    });
  
    const priceArr = data.map((val) => val[4]);
  
    finalData.labels = formattedDates.reverse();
    finalData.datasets[0].data = priceArr.reverse();
  
    return finalData;
  };
  