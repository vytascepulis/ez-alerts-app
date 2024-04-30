import { useQuery as useQ } from "@tanstack/react-query";

interface QueryVariables<T> {
  endpoint: string;
  key: string;
  error?: (error: { message: string }) => void;
  update?: (result: T) => void;
  isLazy?: boolean;
}

const queryFunction = async <T>(variables: QueryVariables<T>) => {
  const data = await fetch(`http://localhost:3000/${variables.endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const json = await data.json();

  if (!data.ok) {
    throw new Error(json.message);
  } else {
    return json;
  }
};

const useQuery = <T>(variables: QueryVariables<T>) => {
  const { isPending, error, data, refetch } = useQ({
    queryKey: [variables.key, variables],
    queryFn: () => queryFunction<T>(variables),
    enabled: !variables.isLazy,
  });

  return { refetch, isLoading: isPending, error: error?.message, data };
};

export default useQuery;
