"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type AIMatchCircleProps = {
    score: number;
};

export default function AIMatchCircle({ score }: AIMatchCircleProps) {
    const radius = 60;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
        circumference - (score / 100) * circumference;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
                AI Match Score
            </h2>

            <svg height={radius * 2} width={radius * 2}>
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#3b82f6"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>

            <p className="text-2xl font-bold text-blue-600 mt-4">
                {score}%
            </p>
        </div>
    );
}