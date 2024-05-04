import { getGamesByCategory } from "../data/data-utils";
import { CardListSection } from "@/components/CardsList/CardListSection";
export default function Runner(props) {
  const runnerGames = getGamesByCategory("runner");
  return (
    <main className={"main-inner"}>
      <CardListSection id="runner" title="Ранеры" data={runnerGames} />
    </main>
  );
}
