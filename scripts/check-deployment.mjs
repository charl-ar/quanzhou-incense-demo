import {chromium} from '@playwright/test';
import {createServer} from 'node:http';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const root=resolve('artifacts/subpath-build');
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'};
const server=createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!path.startsWith('/quanzhou-incense-demo/'))throw Error();const file=resolve(root,path.slice('/quanzhou-incense-demo/'.length)||'index.html');if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.writeHead(404);res.end('Not found')}});
await new Promise(r=>server.listen(5180,'127.0.0.1',r));
const browser=await chromium.launch({channel:'msedge'});let checks=0;const errors=[];
try{const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 const routes=['/','/gallery','/origins','/studio',...['twin-pagodas','luoyang-bridge','qingyuan-mountain','xunpu-flowers','clock-tower','chongwu-city'].map(id=>'/works/'+id)];
 for(const width of [390,768,1440]){await page.setViewportSize({width,height:1000});for(const route of routes){await page.goto('http://127.0.0.1:5180/quanzhou-incense-demo/#'+route);await page.reload();await page.locator('h1').waitFor();await page.locator('img').evaluateAll(async imgs=>Promise.all(imgs.map(im=>{im.loading='eager';return im.decode()})));if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width+' '+route);const broken=await page.locator('img').evaluateAll(imgs=>imgs.some(im=>!im.naturalWidth));if(broken)throw Error('Broken image');checks++}}
 if(errors.length)throw Error(errors.join('\n'));
 const report={status:'passed',base:'/quanzhou-incense-demo/',routes:routes.length,widths:[390,768,1440],routeRefreshChecks:checks,brokenResources:0,pageErrors:0};await writeFile('artifacts/deployment-check.json',JSON.stringify(report,null,2));console.log(report);
}finally{await browser.close();await new Promise(r=>server.close(r))}
