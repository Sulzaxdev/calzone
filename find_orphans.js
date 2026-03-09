const fs = require('fs');
const path = require('path');

const calculatorsFile = fs.readFileSync('c:/Users/Sulzax_Dev/Desktop/calzonev2/CalZone/src/lib/calculators.tsx', 'utf8');
const registeredHrefs = Array.from(calculatorsFile.matchAll(/href:\s*"([^"]+)"/g)).map(m => m[1]);

const calculatorsDir = 'c:/Users/Sulzax_Dev/Desktop/calzonev2/CalZone/src/app/(calculators)';
const items = fs.readdirSync(calculatorsDir);

const categoryPages = [
    'automotive',
    'finance-driving',
    'construction-diy',
    'fitness-diet',
    'general-health',
    'home-property',
    'maths-percentages',
    'misc-lifestyle',
    'sleep',
    'uk-stocks-investments'
];

const orphans = items.filter(item => {
    const fullPath = path.join(calculatorsDir, item);
    if (!fs.statSync(fullPath).isDirectory()) return false;
    if (categoryPages.includes(item)) return false;

    // Check if any registered href matches this folder name
    return !registeredHrefs.some(href => href === '/' + item);
});

const brokenLinks = registeredHrefs.filter(href => {
    // These are landing pages, skip them
    if (categoryPages.map(p => '/' + p).includes(href)) return false;
    if (['/general-health', '/fitness-diet', '/finance-driving', '/automotive', '/home-property', '/construction-diy', '/maths-percentages', '/misc-lifestyle', '/sleep', '/uk-stocks-investments'].includes(href)) return false;

    const folderName = href.startsWith('/') ? href.substring(1) : href;
    const folderPath = path.join(calculatorsDir, folderName);
    return !fs.existsSync(folderPath);
});

console.log('Orphan Calculators (Exist on disk, not in registry):');
console.log(JSON.stringify(orphans, null, 2));

console.log('\nBroken Links (Exist in registry, not on disk):');
console.log(JSON.stringify(brokenLinks, null, 2));
