// /resume.json — JSON Resume (https://jsonresume.org/schema) generated from profile.yaml.
import type { APIRoute } from 'astro';
import { profile, plain } from '../lib/profile';

export const GET: APIRoute = () => {
  const { basics } = profile;
  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: basics.name,
      label: `${basics.headline}, ${basics.tagline}`,
      email: basics.email, // phone intentionally omitted
      url: basics.website,
      summary: plain(basics.summary),
      location: { city: basics.location.split(',')[0].trim(), countryCode: 'IR' },
      profiles: basics.profiles,
    },
    work: profile.work.flatMap((job) =>
      job.roles.map((role) => ({
        name: job.company,
        position: role.title,
        url: job.url ?? undefined,
        location: job.location,
        startDate: role.start,
        endDate: role.end ?? undefined,
        highlights: role.highlights.map(plain),
      })),
    ),
    education: profile.education.map((e) => ({
      institution: e.institution,
      url: e.url ?? undefined,
      studyType: e.degree,
      startDate: e.start,
      endDate: e.end,
    })),
    skills: profile.skills,
    languages: profile.languages,
    certificates: profile.certificates.map((c) => ({ name: c.name, issuer: c.issuer, url: c.url ?? undefined })),
    interests: profile.personal.interests.map((i) => ({ name: i.name, keywords: i.favorites ?? [] })),
  };
  return new Response(JSON.stringify(resume, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
