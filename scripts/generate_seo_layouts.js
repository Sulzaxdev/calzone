const fs = require('fs');
const path = require('path');

const calculatorsFilePath = path.join(process.cwd(), 'src/lib/calculators.tsx');
const appCalculatorsPath = path.join(process.cwd(), 'src/app/(calculators)');

function parseCalculators() {
    const fileContent = fs.readFileSync(calculatorsFilePath, 'utf8');
    const results = {};

    // Simple regex to match: { name: "...", href: "...", desc: "..." }
    const regex = /{[\s\n]*name:[\s\n]*["']([^"']+)["'],[\s\n]*href:[\s\n]*["']([^"']+)["'],[\s\n]*desc:[\s\n]*["']([^"']+)["'][\s\n]*}/g;

    let match;
    while ((match = regex.exec(fileContent)) !== null) {
        const href = match[2];
        const dirName = href.startsWith('/') ? href.substring(1) : href;
        results[dirName] = {
            name: match[1],
            href: href,
            desc: match[3]
        };
    }

    return results;
}

function generateLayoutCode(name, href, desc) {
    const canonicalUrl = href.startsWith('/') ? href : `/${href}`;
    const cleanName = name.replace(/"/g, '\\"');
    const cleanDesc = desc.replace(/"/g, '\\"');

    return `import { Metadata } from "next";

export const metadata: Metadata = {
    title: "${cleanName} | CalZone UK",
    description: "${cleanDesc}",
    alternates: {
        canonical: "${canonicalUrl}"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
`;
}

function generateDefaultLayoutCode(dirName) {
    const titleCaseName = dirName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const canonicalUrl = `/${dirName}`;

    return `import { Metadata } from "next";

export const metadata: Metadata = {
    title: "${titleCaseName} | CalZone UK",
    description: "Free UK specialist calculator for ${titleCaseName}. Get instant, accurate results tailored for the UK.",
    alternates: {
        canonical: "${canonicalUrl}"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
`;
}

async function main() {
    let generatedCount = 0;

    const knownCalculators = parseCalculators();

    const dirs = fs.readdirSync(appCalculatorsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log(`Found ${dirs.length} total calculator directories.`);

    for (const dirName of dirs) {
        const calcDir = path.join(appCalculatorsPath, dirName);
        const layoutPath = path.join(calcDir, 'layout.tsx');
        const pagePath = path.join(calcDir, 'page.tsx');

        // Check if layout.tsx already exists
        if (fs.existsSync(layoutPath)) {
            continue;
        }

        // Check if page.tsx already exports metadata
        let hasPageMetadata = false;
        if (fs.existsSync(pagePath)) {
            const pageContent = fs.readFileSync(pagePath, 'utf8');
            if (pageContent.includes('export const metadata') || pageContent.includes('export async function generateMetadata')) {
                hasPageMetadata = true;
            }
        }

        if (!hasPageMetadata) {
            console.log(`Generating layout.tsx for directory: ${dirName}`);

            const calcData = knownCalculators[dirName];
            let layoutCode;

            if (calcData) {
                layoutCode = generateLayoutCode(calcData.name, calcData.href, calcData.desc);
            } else {
                console.log(`  -> Notice: Directory '${dirName}' not found in calculators.tsx. Using default metadata.`);
                layoutCode = generateDefaultLayoutCode(dirName);
            }

            fs.writeFileSync(layoutPath, layoutCode, 'utf8');
            generatedCount++;
        }
    }

    console.log(`\\nFinished: Generated ${generatedCount} layout(s) for the rest of the site.`);
}

main().catch(console.error);
