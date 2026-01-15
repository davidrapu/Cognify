import { useEffect, useState, type DependencyList } from "react";

function useFetch<T>(url: string, dependencies: DependencyList = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");
        const json = (await res.json()) as T;
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, dependencies);

  return { data, error, loading };
}

export default useFetch;
