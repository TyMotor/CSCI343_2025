import List from "../components/List/List";
import { NEWS } from "../data/dummy_data";

export default function CarNewsScreen() {
  const category = "Car";
  const displayedNews = NEWS.filter((newsItem) => {
    return newsItem.category === category;
  })

  return <List items={displayedNews} />
}