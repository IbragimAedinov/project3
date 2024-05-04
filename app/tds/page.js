import { getGamesByCategory } from "../data/data-utils";
import { CardListSection } from "@/components/CardsList/CardListSection";
export default function TDS(props) {
  const tdsGames = getGamesByCategory("TDS");
  return (
    <main className={"main-inner"}>
      <CardListSection id="TDS" title="TDS" data={tdsGames} />
    </main>
  );
}
