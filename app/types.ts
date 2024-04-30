interface Settings {
  settings: {
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
    };
    image: {
      base64: string;
    };
    useProductImages: boolean;
  };
}

export interface UserData {
  isBlocked: boolean;
  settings?: Settings;
  uuid?: string;
}

export interface Context extends UserData {
  handleRegister: () => void;
  isRegisterLoading: boolean;
  isRegisterFailed: boolean;
  isRegistered: boolean;
}
