import { Track } from '@/types';

export const tracks: Track[] = [
  {
    id: 'dsa-basics-to-advanced',
    title: 'DSA (Basics to Advanced)',
    description: 'A deep-dive track featuring 1,000+ curated premium and company-specific problems. Includes a slow-paced, freshly recorded logic-building module for absolute beginners.',
    icon: '🎯',
    totalProblems: 1000,
    estimatedDays: 180,
    topics: [
      {
        id: 'arrays-basics',
        title: 'Arrays - Basics',
        description: 'Learn array fundamentals and basic operations',
        problems: ['two-sum', 'best-time-to-buy-sell-stock'],
        order: 1
      },
      {
        id: 'arrays-medium',
        title: 'Arrays - Intermediate',
        description: 'Medium-level array problems with multiple approaches',
        problems: ['longest-substring-without-repeating'],
        order: 2
      },
      {
        id: 'linked-list',
        title: 'Linked List',
        description: 'Master linked list operations and patterns',
        problems: ['reverse-linked-list', 'merge-two-sorted-lists'],
        order: 3
      },
      {
        id: 'stack-queue',
        title: 'Stack & Queue',
        description: 'Understanding LIFO and FIFO data structures',
        problems: ['valid-parentheses'],
        order: 4
      },
      {
        id: 'binary-search-topic',
        title: 'Binary Search',
        description: 'Divide and conquer search technique',
        problems: ['binary-search'],
        order: 5
      },
      {
        id: 'trees',
        title: 'Trees & BST',
        description: 'Tree traversals, BST operations, and advanced tree problems',
        problems: [],
        order: 6
      },
      {
        id: 'graphs',
        title: 'Graphs',
        description: 'BFS, DFS, shortest paths, and graph algorithms',
        problems: [],
        order: 7
      },
      {
        id: 'dp',
        title: 'Dynamic Programming',
        description: 'Memoization, tabulation, and DP patterns',
        problems: [],
        order: 8
      },
      {
        id: 'greedy',
        title: 'Greedy Algorithms',
        description: 'Making locally optimal choices',
        problems: [],
        order: 9
      },
      {
        id: 'recursion-backtracking',
        title: 'Recursion & Backtracking',
        description: 'Recursive thinking and backtracking patterns',
        problems: [],
        order: 10
      }
    ]
  },
  {
    id: 'dsa-concept-revision',
    title: 'DSA (Concept Revision)',
    description: 'A streamlined track of nearly 200 problems focusing purely on pattern recognition and conceptual depth.',
    icon: '🧠',
    totalProblems: 200,
    estimatedDays: 45,
    topics: [
      {
        id: 'pattern-arrays',
        title: 'Array Patterns',
        description: 'Two pointers, sliding window, prefix sums',
        problems: ['two-sum', 'best-time-to-buy-sell-stock', 'longest-substring-without-repeating'],
        order: 1
      },
      {
        id: 'pattern-linked-list',
        title: 'Linked List Patterns',
        description: 'Fast/slow pointers, reversal, merge',
        problems: ['reverse-linked-list', 'merge-two-sorted-lists'],
        order: 2
      },
      {
        id: 'pattern-stack',
        title: 'Stack Patterns',
        description: 'Monotonic stack, expression evaluation',
        problems: ['valid-parentheses'],
        order: 3
      },
      {
        id: 'pattern-search',
        title: 'Search Patterns',
        description: 'Binary search variations and applications',
        problems: ['binary-search'],
        order: 4
      },
      {
        id: 'pattern-tree',
        title: 'Tree Patterns',
        description: 'DFS, BFS, level-order, path problems',
        problems: [],
        order: 5
      },
      {
        id: 'pattern-dp',
        title: 'DP Patterns',
        description: 'LIS, LCS, knapsack, state machines',
        problems: [],
        order: 6
      }
    ]
  },
  {
    id: 'dsa-quick-revision',
    title: 'DSA (Quick Revision)',
    description: 'A high-speed, 10-day preparation track with ~80 essential problems tailored for last-minute interview recall.',
    icon: '⚡',
    totalProblems: 80,
    estimatedDays: 10,
    topics: [
      {
        id: 'quick-day1',
        title: 'Day 1: Arrays & Hashing',
        description: 'Essential array and hashing problems',
        problems: ['two-sum', 'best-time-to-buy-sell-stock'],
        order: 1
      },
      {
        id: 'quick-day2',
        title: 'Day 2: Linked Lists',
        description: 'Must-know linked list problems',
        problems: ['reverse-linked-list', 'merge-two-sorted-lists'],
        order: 2
      },
      {
        id: 'quick-day3',
        title: 'Day 3: Stacks & Queues',
        description: 'Stack and queue essentials',
        problems: ['valid-parentheses'],
        order: 3
      },
      {
        id: 'quick-day4',
        title: 'Day 4: Sliding Window & Two Pointers',
        description: 'Window-based problem solving',
        problems: ['longest-substring-without-repeating'],
        order: 4
      },
      {
        id: 'quick-day5',
        title: 'Day 5: Binary Search',
        description: 'Binary search applications',
        problems: ['binary-search'],
        order: 5
      },
      {
        id: 'quick-day6',
        title: 'Day 6: Trees',
        description: 'Critical tree problems',
        problems: [],
        order: 6
      },
      {
        id: 'quick-day7',
        title: 'Day 7: Graphs',
        description: 'Graph essentials for interviews',
        problems: [],
        order: 7
      },
      {
        id: 'quick-day8',
        title: 'Day 8: Dynamic Programming',
        description: 'Most asked DP problems',
        problems: [],
        order: 8
      },
      {
        id: 'quick-day9',
        title: 'Day 9: Greedy & Backtracking',
        description: 'Key greedy and backtracking problems',
        problems: [],
        order: 9
      },
      {
        id: 'quick-day10',
        title: 'Day 10: Mixed Practice',
        description: 'Mixed problems for final review',
        problems: [],
        order: 10
      }
    ]
  }
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find(t => t.id === id);
}
