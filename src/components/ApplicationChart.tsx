"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Mon", applications: 0 },
    { day: "Tue", applications: 1 },
    { day: "Wed", applications: 2 },
    { day: "Thu", applications: 1 },
    { day: "Fri", applications: 3 },
    { day: "Sat", applications: 0 },
    { day: "Sun", applications: 2 },
];

export default function ApplicationChart() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">
                Application Activity
            </h3>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="#2563eb"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}