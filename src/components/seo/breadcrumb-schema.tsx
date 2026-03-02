type BreadcrumbItem = {
    name: string;
    item: string; // The URL path
};

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const defaultUrl = "https://www.thecalzone.co.uk";

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": `${defaultUrl}${crumb.item.startsWith('/') ? crumb.item : `/${crumb.item}`}`
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
