const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        if (fs.statSync(file).isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Users/Sulzax_Dev/Desktop/calzone/CalZone/src/app/(calculators)');
const targetPhrases = ["Export PDF", "Save Quote", "Download Report"];

let updatedCount = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    let buttonRegex = /<Button\b([^>]*)>/g;
    let match;
    let newContent = "";
    let lastIndex = 0;

    while ((match = buttonRegex.exec(original)) !== null) {
        newContent += original.substring(lastIndex, match.index);
        let buttonProps = match[1];
        
        // Find the matching closing </Button>
        let closeIdx = original.indexOf('</Button>', match.index);
        if (closeIdx !== -1) {
            let innerText = original.substring(match.index, closeIdx);
            
            let hasTarget = targetPhrases.some(phrase => innerText.includes(phrase)) && !innerText.includes('<strong') && !innerText.includes('disabled');
            
            if (hasTarget && !buttonProps.includes('onClick')) {
                newContent += `<Button onClick={() => window.print()}${buttonProps}>`;
            } else {
                newContent += match[0];
            }
        } else {
            newContent += match[0];
        }
        lastIndex = match.index + match[0].length;
    }
    newContent += original.substring(lastIndex);

    if (newContent !== original) {
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${file}`);
        updatedCount++;
    }
}
console.log(`Updated ${updatedCount} files.`);
