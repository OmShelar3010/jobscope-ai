import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
        Find Your Dream Job with AI
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        JobScope AI analyzes your skills and interests to recommend the perfect job opportunities for you.
      </p>

      <div className="flex space-x-4">
        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
        >
          Get Started
        </Link>
        <Link
          href="/jobs"
          className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-8 rounded-full border border-gray-300 transition duration-300"
        >
          Browse Jobs
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
          <p className="text-gray-600">Our AI matches your profile with job requirements accurately.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Career Growth</h3>
          <p className="text-gray-600">Find roles that help you advance in your career path.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Privacy First</h3>
          <p className="text-gray-600">Your data is secure and used only to find you jobs.</p>
        </div>
      </div>
    </div>
  );
}
