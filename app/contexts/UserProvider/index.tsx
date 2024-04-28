import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface Settings {
  color: string;
}

interface IGeneral {
  isRegistered: boolean;
}

interface Context {
  settings: Settings;
  general: IGeneral;
  handleRegister: (onError: () => void) => void;
}

interface State {
  settings: Settings;
  general: IGeneral;
}

const UserContext = createContext<Context>({
  general: {
    isRegistered: false,
  },
  settings: {
    color: "",
  },
  handleRegister: (onError) => {},
});

const UserProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    general: {
      isRegistered: false,
    },
    settings: {
      color: "",
    },
  });

  const handleRegister: Context["handleRegister"] = (onError) => {
    window.setTimeout(() => {
      setState({ ...state, general: { ...state.general, isRegistered: true } });
      shopify.toast.show("Registered successfully!");
    }, 3000);
  };

  useEffect(() => {
    console.log("fetch data");
  }, []);

  const value = {
    general: state.general,
    settings: state.settings,
    handleRegister,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
