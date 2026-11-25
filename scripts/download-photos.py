import urllib.request, urllib.parse, json, re, concurrent.futures
from pathlib import Path
items={'twin-pagodas':'20230129 Twin pagodas of Kaiyuan Temple.jpg','luoyang-bridge':'20230130 Luoyang Bridge 02.jpg','qingyuan-mountain':'20231021 Statue of Laozi in the Qingyuan Mountain.jpg','xunpu-flowers':'蟳埔女1.jpg','clock-tower':'20230129 Clock tower of Quanzhou 01.jpg','chongwu-city':'Chongwu Ancient City wall 20170727.jpg'}
def req(u):return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'QuanzhouIncenseDesignDemo/1.0 educational local prototype'}),timeout=60)
def download(item):
 id,title=item
 u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode({'action':'query','titles':'File:'+title,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1000,'format':'json'})
 p=next(iter(json.load(req(u))['query']['pages'].values()))['imageinfo'][0]; m=p['extmetadata']
 url=p.get('thumburl',p['url']).split('?')[0]
 try: data=req(url).read()
 except: data=req(p['url'].split('?')[0]).read()
 Path('public/images/'+id+'-real.jpg').write_bytes(data)
 print(id,len(data))
 return {'id':id,'title':title,'author':re.sub('<[^>]+>','',m.get('Artist',{}).get('value','Unknown')),'license':m['LicenseShortName']['value'],'licenseUrl':m.get('LicenseUrl',{}).get('value','https://creativecommons.org/publicdomain/zero/1.0/'),'url':p['descriptionurl']}
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: credits=list(pool.map(download,items.items()))
Path('public/images/credits.json').write_text(json.dumps(credits,ensure_ascii=False,indent=2),encoding='utf-8')

