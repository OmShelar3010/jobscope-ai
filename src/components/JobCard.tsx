import Link from "next/link";
import { Button } from "./Button";

interface JobCardProps {
    title: string;
    company: string;
    location: string;
    type: string;
    postedAt: string;
    logoUrl?: string;
    id: string;
}

export default function JobCard({
    title,
    company,
    location,
    type,
    postedAt,
    logoUrl,
    id
}: JobCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow transition-shadow">
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    {logoUrl ? (
                        <img src={logoUrl} alt={`${company} logo`} className="w-12 h-12 object-contain rounded" />
                    ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-500 font-bold text-lg">
                            {company.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <Link href={`/jobs/${id}`} className="hover:underline decoration-primary">
                        <h3 className="font-semibold text-primary text-lg leading-tight">{title}</h3>
                    </Link>
                    <div className="text-sm text-gray-900 mt-1">{company}</div>
                    <div className="text-sm text-gray-500 mt-0.5">
                        {location} · <span className="text-green-600 font-medium">{type}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                        Posted {postedAt}
                    </div>
                </div>
                <div>
                    <Button variant="outline" size="sm" className="rounded-full px-4 text-primary border-primary hover:bg-blue-50">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
