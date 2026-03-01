export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row text-center md:text-left text-sm text-muted-foreground">
                <p>
                    &copy; {new Date().getFullYear()} HealthCalc Pro. All rights reserved.
                </p>
                <p>
                    Disclaimer: This tool is for informational purposes only and does not constitute medical advice.
                </p>
            </div>
        </footer>
    );
}
