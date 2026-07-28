'use client';

import Link from 'next/link';
import { tracks } from '@/data/tracks';
import { useStore } from '@/store/useStore';
import { ArrowRight, Clock, Target } from 'lucide-react';

export default function TracksPage() {
  const { progress } = useStore();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Structured Tracks</h1>
        <p className="text-gray-400">Choose your preparation path based on your timeline and goals</p>
      </div>

      <div className="grid gap-8">
        {tracks.map((track) => {
          const allProblems = track.topics.flatMap(t => t.problems);
          const solved = allProblems.filter(p => progress.solvedProblems[p]?.status === 'solved').length;
          const progressPercent = allProblems.length > 0 ? (solved / allProblems.length) * 100 : 0;

          return (
            <Link
              key={track.id}
              href={`/tracks/${track.id}`}
              className="card-hover group rounded-xl border border-gray-800 bg-gray-900/50 p-8 hover:border-orange-500/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl">{track.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold group-hover:text-orange-400 transition-colors">
                        {track.title}
                      </h2>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {track.totalProblems} problems
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {track.estimatedDays} days
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4 max-w-2xl">{track.description}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-xs">
                      <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {solved}/{allProblems.length} completed
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Continue <ArrowRight className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {track.topics.slice(0, 5).map((topic) => (
                  <div key={topic.id} className="rounded-lg bg-gray-800/50 px-3 py-2 text-xs text-gray-300">
                    {topic.title}
                  </div>
                ))}
                {track.topics.length > 5 && (
                  <div className="rounded-lg bg-gray-800/50 px-3 py-2 text-xs text-gray-500">
                    +{track.topics.length - 5} more
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
