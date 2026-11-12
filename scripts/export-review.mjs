import fs from 'node:fs';import {load} from './validate-data.mjs';
const quote=s=>'"'+String(s??'').replaceAll('"','""')+'"';
const rows=[['personId','originalName','pageId','verification','reviewedName','reviewer','notes'],...load('persons').map(p=>[p.id,p.originalName,load('person_sources').filter(s=>s.personId===p.id).map(s=>s.archivePageId).join(';'),p.verification,'','',''])];
fs.writeFileSync('docs/PERSON_REVIEW.csv','\ufeff'+rows.map(r=>r.map(quote).join(',')).join('\n')+'\n');
