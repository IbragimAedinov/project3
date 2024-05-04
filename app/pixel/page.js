import { getGamesByCategory } from "../data/data-utils";
import { CardListSection } from "@/components/CardsList/CardListSection";
export default function Pixel(props) {
  const pixelGames = getGamesByCategory("pixel");
  return (
    <main className={"main-inner"}>
      <CardListSection id="pixel" title="Пиксельные" data={pixelGames} />
    </main>
  );
}
