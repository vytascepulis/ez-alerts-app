import { useState } from "react";

type NewState<A> = Partial<A> | ((prevState: A) => Partial<A>);

export const useMergeState = <A>(
  initialState: A,
): [A, (newState: NewState<A>) => void] => {
  const [state, setState] = useState<A>(initialState);
  const setMergedState = (newState: NewState<A>) => {
    if (typeof newState === "function") {
      setState((prevState) => ({ ...prevState, ...newState(prevState) }));
    } else {
      setState((prevState) => ({ ...prevState, ...newState }));
    }
  };
  return [state, setMergedState];
};

export default useMergeState;
