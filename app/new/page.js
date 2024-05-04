import { endpoints } from "@/app/api/config";
import { getNormalizedGamesDataByCategory } from "@/app/api/api-utils";
import { CardListSection } from "@/components/CardsList/CardListSection";
export default async function New() {
  const newGames = await getNormalizedGamesDataByCategory(
    endpoints.games,
    "new"
  );
  return (
    <main className="main-inner">
      <CardListSection id="new" title="Новинки" data={newGames} />
    </main>
  );
}
