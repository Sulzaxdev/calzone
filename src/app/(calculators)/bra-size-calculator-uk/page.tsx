import { Metadata } from 'next';
import { BraSizeCalculatorForm } from './calculator';

export const metadata: Metadata = {
    title: 'Bra Size Calculator UK, US, EU & AU | Sister Sizes & Converter',
    description: 'Highly accurate Bra Size Calculator supporting UK, US, EU, and AU sizing. Calculate your perfect fit, sister sizes, and view pregnancy or weight adjustments alongside an expert measuring guide.',
    keywords: ['bra size calculator uk', 'bra size converter', 'sister size calculator', 'how to measure bra size', 'pregnancy bra size', 'eu to uk bra size'],
};

export default function BraSizePage() {
    return (
        <div className="animate-in fade-in duration-700 pb-20 object-contain">
            {/* SEO Hidden H1 */}
            <h1 className="sr-only">Bra Size Calculator UK</h1>

            <BraSizeCalculatorForm />

            {/* Content Section below calculator */}
            <section className="mt-16 max-w-7xl mx-auto space-y-16 animate-in fade-in transition-all duration-700">
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">Comprehensive Bra Fitting Guide</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Measuring Guide */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                <span>📐</span> How to Measure
                            </h3>
                            <div className="space-y-4 text-slate-600 dark:text-slate-300">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 flex gap-2">
                                        <span className="text-primary">1.</span> Underbust (Band Size)
                                    </h4>
                                    <p className="text-sm mt-2 leading-relaxed">Wrap the measuring tape snugly around your ribcage, directly beneath your bust where the bra band normally sits. Ensure the tape is strictly parallel to the floor. Exhale slightly to get your resting measurement.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 flex gap-2">
                                        <span className="text-primary">2.</span> Bust (Cup Volume)
                                    </h4>
                                    <p className="text-sm mt-2 leading-relaxed">Wrap the tape loosely over the fullest part of your breasts (usually across the nipples). Do not pull tight or let the tape slide down your back. (For highest accuracy, you can take a leaning measurement).</p>
                                </div>
                            </div>
                        </div>

                        {/* Fit Checklist */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                <span>✨</span> The Perfect Fit Checklist
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                                <li className="flex gap-3 items-start">
                                    <div className="mt-0.5 min-w-[20px] text-green-500 font-bold">✓</div>
                                    <span><strong>The Band:</strong> Provides 80% of the entire support. It should be perfectly snug, sit horizontally across your back, and you should only be able to fit exactly two fingers forcefully underneath.</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="mt-0.5 min-w-[20px] text-green-500 font-bold">✓</div>
                                    <span><strong>The Gore (Center):</strong> The center bridge between the cups must lie completely, solidly flat against your sternum (breastbone).</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="mt-0.5 min-w-[20px] text-green-500 font-bold">✓</div>
                                    <span><strong>The Cups:</strong> Breasts should be fully enclosed without spilling over the top edge (quad-boob effect), sides, or leaving empty wrinkled pockets in the fabric.</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="mt-0.5 min-w-[20px] text-green-500 font-bold">✓</div>
                                    <span><strong>The Straps:</strong> Should stay securely on your shoulders without digging painfully into your skin or constantly slipping off.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-10 border-slate-200 dark:border-slate-800" />

                    {/* Common Mistakes */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Common Fitting Issues & Solutions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-2xl border border-red-100 dark:border-red-900/30">
                                <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Band riding up your back?</h4>
                                <p className="text-red-600/80 dark:text-red-300/80">Your band size is too large or straps are too tight. Try your tighter <strong>Sister Size</strong> for much better foundational support.</p>
                            </div>
                            <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-2xl border border-red-100 dark:border-red-900/30">
                                <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Spillage over the cups?</h4>
                                <p className="text-red-600/80 dark:text-red-300/80">Your cup volume is too small. Try going up one or two cup letters while keeping the exact same band size.</p>
                            </div>
                            <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-2xl border border-red-100 dark:border-red-900/30 sm:col-span-2 lg:col-span-1">
                                <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Straps digging into shoulders?</h4>
                                <p className="text-red-600/80 dark:text-red-300/80">The band isn't carrying the weight properly. Most likely, the band is too loose, forcing straps to overcompensate.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-12 border-slate-200 dark:border-slate-800" />

                {/* Extensive New Content Section to extend page length */}
                <div className="space-y-12">

                    {/* News & Industry Trends */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Latest News & Innovations in Lingerie Sizing</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <article className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-lg text-primary mb-3">The Rise of AI in Bra Fitting</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    Recent advancements in 2026 have seen major retailers adopting advanced AI-driven 3D body scanning through mobile apps. Rather than relying solely on traditional cloth tape measures, highly sophisticated algorithms can now map over 100 micro-measurements on a woman's torso to recommend not just a standardized size, but exact brand-specific models that suit specific breast densities and shapes. This dramatically reduces return rates from 30% down to under 5%.
                                </p>
                            </article>
                            <article className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-lg text-primary mb-3">Sustainable Materials Revolution</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    The lingerie industry is experiencing a massive shift toward eco-friendly fabrications. Brands are moving away from virgin polyesters and turning to highly engineered recycled nylons, bamboo cellulose, and even biodegradable elastane alternatives. Interestingly, these new materials often possess superior shape-retention characteristics, meaning bands stretch out much slower than traditional spandex blends, increasing the lifespan of the garment considerably.
                                </p>
                            </article>
                        </div>
                    </section>

                    {/* In-Depth Sister Sizing Explanation */}
                    <section className="bg-primary/5 dark:bg-primary/10 p-8 md:p-10 rounded-3xl border border-primary/20">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">The Secret Geometry of 'Sister Sizes'</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            Sister sizing is often the most misunderstood concept in the lingerie world. A cup letter (like 'D') does <strong>not</strong> represent a static volume of breast tissue. It represents a <em>ratio</em> between your underbust and your bust. Therefore, the cup on a 32D is significantly smaller in actual physical volume than the cup on a 38D.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            If you try on a 34C and the cups fit perfectly but the band is painfully tight, you cannot simply go to a 36C. A 36C has a larger band <strong>and</strong> a larger cup volume. To keep the exact same cup volume but increase the band, you must go <em>down</em> a cup letter. Your sister size is <strong>36B</strong>.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                                <thead className="bg-slate-200/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200">
                                    <tr>
                                        <th className="p-3 rounded-tl-lg">Smaller Band, Larger Cup</th>
                                        <th className="p-3 bg-primary/10">Base Size (Same Volume)</th>
                                        <th className="p-3 rounded-tr-lg">Larger Band, Smaller Cup</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <td className="p-3">30E (UK)</td>
                                        <td className="p-3 font-bold text-primary">32DD (UK)</td>
                                        <td className="p-3">34D (UK)</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <td className="p-3">34FF (UK)</td>
                                        <td className="p-3 font-bold text-primary">36F (UK)</td>
                                        <td className="p-3">38E (UK)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">38G (UK)</td>
                                        <td className="p-3 font-bold text-primary">40FF (UK)</td>
                                        <td className="p-3">42F (UK)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Why Size Fluctuates */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-4">Why Does My Size Keep Changing?</h2>
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200">1. Hormonal Cycles & Water Retention</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pb-4">
                                Breast tissue is incredibly sensitive to hormonal fluctuations, specifically estrogen and progesterone. During the luteal phase of the menstrual cycle (the days leading up to menstruation), increased progesterone causes milk glands to swell and the body to retain water. This can temporarily increase breast size by up to a full cup letter. Many experts recommend owning "baseline" bras and slightly larger "time of the month" bras.
                            </p>

                            <h3 className="font-bold text-slate-800 dark:text-slate-200">2. Weight Fluctuations</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pb-4">
                                Breasts are composed of a mixture of glandular tissue, connective tissue, and adipose (fat) tissue. The ratio varies wildly from person to person. If you have a high ratio of adipose tissue, losing or gaining even 5-10 lbs (2-4 kg) can drastically alter your cup volume and band size.
                            </p>

                            <h3 className="font-bold text-slate-800 dark:text-slate-200">3. Brand Sizing Inconsistencies</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pb-4">
                                Unlike shoes or measurements in inches, the lingerie industry has never successfully standardized sizing universally. A 34DD in a French luxury brand will often fit dramatically smaller than a 34DD from a mainstream US mall retailer. You have a "size range" rather than one static definitive size.
                            </p>
                        </div>
                    </section>

                    <hr className="my-12 border-slate-200 dark:border-slate-800" />

                    {/* Bra Care & Lifespan */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">How to Care For Your Investment</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            High-quality lingerie is expensive. Proper care can extend the life of a bra from a mere 3-6 months up to a year or more. Poor care destroys the delicate elastane fibers that provide support.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl">
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Do's ✅</h3>
                                <li className="flex gap-2 items-start">
                                    <span className="text-green-500">•</span>
                                    <span><strong>Hand Wash when possible:</strong> Use cool water and a mild detergent meant for delicates. Soak for 10-15 minutes, gently rinse.</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <span className="text-green-500">•</span>
                                    <span><strong>Use a Lingerie Bag:</strong> If machine washing is necessary, clasp the back hooks so they don't snag other lace, place it in a structured mesh bag, and strictly use the delicate/cold cycle.</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <span className="text-green-500">•</span>
                                    <span><strong>Air Dry Flat:</strong> Gently press water out (do not wring) and lay flat on a towel, or hang by the center gore so the straps do not stretch out under the weight of wet fabric.</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <span className="text-green-500">•</span>
                                    <span><strong>Rotate Your Bras:</strong> Never wear the same bra two days in a row. Elastic needs 24-48 hours of "rest" to fully bounce back to its original contracted state. </span>
                                </li>
                            </ul>

                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 p-6 rounded-2xl">
                                <h3 className="font-bold text-red-700 dark:text-red-400 text-lg border-b border-red-100 dark:border-red-900/30 pb-2 mb-4">Don'ts ❌</h3>
                                <li className="flex gap-2 items-start">
                                    <span className="text-red-500">•</span>
                                    <span><strong>NEVER Put in the Dryer:</strong> The intense heat permanently destroys spandex, lycra, and elastane, completely removing the "stretch and snap" that supports you. Hot water washing does the same.</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <span className="text-red-500">•</span>
                                    <span><strong>Don't Invert Molded Cups:</strong> Flipping one cup inside the other to store them breaks down the foam molding structure and creates permanent unsightly creases.</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <span className="text-red-500">•</span>
                                    <span><strong>Don't Use Fabric Softener:</strong> Fabric softeners coat the fibers in a waxy residue. This severely degrades athletic/stretch fabrics and ruins moisture-wicking capabilities.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <hr className="my-12 border-slate-200 dark:border-slate-800" />

                    {/* Bra Styles Guide */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Matching the Style to Your Shape</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            Being correctly sized is only half the battle. If your breast *shape* (e.g., shallow/tall roots, projected, full-on-bottom, wide-set) contradicts the bra's *construction*, it will never fit correctly, even in the perfect size.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-card/50">
                                <h4 className="font-bold text-lg text-primary mb-2">Balconette (Balcony)</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Features wider-set straps and a lower horizontal cup cut. <strong>Best for:</strong> People with less volume at the top of their breasts (full-on-bottom) or wider set breasts. Provides excellent lift without full coverage.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-card/50">
                                <h4 className="font-bold text-lg text-primary mb-2">Plunge</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Features a deeply cut center gore (the wire connecting the cups) creating a V-shape. <strong>Best for:</strong> Low cut tops, and highly recommended for people whose breast tissue is very close together in the center, preventing the gore from painfully digging into breast tissue.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-card/50">
                                <h4 className="font-bold text-lg text-primary mb-2">T-Shirt / Molded Seamless</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Smooth, pre-formed foam cups holding their own shape. <strong>Best for:</strong> Invisibility under thin clothing. <strong>Warning:</strong> Because the shape is rigid, if your breasts don't exactly match the pre-defined template of the foam, it will gap wildly or cut into your tissue.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-card/50">
                                <h4 className="font-bold text-lg text-primary mb-2">Unlined Seamed Multi-part</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Made of 3 or 4 fabric panels sewn together, usually lace or mesh without padding. <strong>Best for:</strong> Larger cup sizes (E-K cups). The seams provide incredible structural engineering and lift that a single piece of molded foam simply cannot achieve. Accommodates highly projected shapes easily.
                                </p>
                            </div>
                        </div>
                    </section>

                    <hr className="my-12 border-slate-200 dark:border-slate-800" />

                    {/* Detailed FAQ */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex gap-2"><span className="text-primary">Q:</span> Is it bad to sleep in a bra?</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                    A: Medically, there is no evidence that sleeping in an underwire or soft bra is inherently dangerous or causes illness. However, it can restrict lymphatic drainage if too tight, and wire irritation can negatively impact sleep quality. Many people prefer soft, wire-free bralettes or sleep singlets simply for comfort and minimal support.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex gap-2"><span className="text-primary">Q:</span> Why do UK brands have sizes like FF and GG, but US brands don't?</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                    A: The United Kingdom uses a highly standardized, predictable 1-inch increment sizing system past a D cup (DD, E, F, FF, G, GG, H, HH, etc.), making it superior for larger busts. The United States market never formalized a standard past DD. Some US brands go D, DD, DDD, DDDD. Others go D, DD, F, G, H. If you are above a DD, it is highly recommended to determine your UK size and shop from UK brands (like Panache, Freya, Elomi) which are widely available internationally.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex gap-2"><span className="text-primary">Q:</span> Should I measure while wearing a bra or bare-chested?</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                    A: You should ideally measure while unpadded, bare-chested, or wearing your thinnest, most non-restrictive bralette. If your breasts are pendulous (point downward, loss of volume on top), measuring bare-chested while leaning forward 90 degrees allows gravity to simulate the volume displacement as if supported by a bra.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>

            </section>
        </div>
    );
}
