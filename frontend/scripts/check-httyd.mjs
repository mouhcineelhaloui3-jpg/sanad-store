const ids = [1087192, 420818, 1086052];
for (const id of ids) {
  const h = await (await fetch(`https://www.themoviedb.org/movie/${id}`)).text();
  const m = h.match(/"image":"(https:\/\/image\.tmdb\.org\/t\/p\/w500\/[^"]+)"/);
  console.log(id, m ? m[1] : "NONE");
}
