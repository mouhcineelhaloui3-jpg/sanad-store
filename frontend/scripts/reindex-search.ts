import { reindexAllSearch } from "../src/lib/db/search";

reindexAllSearch()
  .then((summary) => {
    console.log("Search index rebuilt:", summary);
  })
  .catch(console.error);
