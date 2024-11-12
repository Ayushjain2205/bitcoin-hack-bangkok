import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/icon.svg"
                alt="NPC.ai Logo"
                width={64}
                height={64}
                className="w-12 h-12"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                NPC.ai
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/create"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                Create
              </Link>
              <Link
                href="/explore"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                Explore
              </Link>
              <Link
                href="/docs"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                Docs
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-sm">
                Log In
              </Button>
              <Button className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
