const fs = require('fs');
const path = require('path');

const appCalculatorsPath = path.join(process.cwd(), 'src/app/(calculators)');

function generateOrganicContent(dirName) {
    const titleCaseName = dirName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return `
            {/* SEO Content Section */}
            <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
                <hr className="my-8 border-slate-200 dark:border-slate-800" />
                <h2 className="text-2xl font-bold mb-4">Understanding the ${titleCaseName}</h2>
                <p>
                    Using a <strong>${titleCaseName}</strong> is essential for getting accurate, real-time data tailored for the UK. 
                    Whether you are planning your finances, tracking your health, or organizing your lifestyle outlays, 
                    our tool provides instant, reliable results based on the latest UK standards.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Why Accuracy Matters</h3>
                <p>
                    It is crucial to rely on up-to-date figures. Small miscalculations can lead to incorrect planning. 
                    This calculator is designed with precision in mind, ensuring you get the most accurate estimate possible 
                    without dealing with complex manual formulas.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">How to Use This Tool</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>Input your specific details into the fields provided above.</li>
                    <li>Ensure all information is accurate to the best of your knowledge.</li>
                    <li>Click calculate to instantly see your tailored results.</li>
                    <li>Adjust the inputs as needed to compare different scenarios.</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
                    <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">Disclaimer</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                        While we strive for 100% accuracy, this tool is designed for informational and educational purposes only. 
                        It should not be considered as certified professional advice. Always consult with a qualified professional 
                        for major financial or health-related decisions.
                    </p>
                </div>
            </div>`;
}

async function main() {
    let modifiedCount = 0;

    const dirs = fs.readdirSync(appCalculatorsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log(`Checking ${dirs.length} calculators for thin content...`);

    for (const dirName of dirs) {
        const pagePath = path.join(appCalculatorsPath, dirName, 'page.tsx');

        if (!fs.existsSync(pagePath)) continue;

        let pageContent = fs.readFileSync(pagePath, 'utf8');

        const isThinContent = !pageContent.includes('Understanding the') && !pageContent.includes('<h2>') && pageContent.includes('</CalculatorCard>');

        if (isThinContent) {
            console.log(`Enhancing thin content for: ${dirName}`);

            const organicContent = generateOrganicContent(dirName);

            // To ensure valid JSX, we need to wrap the return statement in a fragment if it isn't already.
            // Safest way without a full AST parser:
            // Find "return (" and replace with "return ( <>"
            // Find the last ");" and replace with "</> );"
            // We'll inject the content right before the last closing tag.

            // Actually, an even safer regex for purely formatting the returned component:
            // Most pages use `<div className="container..."><CalculatorCard>...</CalculatorCard></div>`
            // If we inject inside the top level container, we don't break JSX.

            // Let's find: </CalculatorCard>
            // Replace with: </CalculatorCard> \n {organicContent}
            // BUTONLY IF IT'S WRAPPED IN A DIV. The previous pages like `double-glazing` returned `<CalculatorCard>` directly.

            // If it returns `<CalculatorCard>` directly:
            const returnRegex = /return\s*\(\s*<CalculatorCard/;
            if (returnRegex.test(pageContent)) {
                // It returns CalculatorCard itself. We MUST wrap it.
                pageContent = pageContent.replace(/return\s*\(\s*<CalculatorCard/, 'return (\\n        <>\\n            <CalculatorCard');

                const lastIdx = pageContent.lastIndexOf('</CalculatorCard>');
                if (lastIdx !== -1) {
                    const before = pageContent.substring(0, lastIdx + '</CalculatorCard>'.length);
                    const after = pageContent.substring(lastIdx + '</CalculatorCard>'.length);
                    pageContent = before + '\\n' + organicContent + '\\n        </>' + after;
                }
                fs.writeFileSync(pagePath, pageContent, 'utf8');
                modifiedCount++;
            } else {
                // It's wrapped in a <div className="container...
                const lastIdx = pageContent.lastIndexOf('</CalculatorCard>');
                if (lastIdx !== -1) {
                    const before = pageContent.substring(0, lastIdx + '</CalculatorCard>'.length);
                    const after = pageContent.substring(lastIdx + '</CalculatorCard>'.length);
                    pageContent = before + '\\n' + organicContent + '\\n' + after;
                    fs.writeFileSync(pagePath, pageContent, 'utf8');
                    modifiedCount++;
                }
            }
        }
    }

    console.log(`\\nFinished: Enhanced ${modifiedCount} calculators with organic SEO content.`);
}

main().catch(console.error);
