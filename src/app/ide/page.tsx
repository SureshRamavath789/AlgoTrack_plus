'use client';

import { redirect } from 'next/navigation';
import { problems } from '@/data/problems';

export default function IDEIndexPage() {
  redirect(`/ide/${problems[0].slug}`);
}
