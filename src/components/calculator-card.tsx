"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CalculatorCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function CalculatorCard({ title, description, children }: CalculatorCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl mx-auto w-full my-8 px-4 sm:px-0"
        >
            <Card className="border-t-4 border-t-primary shadow-xl overflow-hidden bg-card/80 backdrop-blur-md">
                <CardHeader className="text-center space-y-2 pb-6 bg-muted/30">
                    <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-muted-foreground">{description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    {children}
                </CardContent>
            </Card>
        </motion.div>
    );
}
