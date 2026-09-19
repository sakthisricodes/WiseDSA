import { rawDataset as part1 } from './dataset.js';
import { courseProblems as part1And2 } from './all-problems.js';
import { part2Problems } from './dataset-part2.js';
import { part3Problems } from './dataset-part3.js';

// Complete compilation of all 375 problems from the Apna College DSA Course Sheet
export const allDsaProblems = [
  ...part1And2,
  ...part2Problems,
  ...part3Problems
];

// Helper to get list of unique topics with total problem counts
export const TOPICS = [
  "Arrays",
  "Strings",
  "2D Arrays",
  "Searching & Sorting",
  "Backtracking",
  "Linked List",
  "Stacks & Queues",
  "Greedy",
  "Binary Trees",
  "Binary Search Trees",
  "Heaps & Hashing",
  "Graphs",
  "Tries",
  "Dynamic Programming",
  "Bit Manipulation",
  "Segment Trees"
];

export function getProblemsByTopic(topicName) {
  if (!topicName) return allDsaProblems;
  return allDsaProblems.filter(p => p.topic.toLowerCase() === topicName.toLowerCase());
}

export function getProblemBySlug(slug) {
  return allDsaProblems.find(p => p.slug === slug || p.id === slug);
}

export function getAllCompanies() {
  const companyCounts = {};
  allDsaProblems.forEach(p => {
    p.companies.forEach(c => {
      companyCounts[c] = (companyCounts[c] || 0) + 1;
    });
  });

  return Object.entries(companyCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTechniques() {
  const techniqueCounts = {};
  allDsaProblems.forEach(p => {
    p.techniques.forEach(t => {
      techniqueCounts[t] = (techniqueCounts[t] || 0) + 1;
    });
  });

  return Object.entries(techniqueCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
