// /llms.txt — a plain-text brief for AI agents (https://llmstxt.org), generated from profile.yaml.
import type { APIRoute } from 'astro';
import { profile, plain, dateRange, current } from '../lib/profile';

export const GET: APIRoute = () => {
  const { basics } = profile;
  const now = current();
  const site = basics.website.replace(/\/$/, '');

  const lines = [
    `# ${basics.name} (${basics.name_fa})`,
    '',
    `> ${now.title} at ${now.company}, ${basics.location}. ${basics.tagline}.`,
    '',
    plain(basics.summary),
    '',
    '## Key resources',
    '',
    `- [Home page](${site}/): profile, experience, skills`,
    `- [Résumé (PDF)](${site}/alireza-hanifi-resume-en.pdf)`,
    `- [Résumé (JSON Resume)](${site}/resume.json): structured, machine-readable`,
    ...basics.profiles.map((p) => `- [${p.network}](${p.url})`),
    '',
    '## Experience',
    '',
    ...profile.work.flatMap((job) =>
      job.roles.map((r) => `- ${r.title}, ${job.company} (${dateRange(r.start, r.end)})`),
    ),
    '',
    '## Skills',
    '',
    ...profile.skills.map((s) => `- ${s.name}: ${s.keywords.join(', ')}`),
    '',
    '## Contact',
    '',
    `- Email: ${basics.email}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
