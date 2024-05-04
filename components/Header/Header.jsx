"use client";
import { useEffect, useState } from "react";
import Styles from "./Header.module.css";
import { Popup } from "../Popup/Popup";
import { Overlay } from "../Overlay/Overlay";
import { AuthForm } from "../AuthForm/AuthForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMe, removeJWT } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { useStore } from "@/app/store/app-store";

export const Header = () => {
  const store = useStore();
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const pathname = usePathname();
  console.log(pathname);

  const openPopup = () => {
    setIsPopupOpened(true);
  };
  function closeAuthPopup() {
    setPopupIsOpened(false);
  }
  function openAuthPopup() {
    setPopupIsOpened(true);
  }

  useEffect(() => {
    getMe(endpoints.me);
  }, []);
  const closePopup = () => {
    setIsPopupOpened(false);
  };
  const handleLogout = () => {
    store.logout();
  };
  return (
    <header className={Styles["header"]}>
      <Link href="/" className={Styles["logo"]}>
        <img
          className={Styles["logo__image"]}
          src="/images/logo.svg"
          alt="Логотип Pindie"
        />
      </Link>
      <nav className={Styles["menu"]}>
        <ul className={Styles["menu__list"]}>
          <li className={Styles["menu__item"]}>
            <Link
              href="/new"
              className={`${Styles["menu__link"]} 
                ${pathname === "/new" && Styles["menu__link_active"]}`}
            >
              Новинки
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/popular"
              className={`${Styles["menu__link"]} 
                ${pathname === "/popular" && Styles["menu__link_active"]}`}
            >
              Популярные
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/shooters"
              className={`${Styles["menu__link"]} 
                ${pathname === "/shooters" && Styles["menu__link_active"]}`}
            >
              Шутеры
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/runners"
              className={`${Styles["menu__link"]} 
                ${pathname === "/runner" && Styles["menu__link_active"]}`}
            >
              Ранеры
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/pixel"
              className={`${Styles["menu__link"]} 
                ${pathname === "/pixel" && Styles["menu__link_active"]}`}
            >
              Пиксельные
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/tds"
              className={`${Styles["menu__link"]} 
                ${pathname === "/TDS" && Styles["menu__link_active"]}`}
            >
              TDS
            </Link>
          </li>
        </ul>
        <div className={Styles["auth"]}>
          {store.isAuth ? (
            <button className={Styles["auth__button"]} onClick={handleLogout}>
              Выйти
            </button>
          ) : (
            <button
              className={Styles["auth__button"]}
              onClick={store.openPopup}
            >
              Войти
            </button>
          )}
        </div>
      </nav>
      <Overlay onClose={store.closePopup} isOpened={store.isPopupOpened} />
      {isPopupOpened && (
        <Popup onClose={store.closePopup}>
          <AuthForm close={store.closePopup} setAuth={store.setIsAuthorized} />;
        </Popup>
      )}
    </header>
  );
};
