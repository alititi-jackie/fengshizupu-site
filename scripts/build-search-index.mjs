import fs from 'node:fs';import {load} from './validate-data.mjs';
const pages=load('archive_pages'),sources=load('person_sources');
fs.writeFileSync('data/search-index.json',JSON.stringify(load('persons').map(p=>({id:p.id,originalName:p.originalName,verification:p.verification,names:[p.originalName,p.normalizedName,...p.aliases],archiveIds:[...new Set(sources.filter(s=>s.personId===p.id).map(s=>pages.find(x=>x.id===s.archivePageId).archiveId))]})),null,2)+'\n');
