'use client';

import { use } from 'react';
import Link from 'next/link';
import { tracks } from '@/data/tracks';
import { problems } from '@/data/problems';
import { useStore } from '@/store/useStore';
import { getDifficultyColor, getDifficultyBg } from '@/lib/utils';
import { ArrowLeft, CheckCircle2, Circle, Clock } from 'lucide-react';

export default function TrackDetailPage({ params }: { params: Promise<{ trackId: string }> }) {
  const { trackId } = use(params);
  const { progress } = useStore();
  const track = tracks.find(t => t.id === trackId);

  if (!track) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400">Track not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/tracks" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Tracks
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl">{track.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{track.title}</h1>
            <p className="text-gray-400 mt-1">{track.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4 text-sm text-gray-400">
          <span>{track.totalProblems} problems</span>
          <span>{track.estimatedDays} days estimated</span>
          <span>{track.topics.length} topics</span>
        </div>
      </div>

      <div className="space-y-6">
        {track.topics.map((topic, topicIdx) => {
          const topicProblems = topic.problems.map(pid => problems.find(p => p.id === pid)).filter(Boolean);
          const solved = topic.problems.filter(pid => progress.solvedProblems[pid]?.status === 'solved').length;

          return (
            <div key={topic.id} className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400">
                    {topicIdx + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="text-xs text-gray-400">{topic.description}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {solved}/{topic.problems.length}
                </div>
              </div>

              {topicProblems.length > 0 ? (
                <div className="divide-y divide-gray-800/50">
                  {topicProblems.map((problem) => {
                    if (!problem) return null;
                    const isSolved = progress.solvedProblems[problem.id]?.status === 'solved';

                    return (
                      <Link
                        key={problem.id}
                        href={`/ide/${problem.slug}`}
                        className="flex items-center justify-between p-4 hover:bg-gray-800/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isSolved ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-600" />
                          )}
                          <span className={isSolved ? 'text-gray-300' : 'text-white'}>
                            {problem.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {problem.companies.slice(0, 3).map(c => (
                              <span key={c} className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                                {c}
                              </span>
                            ))}
                          </div>
                          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyBg(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  <Clock className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                  Coming soon - More problems being added
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
