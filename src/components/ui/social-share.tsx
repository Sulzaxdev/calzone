"use client";

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function SocialShare({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);

    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        setShareUrl(window.location.href);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            name: "Facebook",
            icon: <Facebook className="w-4 h-4" />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            color: "hover:bg-blue-600 hover:text-white"
        },
        {
            name: "Twitter",
            icon: <Twitter className="w-4 h-4" />,
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
            color: "hover:bg-sky-500 hover:text-white"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="w-4 h-4" />,
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`,
            color: "hover:bg-blue-700 hover:text-white"
        }
    ];

    return (
        <div className="flex items-center gap-2 mt-8">
            <span className="text-sm font-bold text-slate-500 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share this tool:
            </span>
            <div className="flex gap-2">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg border border-slate-200 dark:border-slate-800 transition-all ${link.color}`}
                        title={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </a>
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCopy}
                    title="Copy Link"
                >
                    {copied ? <span className="text-[10px] font-bold">Copied!</span> : <LinkIcon className="w-4 h-4" />}
                </Button>
            </div>
        </div>
    );
}
