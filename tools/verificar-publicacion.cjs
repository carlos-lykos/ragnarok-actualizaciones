'use strict';
// Comprobación de transporte: no instala, no ejecuta datos ni prueba semántica.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const MAX = 400 * 1024 * 1024;
const key = fs.readFileSync(path.join(__dirname, '../keys/public.pem'));
const names = {pc: 'ragnarok-pc.rkupdate', android: 'ragnarok-android.rkupdate'};
const hex = /^[a-f0-9]{64}$/;
const assert = (c, m) => { if (!c) throw Error(m); };
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const plain = (v, keys) => v && typeof v === 'object' && !Array.isArray(v) &&
  Object.keys(v).sort().join('|') === keys.slice().sort().join('|');
function read(dir, name, limit) {
  const p = path.join(dir, name), stat = fs.lstatSync(p);
  assert(stat.isFile() && !stat.isSymbolicLink() && stat.size > 0 && stat.size <= limit,
    'Archivo o tamaño no permitido: ' + name);
  return fs.readFileSync(p);
}
function envelope(b) {
  assert(b.length > 0 && b.length <= 32768, 'Manifiesto inválido');
  const e = JSON.parse(b.toString('utf8'));
  assert(plain(e, ['payload','signature']) && typeof e.payload === 'string' && typeof e.signature === 'string', 'Sobre inválido');
  const p = Buffer.from(e.payload, 'base64'), sig = Buffer.from(e.signature, 'base64');
  assert(p.toString('base64') === e.payload && sig.toString('base64') === e.signature &&
    sig.length === 384 && crypto.verify('sha256', p, key, sig), 'Firma inválida');
  const m = JSON.parse(p.toString('utf8'));
  assert(plain(m, ['format','sequence','generation','publishedAt','assets','summary']) &&
    m.format === 'ragnarok-channel-v1' && Number.isSafeInteger(m.sequence) &&
    m.sequence >= 1 && m.sequence <= 2147483647 && hex.test(m.generation) &&
    /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(m.publishedAt) &&
    Number.isFinite(Date.parse(m.publishedAt)) && typeof m.summary === 'string' &&
    m.summary.length <= 1400 && plain(m.assets, Object.keys(names)), 'Contrato inválido');
  for (const k of Object.keys(names)) {
    const a = m.assets[k];
    assert(plain(a, ['name','size','sha256']) && a.name === names[k] &&
      Number.isSafeInteger(a.size) && a.size > 0 && a.size <= MAX && hex.test(a.sha256),
      'Descriptor inválido: ' + k);
  }
  return {m, digest: sha(p)};
}
try {
  const dir = process.argv[2];
  assert(dir && process.argv.length === 3, 'Uso: node tools/verificar-publicacion.cjs CARPETA');
  const {m, digest} = envelope(read(dir, 'ragnarok-channel.json', 32768));
  for (const [k, name] of Object.entries(names)) {
    const b = read(dir, name, MAX + 32780);
    assert(b.length > 12 && b.subarray(0,8).toString() === 'RKUPD001', 'Cabecera inválida: ' + name);
    const n = b.readUInt32LE(8);
    assert(n > 0 && n <= 32768 && b.length > 12 + n, 'Longitud inválida: ' + name);
    const embedded = envelope(b.subarray(12,12+n));
    assert(embedded.digest === digest, 'Manifiestos distintos: ' + name);
    const body = b.subarray(12+n);
    assert(body.length === m.assets[k].size && sha(body) === m.assets[k].sha256,
      'Contenido alterado: ' + name);
    assert(body.subarray(0,8).toString() === (k === 'pc' ? 'RKPCG001' : 'RKMOB001'),
      'Plataforma incorrecta: ' + name);
    console.log('OK: ' + name);
  }
  console.log('OK: firma y ambos paquetes coherentes. Secuencia ' + m.sequence);
  console.log('No acredita corrección editorial, permisos de redistribución ni instalación nativa.');
} catch (e) {
  console.error('NO PUBLICAR: ' + e.message);
  process.exitCode = 1;
}
