import pages from '../data/archive_pages.json';
import persons from '../data/persons.json';
import relationships from '../data/relationships.json';
import sources from '../data/person_sources.json';
import villages from '../data/villages.json';
import archives from '../data/archives.json';
export { pages, persons, relationships, sources, villages, archives };
export const pageUrl=(id:string,archiveId=pages.find(p=>p.id===id)?.archiveId)=>`/archives/${archiveId}/pages/${id}/`;
export function routes(){return ['/', '/regions/', '/search/', '/archives/', '/about/', ...villages.map(x=>`/villages/${x.id}/`),...archives.map(x=>`/archives/${x.id}/`),...persons.map(x=>`/persons/${x.id}/`),...pages.map(x=>pageUrl(x.id,x.archiveId))];}
