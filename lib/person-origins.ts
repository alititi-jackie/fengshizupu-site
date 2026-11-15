import { archives, pages, persons, sources, pageUrl } from './data';

const pageById = new Map(pages.map((page) => [page.id, page]));
const archiveById = new Map(archives.map((archive) => [archive.id, archive]));
export const personById = new Map(persons.map((person) => [person.id, person]));

export function personOrigins(id: string) {
  return sources.filter((source) => source.personId === id).flatMap((source) => {
    const page = pageById.get(source.archivePageId);
    const archive = page && archiveById.get(page.archiveId);
    return page && archive ? [{ source, page, archive, href: pageUrl(page.id, archive.id) }] : [];
  });
}
