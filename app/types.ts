export interface Settings {
  text: {
    content: string;
    specialColor: string;
  };
  display: {
    duration: number;
    animationIn: string;
    animationOut: string;
  };
  audio: {
    volume: number;
    base64: string;
    fileName: string;
  };
  image: {
    base64: string;
    fileName: string;
  };
  useProductImages: boolean;
}

export interface UserData {
  isBlocked: boolean;
  settings?: Settings;
  uuid?: string;
}

export interface Context extends UserData {
  handleRegister: () => void;
  setUserData: (userData: UserData) => void;
  isRegisterLoading: boolean;
  isRegisterFailed: boolean;
  isRegistered: boolean;
  ENV: { [key: string]: string };
}
