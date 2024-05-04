"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Promo } from "../components/Promo/Promo";
import { Banner } from "../components/Banner/Banner";
import { getGamesByCategory } from "./data/data-utils";
import { CardListSection } from "@/components/CardsList/CardListSection";
export default function Home() {
  const popularGames = getGamesByCategory("popular");
  const newGames = getGamesByCategory("new");

  return (
    <main className="main">
      <Banner />
      {popularGames && newGames ? (
        <>
          <CardListSection
            id="popular"
            title="Популярные"
            data={popularGames}
            isSlider
          />
          <CardListSection id="new" title="Новинки" data={newGames} isSlider />
        </>
      ) : (
        <Preloader />
      )}
      <Promo />
    </main>
  );
}
