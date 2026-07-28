'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { Flame, Code2, LayoutDashboard, BookOpen, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme, progress, getStreak } = useStore();
  const streak = getStreak();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TUF<span className="text-orange-500">+</span></span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/tracks" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <BookOpen className="h-4 w-4" />
                Tracks
              </Link>
              <Link href="/problems" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <Code2 className="h-4 w-4" />
                Problems
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1.5">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-white">{streak}</span>
              <span className="text-xs text-gray-400">day streak</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1.5">
              <span className="text-sm font-medium text-green-400">{progress.totalSolved}</span>
              <span className="text-xs text-gray-400">solved</span>
            </div>

            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
