import { create } from "zustand";
import { setJWT } from "../api/api-utils";
export const useStore = create((set) => ({
  popupIsOpened: false,
  isAuth: false,
  user: null,
  token: null,
  openPopup: () =>
    set({
      popupIsOpened: true,
    }),
  closePopup: () =>
    set({
      popupIsOpened: false,
    }),
  login: (user, token) => {
    /* С помощью функции set устанавливаем новое состояние хранилища */
    set({ isAuth: true, user, token });
    /* Записываем полученный токен */
    setJWT(token);
  },
  logout: () => {
    /* Возвращаем изначальные состояния */
    set({ isAuth: false, user: null, token: null });
    /* Удаляем токен */
    removeJWT();
  },
  checkAuth: async () => {
    const jwt = getJWT();
    if (jwt) {
      const user = await getMe(endpoints.me, jwt);
      if (user) {
        /* Сохраняем полученные данные и токен */
        set({ isAuth: true, user, token: jwt });
        setJWT(jwt);
      } else {
        /* Возвращаем изначальные состояния и удаляем токен */
        set({ isAuth: false, user: null, token: null });
        removeJWT();
      }
    } else {
      set({ isAuth: false, user: null, token: null });
    }
  },
}));
