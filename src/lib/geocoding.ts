export interface CityLocation {
    name: string;
    lat: number;
    lon: number;
    country: string;
}

const COMMON_UK_CITIES: CityLocation[] = [
    { name: "London", lat: 51.5074, lon: -0.1278, country: "United Kingdom" },
    { name: "Manchester", lat: 53.4808, lon: -2.2426, country: "United Kingdom" },
    { name: "Birmingham", lat: 52.4862, lon: -1.8904, country: "United Kingdom" },
    { name: "Glasgow", lat: 55.8642, lon: -4.2518, country: "United Kingdom" },
    { name: "Liverpool", lat: 53.4084, lon: -2.9916, country: "United Kingdom" },
    { name: "Leeds", lat: 53.8008, lon: -1.5491, country: "United Kingdom" },
    { name: "Sheffield", lat: 53.3811, lon: -1.4701, country: "United Kingdom" },
    { name: "Edinburgh", lat: 55.9533, lon: -3.1883, country: "United Kingdom" },
    { name: "Bristol", lat: 51.4545, lon: -2.5879, country: "United Kingdom" },
    { name: "Leicester", lat: 52.6369, lon: -1.1398, country: "United Kingdom" },
];

export async function searchCities(query: string): Promise<CityLocation[]> {
    if (!query || query.length < 3) return [];

    // Check local common cities first
    const localMatches = COMMON_UK_CITIES.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase())
    );

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
            {
                headers: {
                    'User-Agent': 'CalZone-Astrology-Calculator'
                }
            }
        );
        
        if (!response.ok) return localMatches;

        const data = await response.json();
        const apiMatches = data.map((item: any) => ({
            name: item.display_name.split(',')[0],
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            country: item.display_name.split(',').pop().trim()
        }));

        // Merge and remove duplicates
        const seen = new Set();
        return [...localMatches, ...apiMatches].filter(c => {
            const key = `${c.lat.toFixed(2)}-${c.lon.toFixed(2)}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    } catch (error) {
        console.error("Geocoding error:", error);
        return localMatches;
    }
}
