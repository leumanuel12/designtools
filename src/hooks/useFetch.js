import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log(e);
        setErrorStatus(e);
      });
  }, [data]);

  return [data, errorStatus];
}
