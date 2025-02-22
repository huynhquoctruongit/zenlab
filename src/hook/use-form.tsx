import { create } from "zustand";

type stateFrom = "login" | "login-user" | "";
interface IPayload {
  show?: stateFrom;
  action?: Object;
}

interface IAuthForm {
  show: stateFrom;
  callback: (() => Promise<void>) | undefined | (() => void);
  increasePopulation: () => void;
  openAuthForm: (payload: IPayload) => void;
  closeAuthForm?: () => void;
  runCallback: () => void;
}

const useAuthForm = create<IAuthForm>((set) => ({
  show: "",
  callback: () => {},
  increasePopulation: () => set((state) => ({ show: state.show })),
  openAuthForm: (payload) =>
    set(() => {
      const { show, action = {} } = payload;
      if (action) window.localStorage.setItem("action", JSON.stringify(action));
      return { show: show || "login", action: action };
    }),
  closeAuthForm: () => set(() => ({ show: "" })),
  runCallback: () =>
    set((state) => {
      const fn = state.callback;
      fn && fn();
      return { callback: () => {} };
    }),
}));

export default useAuthForm;