export interface FormattedData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      fill: boolean;
    }[];
  }