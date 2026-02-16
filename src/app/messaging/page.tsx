"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

// Dummy Conversation Data
const CONVERSATIONS = [
    { id: 1, name: "Sarah Williams", lastMessage: "Thanks for connecting! I'm looking forward to...", time: "2m", unread: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 2, name: "James Miller", lastMessage: "Can we schedule a call for next Tuesday?", time: "1h", unread: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
    { id: 3, name: "Emily Johnson", lastMessage: "I saw your application for the Senior Dev role.", time: "1d", unread: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
    { id: 4, name: "Michael Brown", lastMessage: "Let me know if you have any questions.", time: "2d", unread: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
    { id: 5, name: "David Wilson", lastMessage: "Great article you shared!", time: "3d", unread: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
];

// Dummy Messages
const MESSAGES = [
    { id: 1, sender: "Sarah Williams", text: "Hi there! Thanks for connecting.", time: "10:30 AM", isMe: false },
    { id: 2, sender: "Me", text: "Hi Sarah, great to meet you too! I've been following your work at TechFlow.", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Sarah Williams", text: "That's kind of you to say! I'm actually looking for a frontend developer for my team. Would you be interested in chatting?", time: "10:35 AM", isMe: false },
];

export default function MessagingPage() {
    const [activeConversation, setActiveConversation] = useState(CONVERSATIONS[0]);
    const [messageInput, setMessageInput] = useState("");

    return (
        <div className="bg-[#f3f2ef] pt-6 pb-0 h-[calc(100vh-52px)]">
            <div className="container-custom h-full grid grid-cols-12 gap-6 pb-6">

                {/* Left Column - Conversation List */}
                <aside className="col-span-12 md:col-span-4 lg:col-span-3 bg-white rounded-t-lg shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">

                    {/* Header */}
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
                        <div className="relative flex-1 mr-2">
                            <input
                                type="text"
                                placeholder="Search messages"
                                className="w-full pl-8 pr-3 py-1.5 bg-[#eef3f8] border-none rounded-sm text-sm focus:ring-1 focus:ring-primary outline-none"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500 absolute left-2 top-2">
                                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.387 17.387 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 20.83a18.866 18.866 0 01-.214-4.772 12.754 12.754 0 01-4.339-2.708 9.711 9.711 0 00.945 5.003 17.165 17.165 0 003.608 2.477zM2.515 10.457a17.409 17.409 0 013.159-2.228A18.89 18.89 0 0112 7.746a18.89 18.89 0 016.326.483 17.409 17.409 0 013.159 2.228 17.069 17.069 0 00-4.085-5.325A17.127 17.127 0 0112 5.52a17.127 17.127 0 01-5.405-.388A17.07 17.07 0 002.515 10.457z" />
                                <path d="M11.968 1.46a18.963 18.963 0 00-4.428 0 17.182 17.182 0 012.228 4.632 17.182 17.182 0 012.2-4.632zM7.058 1.948a17.387 17.387 0 00-5.268 0A17.515 17.515 0 002.122 6.595a17.323 17.323 0 005.268 0A17.515 17.515 0 007.058 1.948zM16.942 1.948a17.515 17.515 0 00-.332 4.647 17.323 17.323 0 005.268 0A17.515 17.515 0 0016.942 1.948zM14.659 13.916a18.955 18.955 0 00-5.318 0 15.394 15.394 0 015.318 0z" />
                            </svg>
                        </button>
                        <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-full ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                            </svg>
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto">
                        {CONVERSATIONS.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setActiveConversation(conv)}
                                className={`flex items-start gap-3 p-3 border-l-[3px] cursor-pointer hover:bg-gray-50 transition-colors ${activeConversation.id === conv.id ? 'border-l-[#01754f] bg-[#eef3f8]' : 'border-l-transparent bg-white'}`}
                            >
                                <div className="relative">
                                    <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                                    {conv.unread && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                                </div>
                                <div className="flex-1 min-w-0 pr-1">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className={`text-sm truncate ${conv.unread ? 'font-semibold text-black' : 'font-medium text-gray-900'}`}>{conv.name}</h4>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conv.time}</span>
                                    </div>
                                    <p className={`text-xs truncate ${conv.unread ? 'font-semibold text-black' : 'text-gray-500'}`}>
                                        {conv.id === 1 ? "You: " : ""}{conv.lastMessage}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </aside>

                {/* Right Column - Chat Area */}
                <main className="hidden md:flex col-span-8 lg:col-span-9 bg-white rounded-t-lg shadow-sm border border-gray-200 flex-col h-full overflow-hidden">

                    {/* Chat Header */}
                    <header className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                        <div className="flex flex-col">
                            <h2 className="font-bold text-gray-900 text-sm">{activeConversation.name}</h2>
                            <span className="text-xs text-gray-500">Available on mobile</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a2.63 2.63 0 000 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </header>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                        <div className="text-center text-xs text-gray-400 my-4 uppercase tracking-wider font-semibold">
                            Today
                        </div>
                        {MESSAGES.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                {!msg.isMe && (
                                    <img src={activeConversation.avatar} alt={msg.sender} className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
                                )}
                                <div className={`max-w-[70%] p-3 text-sm ${msg.isMe ? 'bg-[#e2f0fe] text-gray-900 rounded-t-lg rounded-bl-lg' : 'bg-[#f3f2ef] text-gray-900 rounded-t-lg rounded-br-lg'}`}>
                                    <p>{msg.text}</p>
                                    <span className="text-[10px] text-gray-500 block text-right mt-1">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                        <div className="bg-[#f3f2ef] rounded-lg p-2">
                            <textarea
                                rows={2}
                                placeholder="Write a message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none placeholder:text-gray-500"
                            />
                            <div className="flex justify-between items-center mt-2 px-1">
                                <div className="flex gap-2">
                                    <button className="text-gray-500 hover:bg-gray-200 p-1 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-500 hover:bg-gray-200 p-1 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.006.007-.004.005-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" className="rounded-full px-4 font-semibold bg-primary hover:bg-blue-700 h-8">Send</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}
