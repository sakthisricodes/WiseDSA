import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';
import { getAuthenticatedUser } from '@/lib/auth';
import { getDashboardMetrics } from '@/lib/tracker';
import { ProgressBar, Badge } from '@/components/ui';

export const dynamic = 'force-dynamic';

const topicDescriptions = {
  "Arrays": "Core contiguous memory structures, Kadane's algorithm, two-pointer scanning, sliding window, and interval merging.",
  "Strings": "Pattern searching (KMP, Rabin-Karp, Boyer-Moore), palindromes, anagram hashing, and anagram subsequences.",
  "2D Arrays": "Matrix traversals (spiral, zigzag), in-place transformations, word search backtracking, and DFS islands.",
  "Searching & Sorting": "Binary search on answers, median of sorted streams, counting inversion, and custom comparator sorting.",
  "Backtracking": "N-Queens, Sudoku solver, knight tour, permutations, subset partitions, and Hamiltonian cycles.",
  "Linked List": "Floyd's cycle detection, slow & fast pointer, list reversals, flattening multilevel lists, and LRU caches.",
  "Stacks & Queues": "Monotonic stacks for next greater element, circular tours, special min stack, and infix/postfix conversions.",
  "Greedy": "Activity selection, Egyptian fractions, Huffman encoding, job sequencing with DSU, and coin change greed.",
  "Binary Trees": "DFS/BFS traversals, LCA, tree diameter, serialization/deserialization, view levels, and tree transforms.",
  "Binary Search Trees": "BST validation, inorder predecessor/successor, balancing BSTs, interval trees, and BST conversions.",
  "Heaps & Hashing": "Kth largest in streams, median finder with two heaps, custom cuckoo hashing, and sliding window maximum.",
  "Graphs": "BFS/DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal/Prim MST, topological sort, and bipartite testing.",
  "Tries": "Prefix trees, word break with trie, shortest unique prefix, phone directory lookups, and XOR tries.",
  "Dynamic Programming": "0/1 & unbounded knapsack, LCS, LIS, matrix chain multiplication, egg dropping, and interval/tree DP.",
  "Bit Manipulation": "Brian Kernighan count set bits, single number XOR tricks, power of two, bitmask subsets, and fast division.",
  "Segment Trees": "Range minimum queries, point & range updates, mutable range queries, and smaller numbers after self."
};

export default async function TopicsHubPage() {
  const user = await getAuthenticatedUser();
  const metrics = await getDashboardMetrics(user?.id);
  const topicProgress = metrics.topicProgress || [];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Curriculum Topics Hub</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          16 structural learning paths covering all 375 fundamental course problems from the Apna College DSA Sheet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topicProgress.map((tp) => {
          const description =
            topicDescriptions[tp.topic] ||
            'Foundational algorithms, technique hints, and problem-solving patterns.';

          return (
            <Link
              key={tp.topic}
              href={`/problems?topic=${encodeURIComponent(tp.topic)}`}
              className="group rounded-xl border border-slate-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 p-5 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/60 dark:hover:bg-zinc-850 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tp.topic}
                  </h3>
                  <Badge variant="outline" className="font-mono text-xs">
                    {tp.solved} / {tp.total}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-850">
                <ProgressBar
                  value={tp.solved}
                  max={tp.total}
                  className="h-1.5 bg-slate-200 dark:bg-zinc-800"
                  barClassName={
                    tp.percentage === 100
                      ? 'bg-emerald-500'
                      : tp.percentage > 50
                      ? 'bg-blue-500'
                      : 'bg-indigo-500'
                  }
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                  <span>{tp.percentage}% mastered</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Explore Problems <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
