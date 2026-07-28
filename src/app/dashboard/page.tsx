'use client';

import { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { problems } from '@/data/problems';
import { tracks } from '@/data/tracks';
import Link from 'next/link';
import {
  Flame, Target, Trophy, TrendingUp, Calendar, Code2,
  BarChart3, CheckCircle2, Clock, Zap
} from 'lucide-react';

export default function DashboardPage() {
  const { progress, getStreak } = useStore();
  const streak = getStreak();

  const stats = useMemo(() => {
    const solved = Object.entries(progress.solvedProblems).filter(([_, p]) => p.status === 'solved');
    const easy = solved.filter(([id]) => problems.find(p => p.id === id)?.difficulty === 'Easy').length;
    const medium = solved.filter(([id]) => problems.find(p => p.id === id)?.difficulty === 'Medium').length;
    const hard = solved.filter(([id]) => problems.find(p => p.id === id)?.difficulty === 'Hard').length;
    return { total: solved.length, easy, medium, hard };
  }, [progress.solvedProblems]);

  const heatmapData = useMemo(() => {
    const days: { date: string; count: number }[] = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      days.push({ date: key, count: progress.dailyActivity[key] || 0 });
    }
    return days;
  }, [progress.dailyActivity]);

  const recentActivity = useMemo(() => {
    return Object.entries(progress.solvedProblems)
      .filter(([_, p]) => p.status === 'solved' && p.solvedAt)
      .sort((a, b) => new Date(b[1].solvedAt!).getTime() - new Date(a[1].solvedAt!).getTime())
      .slice(0, 10)
      .map(([id, p]) => ({
        problem: problems.find(prob => prob.id === id),
        ...p
      }));
  }, [progress.solvedProblems]);

  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    if (count === 1) return 'bg-green-900';
    if (count === 2) return 'bg-green-700';
    if (count <= 4) return 'bg-green-500';
    return 'bg-green-400';
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Track your progress and maintain your streak</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-orange-500/10 p-2">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <span className="text-sm text-gray-400">Current Streak</span>
          </div>
          <div className="text-3xl font-bold text-orange-400">{streak}</div>
          <div className="text-xs text-gray-500 mt-1">days</div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-green-500/10 p-2">
              <Target className="h-5 w-5 text-green-500" />
            </div>
            <span className="text-sm text-gray-400">Total Solved</span>
          </div>
          <div className="text-3xl font-bold text-green-400">{stats.total}</div>
          <div className="text-xs text-gray-500 mt-1">problems</div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-gray-400">This Week</span>
          </div>
          <div className="text-3xl font-bold text-blue-400">
            {Object.entries(progress.dailyActivity)
              .filter(([date]) => {
                const d = new Date(date);
                const now = new Date();
                const weekAgo = new Date(now);
                weekAgo.setDate(weekAgo.getDate() - 7);
                return d >= weekAgo;
              })
              .reduce((sum, [_, count]) => sum + count, 0)}
          </div>
          <div className="text-xs text-gray-500 mt-1">problems this week</div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Trophy className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm text-gray-400">Completion</span>
          </div>
          <div className="text-3xl font-bold text-purple-400">
            {problems.length > 0 ? Math.round((stats.total / problems.length) * 100) : 0}%
          </div>
          <div className="text-xs text-gray-500 mt-1">of all problems</div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-400" />
            Difficulty Breakdown
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Easy', count: stats.easy, total: problems.filter(p => p.difficulty === 'Easy').length, color: 'bg-green-500' },
              { label: 'Medium', count: stats.medium, total: problems.filter(p => p.difficulty === 'Medium').length, color: 'bg-yellow-500' },
              { label: 'Hard', count: stats.hard, total: problems.filter(p => p.difficulty === 'Hard').length, color: 'bg-red-500' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-16 text-sm text-gray-400">{item.label}</span>
                <div className="flex-1 h-3 rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all`}
                    style={{ width: item.total > 0 ? `${(item.count / item.total) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-12 text-right">{item.count}/{item.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Track Progress
          </h3>
          <div className="space-y-4">
            {tracks.map(track => {
              const allProblems = track.topics.flatMap(t => t.problems);
              const solved = allProblems.filter(p => progress.solvedProblems[p]?.status === 'solved').length;
              const percent = allProblems.length > 0 ? (solved / allProblems.length) * 100 : 0;
              return (
                <Link key={track.id} href={`/tracks/${track.id}`} className="block">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{track.icon} {track.title}</span>
                    <span className="text-xs text-gray-400">{solved}/{allProblems.length}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-8">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-400" />
          Activity Heatmap
        </h3>
        <div className="overflow-x-auto">
          <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[700px]">
            {heatmapData.map((day) => (
              <div
                key={day.date}
                className={`h-3 w-3 rounded-sm ${getHeatmapColor(day.count)} cursor-pointer`}
                title={`${day.date}: ${day.count} problems`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
          <span>Less</span>
          <div className="h-3 w-3 rounded-sm bg-gray-800" />
          <div className="h-3 w-3 rounded-sm bg-green-900" />
          <div className="h-3 w-3 rounded-sm bg-green-700" />
          <div className="h-3 w-3 rounded-sm bg-green-500" />
          <div className="h-3 w-3 rounded-sm bg-green-400" />
          <span>More</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" />
          Recent Activity
        </h3>
        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-sm font-medium">{item.problem?.title || 'Unknown'}</div>
                    <div className="text-xs text-gray-400">
                      {item.language} • {item.approach}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {item.solvedAt ? new Date(item.solvedAt).toLocaleDateString() : ''}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            <Code2 className="h-8 w-8 mx-auto mb-2 text-gray-600" />
            No problems solved yet. Start practicing!
          </div>
        )}
      </div>
    </div>
  );
}
