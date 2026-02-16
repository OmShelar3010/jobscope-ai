import Link from "next/link";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-52px)] flex-col bg-white">
      <main className="flex-1">
        <section className="container-custom py-12 md:py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] leading-[1.2] font-light text-[#8f5849] font-heading">
              Welcome to your professional community
            </h1>

            <div className="space-y-4">
              <Link href="/login" className="block w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-full border-primary text-primary hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all font-semibold">
                  Sign in with email
                </Button>
              </Link>

              <div className="text-sm text-gray-500 font-medium px-2">
                New to JobScope? <Link href="/signup" className="text-primary hover:underline">Join now</Link>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/jobs">
                <Button variant="ghost" size="lg" className="px-8 py-6 text-lg rounded-md bg-[#f3f2ef] hover:bg-[#ebebeb] text-gray-600 font-semibold w-full sm:w-auto justify-between group">
                  Search for a new job
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2 text-gray-500 group-hover:text-gray-700">
                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              {/* Abstract geometric representation of a professional network */}
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90">
                <circle cx="250" cy="250" r="200" fill="#f3f2ef" />
                <circle cx="250" cy="250" r="150" fill="white" stroke="#e0e0e0" strokeWidth="2" />

                {/* Connection Dots */}
                <circle cx="250" cy="150" r="15" fill="#0a66c2" />
                <circle cx="350" cy="250" r="15" fill="#0a66c2" />
                <circle cx="250" cy="350" r="15" fill="#0a66c2" />
                <circle cx="150" cy="250" r="15" fill="#0a66c2" />

                <path d="M250 150 L350 250 L250 350 L150 250 Z" stroke="#0a66c2" strokeWidth="2" fill="none" opacity="0.5" />

                <circle cx="250" cy="250" r="40" fill="#0b65c2" opacity="0.1" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0a66c2" fontSize="24" fontWeight="bold">JobScope</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Value Props / Features simplified */}
        <section className="bg-[#f3f2ef] py-16 md:py-24">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-light text-[#8f5849] mb-12">
              Find the right job or internship for you
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Engineering', 'Business Development', 'Finance', 'Administrative Assistant', 'Retail Associate', 'Customer Service', 'Operations', 'Information Technology', 'Marketing', 'Human Resources'].map((tag) => (
                <div key={tag} className="bg-white px-6 py-4 rounded-full border border-gray-300 font-semibold text-gray-600 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors shadow-sm">
                  {tag}
                </div>
              ))}
              <div className="bg-white px-6 py-4 rounded-full border border-gray-300 font-semibold text-primary hover:bg-blue-50 hover:border-primary cursor-pointer transition-colors shadow-sm flex items-center group">
                Show more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.16 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Short Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="flex gap-4 mb-4 md:mb-0">
            <span className="font-bold text-gray-700">JobScope AI © 2026</span>
            <Link href="#" className="hover:text-primary hover:underline">User Agreement</Link>
            <Link href="#" className="hover:text-primary hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary hover:underline">Community Guidelines</Link>
          </div>
          <div>
            Language: <span className="font-semibold text-gray-700">English</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
