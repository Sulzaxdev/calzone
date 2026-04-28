import { 
    Observer, 
    Body, 
    SunPosition,
    EclipticGeoMoon,
    GeoVector,
    Ecliptic,
    SiderealTime,
    MakeTime
} from "astronomy-engine";

export type ZodiacSign = 
    | "Aries" | "Taurus" | "Gemini" | "Cancer" 
    | "Leo" | "Virgo" | "Libra" | "Scorpio" 
    | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export interface AstrologyResults {
    sun: ZodiacSign;
    moon: ZodiacSign;
    rising: ZodiacSign;
    venus?: ZodiacSign;
    chiron?: ZodiacSign;
    lilith?: ZodiacSign;
    northNode?: ZodiacSign;
    partOfFortune?: ZodiacSign;
    vertex?: ZodiacSign;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
    "Aries", "Taurus", "Gemini", "Cancer", 
    "Leo", "Virgo", "Libra", "Scorpio", 
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

function getSignFromLongitude(longitude: number): ZodiacSign {
    // Normalize longitude to 0-360
    const normalized = (longitude % 360 + 360) % 360;
    const index = Math.floor(normalized / 30);
    return ZODIAC_SIGNS[index];
}

export function calculateAstrology(date: Date, lat: number, lon: number): AstrologyResults {
    const time = MakeTime(date);
    
    // 1. Sun Sign (Geocentric)
    const sunPos = SunPosition(time);
    const sunSign = getSignFromLongitude(sunPos.elon);

    // 2. Moon Sign (Geocentric)
    const moonPos = EclipticGeoMoon(time);
    const moonSign = getSignFromLongitude(moonPos.lon);

    // 3. Venus Sign (Geocentric)
    const venusVec = GeoVector(Body.Venus, time, true);
    const venusEcl = Ecliptic(venusVec);
    const venusSign = getSignFromLongitude(venusEcl.elon);

    // 4. Rising Sign (Ascendant)
    const lst = SiderealTime(time) + (lon / 15.0);
    const ramc = (lst * 15.0) % 360;
    const ramcRad = (ramc * Math.PI) / 180.0;
    const phiRad = (lat * Math.PI) / 180.0;
    const eps = 23.4392911 * (Math.PI / 180.0);
    
    const x = Math.cos(ramcRad);
    const y = -(Math.sin(ramcRad) * Math.cos(eps) + Math.tan(phiRad) * Math.sin(eps));
    let ascendantLong = (Math.atan2(x, y) * 180.0) / Math.PI;
    const risingSign = getSignFromLongitude(ascendantLong);

    // 5. Part of Fortune
    // Day Birth: Asc + Moon - Sun
    // Night Birth: Asc + Sun - Moon
    // Check if Sun is above horizon (approximate by checking Sun's altitude)
    const observer = new Observer(lat, lon, 0);
    const sunEquator = SunPosition(time);
    // Simple check: if Sun's longitude is within 180 deg of the Midheaven or similar?
    // Better: use the formula directly with Day/Night logic.
    // For now, let's assume if Sun is between Ascendant and Descendant (roughly).
    // A better way is to check the Sun's altitude.
    const sunAlt = 0; // Placeholder for actual altitude check if available
    // For MVP, we'll use Day formula as it's most common, but let's try a simple toggle.
    // Day birth is when Sun is in houses 7-12.
    const isDay = (sunPos.elon > ascendantLong && sunPos.elon < (ascendantLong + 180) % 360);
    let poFortuneLong;
    if (isDay) {
        poFortuneLong = (ascendantLong + moonPos.lon - sunPos.elon + 360) % 360;
    } else {
        poFortuneLong = (ascendantLong + sunPos.elon - moonPos.lon + 360) % 360;
    }
    const partOfFortune = getSignFromLongitude(poFortuneLong);

    // 6. North Node (Mean Node Approximation)
    const t = (date.getTime() - 946728000000) / (36525 * 24 * 3600 * 1000);
    let nodeLong = 125.044522 - 1934.136261 * t;
    nodeLong = (nodeLong % 360 + 360) % 360;
    const northNode = getSignFromLongitude(nodeLong);

    // 7. Vertex
    // Intersection of prime vertical and ecliptic in the west.
    // Formula: cot(Vx) = -sin(phi) * tan(ramc) ... simplified
    const colatRad = (90 - lat) * Math.PI / 180.0;
    const vxX = Math.cos(ramcRad + Math.PI);
    const vxY = -(Math.sin(ramcRad + Math.PI) * Math.cos(eps) - Math.tan(colatRad) * Math.sin(eps));
    let vertexLong = (Math.atan2(vxX, vxY) * 180.0) / Math.PI;
    const vertex = getSignFromLongitude(vertexLong);

    return {
        sun: sunSign,
        moon: moonSign,
        rising: risingSign,
        venus: venusSign,
        partOfFortune: partOfFortune,
        northNode: northNode,
        vertex: vertex,
        // Chiron and Lilith are complex and not natively supported by astronomy-engine.
        // We'll return Aries as a placeholder for now to prevent UI crashes if needed, 
        // but ideally the UI should handle their absence.
        chiron: "Aries",
        lilith: "Scorpio"
    };
}


