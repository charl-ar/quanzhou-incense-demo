import sharp from 'sharp';
import {readdir} from 'node:fs/promises';
const ids=['twin-pagodas','luoyang-bridge','qingyuan-mountain','xunpu-flowers','clock-tower','chongwu-city'];
for(let i=0;i<6;i++){
 const box={left:(i%3)*512,top:Math.floor(i/3)*512,width:512,height:512};
 if(i>1) await sharp('assets/source/concepts-sheet.png').extract(box).webp({quality:90}).toFile(`public/images/${ids[i]}.webp`);
 await sharp('assets/source/process-sheet.png').extract(box).webp({quality:88}).toFile(`public/images/${ids[i]}-process.webp`);
}
await sharp('assets/source/luoyang-bridge.png').resize(1200).webp({quality:90}).toFile('public/images/luoyang-bridge.webp');
await sharp('assets/source/twin-pagodas.png').resize(1120).webp({quality:90}).toFile('public/images/twin-pagodas.webp');
for(const f of await readdir('public/images'))if(f.endsWith('.jpg'))await sharp('public/images/'+f).resize({width:1200,withoutEnlargement:true}).webp({quality:85}).toFile('public/images/'+f.replace('.jpg','.webp'));
console.log('Local assets prepared. No API calls.');
