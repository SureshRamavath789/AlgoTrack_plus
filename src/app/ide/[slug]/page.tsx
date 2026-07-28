'use client';

import { use, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { problems } from '@/data/problems';
import { useStore } from '@/store/useStore';
import { Language, Approach, TestResult } from '@/types';
import { getDifficultyBg } from '@/lib/utils';
import {
  Play, CheckCircle2, XCircle, Clock, Cpu, ChevronDown,
  BookOpen, Lightbulb, Code2, BarChart3, HelpCircle, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const LANGUAGE_OPTIONS: { value: Language; label: string; monacoLang: string }[] = [
  { value: 'cpp', label: 'C++', monacoLang: 'cpp' },
  { value: 'java', label: 'Java', monacoLang: 'java' },
  { value: 'python', label: 'Python', monacoLang: 'python' },
  { value: 'javascript', label: 'JavaScript', monacoLang: 'javascript' },
];

type Tab = 'description' | 'editorial' | 'submissions';
type BottomTab = 'testcases' | 'results' | 'guess-output';

export default function IDEPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const problem = problems.find(p => p.slug === slug);
  const { selectedLanguage, setLanguage, markProblem } = useStore();

  const [code, setCode] = useState(problem?.starterCode[selectedLanguage] || '');
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [bottomTab, setBottomTab] = useState<BottomTab>('testcases');
  const [selectedApproach, setSelectedApproach] = useState<Approach>('optimal');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [guessAnswer, setGuessAnswer] = useState<number | null>(null);
  const [showGuessResult, setShowGuessResult] = useState(false);

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400">Problem not found</p>
      </div>
    );
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(problem.starterCode[lang]);
  };

  const runCode = async () => {
    setIsRunning(true);
    setBottomTab('results');

    await new Promise(resolve => setTimeout(resolve, 1500));

    const results: TestResult[] = problem.testCases.map((tc) => {
      const passed = Math.random() > 0.3;
      return {
        testCaseId: tc.id,
        passed,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: passed ? tc.expectedOutput : 'Wrong Answer',
        executionTime: Math.floor(Math.random() * 50) + 5,
        memoryUsed: Math.floor(Math.random() * 10) + 2,
      };
    });

    setTestResults(results);
    setIsRunning(false);

    const allPassed = results.every(r => r.passed);
    if (allPassed) {
      markProblem(problem.id, 'solved', selectedLanguage, selectedApproach);
    }
  };

  const submitCode = async () => {
    setIsRunning(true);
    setBottomTab('results');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const results: TestResult[] = problem.testCases.map((tc) => ({
      testCaseId: tc.id,
      passed: true,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: tc.expectedOutput,
      executionTime: Math.floor(Math.random() * 30) + 3,
      memoryUsed: Math.floor(Math.random() * 8) + 2,
    }));

    setTestResults(results);
    setIsRunning(false);
    markProblem(problem.id, 'solved', selectedLanguage, selectedApproach);
  };

  const currentApproach = problem.approaches.find(a => a.type === selectedApproach);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Panel - Problem Description / Editorial */}
      <div className="w-[45%] border-r border-gray-800 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center border-b border-gray-800 bg-gray-900/50">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'description' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('editorial')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'editorial' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Editorial
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'submissions' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Solutions
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Link href="/problems" className="text-gray-400 hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                  <h1 className="text-2xl font-bold">{problem.title}</h1>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyBg(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.companies.map(c => (
                    <span key={c} className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-xs text-blue-400">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-gray-300 whitespace-pre-line">{problem.description}</p>
              </div>

              <div className="space-y-4">
                {problem.examples.map((ex, i) => (
                  <div key={ex.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <div className="text-sm font-medium text-gray-300 mb-2">Example {i + 1}:</div>
                    <div className="space-y-1 text-sm font-mono">
                      <div><span className="text-gray-400">Input: </span><span className="text-gray-200">{ex.input}</span></div>
                      <div><span className="text-gray-400">Output: </span><span className="text-green-400">{ex.expectedOutput}</span></div>
                      {ex.explanation && (
                        <div className="mt-2 text-gray-400"><span className="font-sans">Explanation: </span>{ex.explanation}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-2">Constraints:</h3>
                <ul className="space-y-1">
                  {problem.constraints.map((c, i) => (
                    <li key={i} className="text-sm text-gray-400 font-mono">• {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'editorial' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Approach-Wise Editorial</h2>

              {/* Approach Selector */}
              <div className="flex gap-2">
                {(['brute', 'better', 'optimal'] as Approach[]).map(approach => (
                  <button
                    key={approach}
                    onClick={() => setSelectedApproach(approach)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      selectedApproach === approach
                        ? approach === 'brute' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : approach === 'better' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    {approach === 'brute' ? 'Brute Force' : approach === 'better' ? 'Better' : 'Optimal'}
                  </button>
                ))}
              </div>

              {currentApproach && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-400" />
                      {currentApproach.title}
                    </h3>
                    <p className="text-gray-400 mt-2">{currentApproach.description}</p>
                  </div>

                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Intuition</h4>
                    <p className="text-sm text-gray-400">{currentApproach.intuition}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Algorithm</h4>
                    <ol className="space-y-2">
                      {currentApproach.algorithm.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-xs text-orange-400">
                            {i + 1}
                          </span>
                          <span className="text-gray-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Complexity Analysis */}
                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-400" />
                      Complexity Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-gray-800/50 p-3">
                        <div className="text-xs text-gray-400 mb-1">Time Complexity</div>
                        <div className="text-lg font-mono font-bold text-blue-400">{currentApproach.timeComplexity}</div>
                      </div>
                      <div className="rounded-lg bg-gray-800/50 p-3">
                        <div className="text-xs text-gray-400 mb-1">Space Complexity</div>
                        <div className="text-lg font-mono font-bold text-purple-400">{currentApproach.spaceComplexity}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">{currentApproach.complexityExplanation}</p>
                  </div>

                  {/* Complexity Comparison */}
                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">All Approaches Comparison</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2 text-gray-400">Approach</th>
                            <th className="text-left py-2 text-gray-400">Time</th>
                            <th className="text-left py-2 text-gray-400">Space</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800/50">
                            <td className="py-2 text-red-400">Brute Force</td>
                            <td className="py-2 font-mono text-gray-300">{problem.timeComplexity.brute}</td>
                            <td className="py-2 font-mono text-gray-300">{problem.spaceComplexity.brute}</td>
                          </tr>
                          <tr className="border-b border-gray-800/50">
                            <td className="py-2 text-yellow-400">Better</td>
                            <td className="py-2 font-mono text-gray-300">{problem.timeComplexity.better}</td>
                            <td className="py-2 font-mono text-gray-300">{problem.spaceComplexity.better}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-green-400">Optimal</td>
                            <td className="py-2 font-mono text-gray-300">{problem.timeComplexity.optimal}</td>
                            <td className="py-2 font-mono text-gray-300">{problem.spaceComplexity.optimal}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Solution Code</h2>

              <div className="flex gap-2 mb-4">
                {(['brute', 'better', 'optimal'] as Approach[]).map(approach => (
                  <button
                    key={approach}
                    onClick={() => setSelectedApproach(approach)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      selectedApproach === approach
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    {approach === 'brute' ? 'Brute Force' : approach === 'better' ? 'Better' : 'Optimal'}
                  </button>
                ))}
              </div>

              <div className="rounded-lg border border-gray-800 overflow-hidden">
                <div className="flex gap-2 p-2 bg-gray-900 border-b border-gray-800">
                  {LANGUAGE_OPTIONS.map(lang => (
                    <button
                      key={lang.value}
                      onClick={() => handleLanguageChange(lang.value)}
                      className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                        selectedLanguage === lang.value
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
                <pre className="p-4 text-sm text-gray-300 font-mono overflow-x-auto bg-gray-950">
                  <code>{problem.solutions[selectedApproach][selectedLanguage]}</code>
                </pre>
              </div>

              <button
                onClick={() => setCode(problem.solutions[selectedApproach][selectedLanguage])}
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Copy to Editor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Editor + Test Cases */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Editor Header */}
        <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/50 px-4 py-2">
          <div className="flex items-center gap-3">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-white focus:border-orange-500 focus:outline-none"
            >
              {LANGUAGE_OPTIONS.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-1.5 text-sm text-white hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <Play className="h-4 w-4" />
              Run
            </button>
            <button
              onClick={submitCode}
              disabled={isRunning}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4" />
              Submit
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 min-h-0">
          <MonacoEditor
            height="100%"
            language={LANGUAGE_OPTIONS.find(l => l.value === selectedLanguage)?.monacoLang}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: 'var(--font-geist-mono), monospace',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16 },
              lineNumbers: 'on',
              renderWhitespace: 'none',
              tabSize: 4,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>

        {/* Bottom Panel - Test Cases / Results */}
        <div className="h-[35%] border-t border-gray-800 flex flex-col overflow-hidden">
          <div className="flex items-center gap-4 border-b border-gray-800 bg-gray-900/50 px-4">
            <button
              onClick={() => setBottomTab('testcases')}
              className={`py-2.5 text-sm font-medium transition-colors ${
                bottomTab === 'testcases' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Test Cases
            </button>
            <button
              onClick={() => setBottomTab('results')}
              className={`py-2.5 text-sm font-medium transition-colors flex items-center gap-2 ${
                bottomTab === 'results' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Results
              {testResults.length > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  testResults.every(r => r.passed) ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {testResults.filter(r => r.passed).length}/{testResults.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setBottomTab('guess-output')}
              className={`py-2.5 text-sm font-medium transition-colors flex items-center gap-2 ${
                bottomTab === 'guess-output' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              Guess Output
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {bottomTab === 'testcases' && (
              <div className="space-y-3">
                {problem.testCases.slice(0, 5).map((tc, i) => (
                  <div key={tc.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-3">
                    <div className="text-xs font-medium text-gray-400 mb-2">Case {i + 1}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Input</div>
                        <div className="text-gray-300 whitespace-pre">{tc.input}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Expected Output</div>
                        <div className="text-green-400">{tc.expectedOutput}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {problem.testCases.length > 5 && (
                  <p className="text-xs text-gray-500">+ {problem.testCases.length - 5} hidden test cases</p>
                )}
              </div>
            )}

            {bottomTab === 'results' && (
              <div>
                {isRunning ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-orange-500" />
                      <span className="text-gray-400">Running test cases...</span>
                    </div>
                  </div>
                ) : testResults.length > 0 ? (
                  <div className="space-y-3">
                    <div className={`rounded-lg p-3 ${
                      testResults.every(r => r.passed)
                        ? 'bg-green-500/10 border border-green-500/20'
                        : 'bg-red-500/10 border border-red-500/20'
                    }`}>
                      <div className="flex items-center gap-2">
                        {testResults.every(r => r.passed) ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span className={`font-semibold ${testResults.every(r => r.passed) ? 'text-green-400' : 'text-red-400'}`}>
                          {testResults.every(r => r.passed) ? 'All Tests Passed!' : 'Some Tests Failed'}
                        </span>
                        <span className="text-sm text-gray-400 ml-auto">
                          {testResults.filter(r => r.passed).length}/{testResults.length} passed
                        </span>
                      </div>
                    </div>
                    {testResults.map((result, i) => (
                      <div key={result.testCaseId} className={`rounded-lg border p-3 ${
                        result.passed ? 'border-green-800/30 bg-green-900/10' : 'border-red-800/30 bg-red-900/10'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {result.passed ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium">Test Case {i + 1}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {result.executionTime}ms
                            </span>
                            <span className="flex items-center gap-1">
                              <Cpu className="h-3 w-3" /> {result.memoryUsed}MB
                            </span>
                          </div>
                        </div>
                        {!result.passed && (
                          <div className="grid grid-cols-3 gap-2 text-xs font-mono mt-2">
                            <div>
                              <div className="text-gray-500 mb-1">Input</div>
                              <div className="text-gray-300">{result.input}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 mb-1">Expected</div>
                              <div className="text-green-400">{result.expectedOutput}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 mb-1">Got</div>
                              <div className="text-red-400">{result.actualOutput}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8 text-gray-500 text-sm">
                    Run your code to see results
                  </div>
                )}
              </div>
            )}

            {bottomTab === 'guess-output' && (
              <div className="space-y-4">
                {problem.guessOutputPrompts.length > 0 ? (
                  problem.guessOutputPrompts.map((prompt) => (
                    <div key={prompt.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-yellow-400" />
                        What will this code output?
                      </h4>
                      <pre className="rounded-lg bg-gray-950 p-3 text-xs text-gray-300 font-mono overflow-x-auto mb-4">
                        {prompt.code}
                      </pre>
                      <div className="grid grid-cols-2 gap-2">
                        {prompt.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setGuessAnswer(i);
                              setShowGuessResult(true);
                            }}
                            disabled={showGuessResult}
                            className={`rounded-lg border p-2.5 text-sm font-mono transition-colors ${
                              showGuessResult
                                ? i === prompt.correctAnswer
                                  ? 'border-green-500 bg-green-500/10 text-green-400'
                                  : i === guessAnswer
                                    ? 'border-red-500 bg-red-500/10 text-red-400'
                                    : 'border-gray-700 text-gray-500'
                                : 'border-gray-700 hover:border-orange-500/50 hover:bg-gray-800 text-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {showGuessResult && (
                        <div className={`mt-3 rounded-lg p-3 text-sm ${
                          guessAnswer === prompt.correctAnswer
                            ? 'bg-green-500/10 text-green-300'
                            : 'bg-red-500/10 text-red-300'
                        }`}>
                          {guessAnswer === prompt.correctAnswer ? '✓ Correct! ' : '✗ Incorrect. '}
                          {prompt.explanation}
                        </div>
                      )}
                      {showGuessResult && (
                        <button
                          onClick={() => { setShowGuessResult(false); setGuessAnswer(null); }}
                          className="mt-2 text-xs text-orange-400 hover:text-orange-300"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-sm py-8">No guess output prompts for this problem</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
