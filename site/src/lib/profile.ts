// Loads ../content/profile.yaml (the single source of truth) and offers small formatting helpers.
import { parse } from 'yaml';
import raw from '../../../content/profile.yaml?raw';

export type Link = { network: string; username: string; url: string };
export type Role = { title: string; start: string; end: string | null; highlights: string[] };
export type Job = { company: string; url: string | null; logo?: string; location: string; roles: Role[] };
export type Interest = { name: string; note: string; url: string | null; favorites?: string[] };

export type Profile = {
  basics: {
    name: string;
    name_fa: string;
    headline: string;
    tagline: string;
    location: string;
    email: string;
    phone: string; // never rendered on the site
    website: string;
    statement: string;
    intro: string;
    glance: { value: string; label: string }[];
    profiles: Link[];
    summary: string;
  };
  work: Job[];
  education: {
    institution: string;
    url: string | null;
    location: string;
    degree: string;
    start: string;
    end: string;
  }[];
  skills: { name: string; keywords: string[] }[];
  languages: { language: string; fluency: string }[];
  certificates: { name: string; issuer: string; url: string | null }[];
  personal: {
    traits: string[];
    intro: string;
    interests: Interest[];
    cover: {
      masthead: string; issue: string; image: string; figure: string; alt: string;
      kicker: string; lead: string; lines: { head: string; deck: string }[];
    };
  };
};

export const profile = parse(raw) as Profile;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const year = (s: string) => Number(String(s).slice(0, 4));

export function fmtDate(s: string | null): string {
  if (!s) return 'Present';
  const [y, m] = String(s).split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export const dateRange = (start: string, end: string | null) => `${fmtDate(start)} – ${fmtDate(end)}`;

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes HTML, then turns **bold** into <strong>. The only markup profile.yaml allows. */
export const rich = (s: string) => escape(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/** Removes **markers** for plain-text outputs (llms.txt, resume.json). */
export const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1');

/** Prefixes a root path (`/portrait.webp`) with the site's base path (`/hanifi`). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const asset = (p: string) => (p.startsWith('/') ? base + p : p);

export const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** All roles, oldest first, for the career "lineage" strip. */
export const lineage = () =>
  profile.work
    .flatMap((job) => job.roles.map((role) => ({ ...role, company: job.company })))
    .sort((a, b) => a.start.localeCompare(b.start));

/** Whole years since the first role started, e.g. 4 for Jul 2022 → Nov 2026. */
export function yearsInData(now = new Date()): number {
  const first = lineage()[0].start;
  const [y, m] = first.split('-').map(Number);
  return Math.floor((now.getFullYear() * 12 + now.getMonth() + 1 - (y * 12 + m)) / 12);
}

const monthIndex = (s: string) => {
  const [y, m] = String(s).split('-').map(Number);
  return y * 12 + (m - 1);
};

/** "1 yr 6 mo", "8 mo". */
export function duration(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr`, m && `${m} mo`].filter(Boolean).join(' ') || '1 mo';
}

/**
 * Career timeline on a month grid, oldest employer first. Columns are 1-based grid lines:
 * a company spans [from, to) on the page grid; its roles span [from, to) inside the company.
 * A role that ends in the month the next one starts gives that month to the new role.
 */
export function timeline(now = new Date()) {
  const nowM = now.getFullYear() * 12 + now.getMonth();
  const jobs = [...profile.work].reverse();
  const start0 = Math.min(...jobs.flatMap((j) => j.roles.map((r) => monthIndex(r.start))));
  const months = nowM - start0 + 1;

  const companies = jobs.map((job) => {
    const roles = [...job.roles].reverse().map((r, i, all) => {
      const s = monthIndex(r.start);
      let e = r.end ? monthIndex(r.end) + 1 : nowM + 1; // exclusive
      const next = all[i + 1];
      if (next && monthIndex(next.start) < e) e = monthIndex(next.start);
      return { ...r, s, e };
    });
    const s = Math.min(...roles.map((r) => r.s));
    const e = Math.max(...roles.map((r) => r.e));
    return {
      company: job.company,
      url: job.url,
      logo: job.logo,
      from: s - start0 + 1,
      to: e - start0 + 1,
      span: e - s,
      roles: roles.map((r) => ({
        title: r.title,
        now: !r.end,
        from: r.s - s + 1,
        to: r.e - s + 1,
        months: r.e - r.s,
        dates: dateRange(r.start, r.end),
      })),
    };
  });

  const firstYear = Math.floor(start0 / 12);
  const years = [];
  for (let y = firstYear + 1; y <= now.getFullYear(); y++) {
    years.push({ year: y, pct: ((y * 12 - start0) / months) * 100 });
  }
  return { months, companies, years, firstYear };
}

export const current = () => {
  const job = profile.work[0];
  return { company: job.company, title: job.roles[0].title };
};
