import { getGamesByCategory } from "../data/data-utils";
import { CardListSection } from "@/components/CardsList/CardListSection";
export default function Popular(props) {
  const popularGames = getGamesByCategory("popular");
  return (
    <main className={"main-inner"}>
      <CardListSection id="popular" title="Популярные" data={popularGames} />
    </main>
  );
}
