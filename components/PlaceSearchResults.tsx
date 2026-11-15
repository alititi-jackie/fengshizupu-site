import { archives, regions, villages } from '../lib/data';

export function findPlaces(query: string) {
  const normalize = (value: string) => value.normalize('NFKC').trim().toLowerCase();
  const q = normalize(query);
  const matches = (names: string[]) => Boolean(q) && names.some((name) => normalize(name).includes(q));
  const matchedVillages = villages.filter((v) => matches([v.name, ...v.aliases]));
  const matchedRegions = regions.filter((r) => r.status === 'active' && matches([r.name, ...r.aliases]));
  return {
    places: [
      ...matchedVillages.map((v) => ({ href: `/villages/${v.id}/`, name: v.name })),
      ...matchedRegions.map((r) => ({ href: `/regions/${r.id}/`, name: r.name })),
    ],
    books: archives.filter((a) => matches([a.title]) || a.villageIds.some((id) => matchedVillages.some((v) => v.id === id))),
  };
}

export default function PlaceSearchResults({ results }: { results: ReturnType<typeof findPlaces> }) {
  return (
    <>
      {results.places.length > 0 && <section><h2>村庄与地区</h2><ul>
        {results.places.map(({ href, name }) => <li key={href}><a href={href}>{name}</a></li>)}
      </ul></section>}
      {results.books.length > 0 && <section><h2>族谱档案</h2><ul>
        {results.books.map((a) => <li key={a.id}><a href={`/archives/${a.id}/`}>{a.title}</a></li>)}
      </ul></section>}
    </>
  );
}
