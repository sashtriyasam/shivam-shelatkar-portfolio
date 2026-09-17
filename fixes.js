const fs = require('fs');

// Fix 2: HeroFallback.tsx
const heroFallback = 'export function HeroFallback() {' + '\n' +
'  return (' + '\n' +
'    <section aria-labelledby= hero-fallback-heading className=hero__fallback>' + '\n' +
'      <h1 id=hero-fallback-heading className=sr-only>Shivam Shelatkar</h1>' + '\n' +
'      <div className=hero__fallback-content>' + '\n' +
'        <p>Founder @Swarvibhaa \u00b7 tabla \u00b7 piano \u00b7 Unity</p>' + '\n' +
'        <div className=hero__fallback-ctas>' + '\n' +
'          <a href=https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10 target=_blank rel=noopener noreferrer className=btn btn-primary>Listen to Raatrani</a>' + '\n' +
'          <a href=/work className=btn btn-outline>See work</a>' + '\n' +
'        </div>' + '\n' +
'      </div>' + '\n' +
'    </section>' + '\n' +
'  );' + '\n' +
'}';
fs.writeFileSync('D:/TESTWEB/components/hero/HeroFallback.tsx', heroFallback);
console.log('HeroFallback.tsx done');
