import { useEffect, useState } from "react";

export function useFetch(url, info) {
  const [data, setData] = useState();
  useEffect(async () => {
    const result = await fetch(url, info);
    const data = await result.json();
    setData(data);
  }, []);
  return data;
}
