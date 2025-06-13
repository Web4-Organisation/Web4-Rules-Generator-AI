import GuildelinesGenerator from "@/components/GuildelinesGenerator";
import { LogoIcon } from "@/components/icons/LogoIcon";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-6 lg:px-8 shadow-md bg-card">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary hover:opacity-80 transition-opacity">
            <LogoIcon className="h-8 w-8" />
            <span>Web4 Community Guidelines</span>
          </Link>
          <nav>
            {/* Future navigation links can go here */}
          </nav>
        </div>
      </header>

      <main className="flex-grow py-8">
        <GuildelinesGenerator />
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm bg-card border-t">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Web4 Community Guidelines. All rights reserved.</p>
          <p className="mt-1">
            <a href="https://web4.one" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Web4</a> powered by <a href="https://linkspreed.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Linkspreed</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
