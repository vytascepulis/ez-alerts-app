import { useMutation as useM } from "@tanstack/react-query";

interface MutationVariables {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface HookVariables<T> {
  key: string;
  endpoint: string;
  method: "POST" | "PUT" | "DELETE";
  onError?: (error: { message: string }) => void;
  onSuccess?: (result: T) => void;
}

type AllVariables<T> = { variables: MutationVariables } & HookVariables<T>;

const mutationFunction = async <T>(allVariables: AllVariables<T>) => {
  console.log("allVariables: ", allVariables);
  const data = await fetch(`http://localhost:3000/${allVariables.endpoint}`, {
    method: allVariables.method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: allVariables.variables
      ? JSON.stringify(allVariables.variables)
      : null,
  });

  const json = await data.json();

  if (!data.ok) {
    throw new Error(json.message);
  } else {
    return json;
  }
};

const useMutation = <T>(hookVariables: HookVariables<T>) => {
  const mutation = useM({
    mutationFn: (mutationVariables: MutationVariables) =>
      mutationFunction({ ...hookVariables, variables: mutationVariables }),
    onError: (err) =>
      hookVariables?.onError ? hookVariables?.onError(err) : undefined,
    onSuccess: (data) =>
      hookVariables?.onSuccess ? hookVariables?.onSuccess(data) : undefined,
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};

export default useMutation;
