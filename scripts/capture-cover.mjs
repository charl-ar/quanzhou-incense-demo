import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'msedge'});
for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},isMobile:name==='mobile',hasTouch:name==='mobile'});
 await page.goto('http://localhost:4173/');await page.locator('.hero-art img').evaluate(i=>i.decode());await page.screenshot({path:`artifacts/screenshots/home-${name}-viewport.png`});
 await page.getByRole('link',{name:'跳至内容'}).focus();await page.keyboard.press('Enter');if(await page.evaluate(()=>location.hash))throw Error('Skip link changed route');await page.close();
}
await browser.close();
