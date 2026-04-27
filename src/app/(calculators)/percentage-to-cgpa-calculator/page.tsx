import PercentageToCGPACalculator from "./calculator";

export default function PercentToCgpaPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <PercentageToCGPACalculator />
            </div>
        </div>
    );
}
