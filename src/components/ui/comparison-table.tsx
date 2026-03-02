import React from "react";

export interface ComparisonTableProps {
    title?: string;
    headers: React.ReactNode[];
    rows: React.ReactNode[][];
}

export function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
    return (
        <div className="my-10 space-y-4">
            {title && <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{title}</h3>}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-slate-50 dark:bg-slate-900/80 backdrop-blur-sm">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="p-5 font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950/40">
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/60 transition-colors">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className={`p-5 align-top ${cellIndex === 0 ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'} leading-relaxed`}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
