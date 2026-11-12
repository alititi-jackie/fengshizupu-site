import test from 'node:test';import assert from 'node:assert/strict';import {validate,load} from '../scripts/validate-data.mjs';
const fixture=()=>Object.fromEntries(['regions','villages','archives','archive_pages','persons','relationships','person_sources'].map(n=>[n,load(n)]));
test('real data and original hashes are valid',()=>assert.deepEqual(validate(fixture(),true),[]));
test('reject parent cycle',()=>{const d=fixture();d.relationships.push({...d.relationships[0],id:'rel999999',fromPersonId:'p000002',toPersonId:'p000001'});assert(validate(d).some(e=>e.includes('cycle')))});
test('reject self relation',()=>{const d=fixture();d.relationships[0].toPersonId='p000001';assert(validate(d).some(e=>e.includes('self')))});
test('reject missing source and duplicate IDs',()=>{const d=fixture();d.person_sources=[];d.persons.push(d.persons[0]);const e=validate(d);assert(e.some(e=>e.includes('missing source')));assert(e.some(e=>e.includes('duplicate')))});
test('reject bad evidence and duplicate sequence',()=>{const d=fixture();d.relationships[0].evidencePageIds=['pg999999'];d.archive_pages[1].sequence=1;const e=validate(d);assert(e.some(e=>e.includes('invalid evidence')));assert(e.some(e=>e.includes('duplicate sequence')))});
