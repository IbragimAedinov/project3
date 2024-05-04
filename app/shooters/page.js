import { getGamesByCategory } from "../data/data-utils";
import { CardListSection } from "@/components/CardsList/CardListSection";
export default function Shooter(props) {
  const shooterGames = getGamesByCategory("shooter");
  return (
    <main className={"main-inner"}>
      <CardListSection id="shooter" title="Шутеры" data={shooterGames} />
    </main>
  );
}
