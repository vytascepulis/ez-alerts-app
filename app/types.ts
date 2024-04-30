export interface Context {
  handleRegister: () => void;
  isRegisterLoading: boolean;
  isRegisterFailed: boolean;
  isRegistered: boolean;
}
