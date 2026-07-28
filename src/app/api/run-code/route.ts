import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { code, language, testCases } = await request.json();

  await new Promise(resolve => setTimeout(resolve, 1000));

  const results = testCases.map((tc: { id: string; input: string; expectedOutput: string }) => {
    const passed = Math.random() > 0.2;
    return {
      testCaseId: tc.id,
      passed,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: passed ? tc.expectedOutput : 'Error',
      executionTime: Math.floor(Math.random() * 50) + 5,
      memoryUsed: Math.floor(Math.random() * 10) + 2,
    };
  });

  return NextResponse.json({
    success: results.every((r: { passed: boolean }) => r.passed),
    results,
    totalPassed: results.filter((r: { passed: boolean }) => r.passed).length,
    totalTests: results.length,
  });
}
