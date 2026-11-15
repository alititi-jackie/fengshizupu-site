import index from '../data/search-index.json';

export function searchPeople(query: string, archiveId?: string) {
  const normalize = (value: string) => value.normalize('NFKC').replaceAll('馮', '冯').trim();
  const term = normalize(query);
  const id = /^p?(\d+)$/.exec(term.replace(/\s+/g, '').toLowerCase());

  return index.filter((person) =>
    (!archiveId || person.archiveIds.includes(archiveId)) &&
    (!term || (id
      ? Number(person.id.slice(1)) === Number(id[1])
      : person.names.some((name) => normalize(name).includes(term)))),
  );
}
