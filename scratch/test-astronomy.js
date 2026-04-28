const { GeoVector, Ecliptic, Body, SunPosition } = require('astronomy-engine');

try {
    const date = new Date('2026-10-02T12:00:00Z');
    
    // Sun
    const sunPos = SunPosition(date);
    console.log('Sun Geocentric Elon:', sunPos.elon);

    // Venus
    const venusVec = GeoVector(Body.Venus, date, true);
    const venusEcl = Ecliptic(venusVec);
    console.log('Venus Geocentric Elon:', venusEcl.elon);

} catch (err) {
    console.error('Error during test:', err);
}
