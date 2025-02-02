import axios from "axios";

export const getData = async (query: string) => {
  const res = await fetch(`http://127.0.0.1:8000/api/${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};



export const getOmset = async (selectedMonth: string, selectedYear: string) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/omset`, {
    params: {
      month: selectedMonth,
      year: selectedYear,
    },
  });

  const data = res.data;
  return data;
};

