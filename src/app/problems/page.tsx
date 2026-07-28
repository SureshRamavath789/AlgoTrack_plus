'use client';

import { useState } from 'react';
import Link from 'next/link';
import { problems } from '@/data/problems';
import { useStore } from '@/store/useStore';
import { getDifficultyBg } from '@/lib/utils';
import { Search, Filter, CheckCircle2, Circle, Code2 } from 'lucide-react';

export default function ProblemsPage() {
  const { progress } = useStore();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const topics = [...new Set(problems.map(p => p.topic))];

  const filtered = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.topic.toLowerCase().includes(search.toLowerCase()) ||
      p.companies.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === 'all' || p.topic === topicFilter;
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'solved' && progress.solvedProblems[p.id]?.status === 'solved') ||
      (statusFilter === 'unsolved' && progress.solvedProblems[p.id]?.status !== 'solved');
    return matchesSearch && matchesDifficulty && matchesTopic && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Problem Set</h1>
        <p className="text-gray-400">Practice curated DSA problems with approach-wise editorials</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search problems, topics, or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-900 pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none"
          >
            <option value="all">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none"
          >
            <option value="all">All Topics</option>
            {topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 flex items-center gap-6 text-sm text-gray-400">
        <span>{filtered.length} problems</span>
        <span className="text-green-400">{filtered.filter(p => progress.solvedProblems[p.id]?.status === 'solved').length} solved</span>
      </div>

      {/* Problem List */}
      <div className="rounded-xl border border-gray-800 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 border-b border-gray-800 bg-gray-900/50 text-xs font-medium text-gray-400 uppercase tracking-wider">
          <div>Status</div>
          <div>Problem</div>
          <div>Topic</div>
          <div>Difficulty</div>
          <div>Companies</div>
        </div>
        <div className="divide-y divide-gray-800/50">
          {filtered.map((problem) => {
            const isSolved = progress.solvedProblems[problem.id]?.status === 'solved';
            return (
              <Link
                key={problem.id}
                href={`/ide/${problem.slug}`}
                className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 hover:bg-gray-800/30 transition-colors"
              >
                <div>
                  {isSolved ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{problem.title}</span>
                </div>
                <div>
                  <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-300">
                    {problem.topic}
                  </span>
                </div>
                <div>
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getDifficultyBg(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="flex gap-1">
                  {problem.companies.slice(0, 2).map(c => (
                    <span key={c} className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                      {c}
                    </span>
                  ))}
                  {problem.companies.length > 2 && (
                    <span className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-500">
                      +{problem.companies.length - 2}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
