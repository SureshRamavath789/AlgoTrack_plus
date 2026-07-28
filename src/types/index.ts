export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Language = 'cpp' | 'java' | 'python' | 'javascript';
export type ProblemStatus = 'solved' | 'attempted' | 'unsolved';
export type Approach = 'brute' | 'better' | 'optimal';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topic: string;
  companies: string[];
  description: string;
  constraints: string[];
  examples: TestCase[];
  testCases: TestCase[];
  approaches: ApproachDetail[];
  timeComplexity: Record<Approach, string>;
  spaceComplexity: Record<Approach, string>;
  guessOutputPrompts: GuessOutputPrompt[];
  videoEditorialUrl?: Record<Approach, string>;
  starterCode: Record<Language, string>;
  solutions: Record<Approach, Record<Language, string>>;
}

export interface ApproachDetail {
  type: Approach;
  title: string;
  description: string;
  intuition: string;
  algorithm: string[];
  timeComplexity: string;
  spaceComplexity: string;
  complexityExplanation: string;
}

export interface GuessOutputPrompt {
  id: string;
  code: string;
  language: Language;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  totalProblems: number;
  estimatedDays: number;
  topics: TrackTopic[];
}

export interface TrackTopic {
  id: string;
  title: string;
  description: string;
  problems: string[];
  order: number;
}

export interface UserProgress {
  odayStreak: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  solvedProblems: Record<string, ProblemProgress>;
  dailyActivity: Record<string, number>;
  currentTrack: string | null;
  trackProgress: Record<string, number>;
}

export interface ProblemProgress {
  status: ProblemStatus;
  solvedAt?: string;
  language?: Language;
  approach?: Approach;
  notes?: string;
}

export interface CodeSubmission {
  language: Language;
  code: string;
  problemId: string;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTime?: number;
  memoryUsed?: number;
  error?: string;
}

export interface SubmissionResult {
  success: boolean;
  results: TestResult[];
  totalPassed: number;
  totalTests: number;
  overallTime?: number;
  overallMemory?: number;
}
