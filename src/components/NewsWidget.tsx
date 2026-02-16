export default function NewsWidget() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">JobScope News</h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
                    <path fillRule="evenodd" d="M11.25 4.533A2.25 2.25 0 009 6.75v10.5a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.217h-1.5zM11.25 3h1.5A3.75 3.75 0 0116.5 6.75v10.5a3.75 3.75 0 01-3.75 3.75h-1.5a3.75 3.75 0 01-3.75-3.75V6.75A3.75 3.75 0 0111.25 3z" clipRule="evenodd" />
                </svg>
            </div>

            <ul className="space-y-4">
                <NewsItem
                    title="Tech hiring stabilizes in Q1"
                    time="1d ago"
                    readers="10,934 readers"
                />
                <NewsItem
                    title="Remote work trends for 2026"
                    time="12h ago"
                    readers="5,213 readers"
                />
                <NewsItem
                    title="AI in recruitment: What to know"
                    time="3h ago"
                    readers="8,102 readers"
                />
                <NewsItem
                    title="Top skills for developers"
                    time="2d ago"
                    readers="22,456 readers"
                />
            </ul>

            <button className="mt-4 flex items-center text-gray-500 text-xs font-semibold hover:bg-gray-100 p-1 rounded transition-colors">
                Show more <span className="ml-1">▼</span>
            </button>
        </div>
    );
}

function NewsItem({ title, time, readers }: { title: string; time: string; readers: string }) {
    return (
        <li className="cursor-pointer group">
            <div className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></span>
                <div>
                    <h4 className="text-sm font-semibold text-gray-700 group-hover:underline group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {time} • {readers}
                    </p>
                </div>
            </div>
        </li>
    );
}
