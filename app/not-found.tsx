import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#6c5ce7] opacity-20 blur-[40px] rounded-full" />
        <div className="relative w-20 h-20 rounded-2xl bg-[#12121a] border border-[#1e1e2e] flex items-center justify-center">
          <Home className="w-8 h-8 text-[#6c5ce7]" />
        </div>
      </div>

      <p className="text-sm font-medium text-[#6c5ce7] mb-2">404</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-[#8b8b9e] max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] text-white font-medium hover:opacity-90 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
