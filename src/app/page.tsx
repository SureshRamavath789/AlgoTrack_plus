'use client';

import Link from 'next/link';
import { Code2, Flame, BookOpen, Zap, Trophy, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { tracks } from '@/data/tracks';

export default function Home() {
  const { progress, getStreak } = useStore();
  const streak = getStreak();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm text-orange-400 mb-6">
            <Zap className="h-4 w-4" />
            Premium DSA Bootcamp Experience
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Master DSA with
            <span className="gradient-text block mt-2">TUF+ Pinnacle</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 mb-10">
            Transform your coding preparation with structured tracks, interactive IDE,
            approach-wise editorials, and daily progress tracking. Everything you need
            to crack FAANG interviews.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 font-semibold text-white hover:opacity-90 transition-opacity glow-orange"
            >
              Start Learning
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-8 py-3 font-semibold text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <Play className="h-5 w-5" />
              Practice Problems
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-gray-800">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">{streak}</div>
            <div className="text-sm text-gray-400 mt-1">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{progress.totalSolved}</div>
            <div className="text-sm text-gray-400 mt-1">Problems Solved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">1000+</div>
            <div className="text-sm text-gray-400 mt-1">Curated Problems</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">4</div>
            <div className="text-sm text-gray-400 mt-1">Languages Supported</div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Structured Track Variations</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose your path based on your timeline. Three highly targeted tracks for different preparation needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <Link
                key={track.id}
                href={`/tracks/${track.id}`}
                className="card-hover group rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-orange-500/50"
              >
                <div className="text-4xl mb-4">{track.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                  {track.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {track.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{track.totalProblems} problems</span>
                  <span className="text-gray-500">{track.estimatedDays} days</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Start Track <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Premium Features</h2>
            <p className="text-gray-400">Everything built for serious DSA preparation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 className="h-6 w-6 text-blue-400" />,
                title: 'Advanced Code Editor',
                description: 'Monaco-based IDE with C++, Java, Python, and JavaScript support. Run against all test cases instantly.'
              },
              {
                icon: <BookOpen className="h-6 w-6 text-green-400" />,
                title: 'Approach-Wise Editorials',
                description: 'Brute Force, Better, and Optimal solutions with detailed explanations and complexity analysis.'
              },
              {
                icon: <Flame className="h-6 w-6 text-orange-400" />,
                title: 'Daily Tracking & Streaks',
                description: 'Activity heatmap, streak tracking, and progress analytics to keep you motivated.'
              },
              {
                icon: <Trophy className="h-6 w-6 text-yellow-400" />,
                title: 'Guess Output Prompts',
                description: 'Active-learning checkpoints to test your dry-running skills before running code.'
              },
              {
                icon: <CheckCircle2 className="h-6 w-6 text-purple-400" />,
                title: 'Granular Complexity',
                description: 'Visual indicators showing why your solution fits specific Time and Space complexity bounds.'
              },
              {
                icon: <Zap className="h-6 w-6 text-red-400" />,
                title: 'Company Tags',
                description: 'Problems tagged with companies that frequently ask them in interviews.'
              }
            ].map((feature, i) => (
              <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
