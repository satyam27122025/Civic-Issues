import { CivicIssue } from './types';

export const MOCK_ISSUES: CivicIssue[] = [
  {
    id: 'issue-1',
    title: 'Massive Pothole on Elm Street',
    description: 'There is a very large and dangerous pothole near the intersection of Elm and Oak. It has already damaged several car tires. Needs urgent attention.',
    author: 'CitizenJane',
    location: { latitude: 34.0522, longitude: -118.2437 },
    imageUrl: 'https://images.unsplash.com/photo-1594168297922-262705dd54a6?q=80&w=800&auto=format&fit=crop',
    upvotes: 42,
    status: 'Open',
    priority: 'High',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 'issue-2',
    title: 'Streetlight Out at Park Entrance',
    description: 'The main streetlight at the entrance of Central Park has been out for three days. It makes the area feel unsafe at night.',
    author: 'ConcernedParent',
    location: { latitude: 34.055, longitude: -118.245 },
    upvotes: 15,
    status: 'Open',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
  },
  {
    id: 'issue-3',
    title: 'Overflowing Trash Bins',
    description: 'The public trash and recycling bins along the waterfront promenade are completely full and overflowing. It looks terrible and is attracting pests.',
    author: 'LocalRunner',
    location: { latitude: 34.050, longitude: -118.240 },
    imageUrl: 'https://images.unsplash.com/photo-1601758124500-a3d1f1b34a98?q=80&w=800&auto=format&fit=crop',
    upvotes: 28,
    status: 'In Progress',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
  },
  {
    id: 'issue-4',
    title: 'Graffiti on Library Wall',
    description: 'A large amount of graffiti has appeared on the north wall of the public library. It should be cleaned up to maintain the building\'s appearance.',
    author: 'BookLover',
    location: { latitude: 34.06, longitude: -118.25 },
    upvotes: 7,
    status: 'Open',
    priority: 'Low',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
   {
    id: 'issue-5',
    title: 'Resolved: Broken Swing at Playground',
    description: 'One of the swings at the playground on 5th Ave was broken, with a chain snapped. It was a safety hazard for children.',
    author: 'SafetyFirst',
    location: { latitude: 34.045, longitude: -118.23 },
    upvotes: 51,
    status: 'Resolved',
    priority: 'High',
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(), // 10 days ago
  },
];
