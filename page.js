import Image from "next/image";
import styles from "./page.module.css";
import { Promo } from "../components/Promo/Promo";
import { Banner } from "../components/Banner/Banner";
import { getGamesByCategory } from "./data/data-utils";
import { CardsList } from "@/components/CardsList/CardsList";

export default function Home() {
  const popularGamesData = getGamesByCategory("popular");
  const newGamesData = getGamesByCategory("new");

  return (
    <main className="main">
      <Banner />
      <CardsList
        name="Популярное"
        id="popular"
        data={popularGamesData}
        consoleCardListName={() => console.log("Популярное")}
      />
      <CardsList
        name="Новинки"
        id="new"
        data={newGamesData}
        consoleCardListName={() => console.log("Новинки")}
      />
      <Promo />
    </main>
  );
}
