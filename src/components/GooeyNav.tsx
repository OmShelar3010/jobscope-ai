"use client";

import Link from "next/link";
import { useState } from "react";

interface GooeyNavItem {
    label: string;
    href: string;
}

interface GooeyNavProps {
    items: GooeyNavItem[];
    initialActiveIndex?: number;
}

export default function GooeyNav({
    items,
    initialActiveIndex = 0,
}: GooeyNavProps) {
    const [active, setActive] = useState(initialActiveIndex);

    return (
        <div className="flex gap-8 bg-blue-50 px-6 py-3 rounded-full shadow-inner">
            {items.map((item, index) => (
                <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActive(index)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${active === index
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-blue-600 hover:bg-blue-100"
                        }`}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}
