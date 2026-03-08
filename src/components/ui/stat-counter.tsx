"use client";

import { useEffect, useState, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface StatCounterProps {
    value: number;
    suffix?: string;
    duration?: number;
}

export function StatCounter({ value, suffix = "", duration = 2 }: StatCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: duration,
                ease: [0.16, 1, 0.3, 1], // Custom ease out quint
                onUpdate(v) {
                    setDisplayValue(Math.floor(v));
                },
            });
            return () => controls.stop();
        }
    }, [value, duration, isInView]);

    return (
        <span ref={ref}>
            {displayValue.toLocaleString()}
            {suffix}
        </span>
    );
}
