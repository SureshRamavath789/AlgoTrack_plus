import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getStreakDays(dailyActivity: Record<string, number>): number {
  const today = new Date();
  let streak = 0;
  const current = new Date(today);

  while (true) {
    const key = current.toISOString().split('T')[0];
    if (dailyActivity[key] && dailyActivity[key] > 0) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy': return 'text-green-500';
    case 'Medium': return 'text-yellow-500';
    case 'Hard': return 'text-red-500';
    default: return 'text-gray-500';
  }
}

export function getDifficultyBg(difficulty: string): string {
  switch (difficulty) {
    case 'Easy': return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'Hard': return 'bg-red-500/10 text-red-500 border-red-500/20';
    default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
}
