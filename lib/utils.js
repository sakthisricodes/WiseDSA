import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  if (!date) return 'Never';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function getStatusColor(status) {
  switch (status) {
    case 'SOLVED':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'IN_PROGRESS':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'UNSOLVED':
    default:
      return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30';
  }
}

export function getTopicIcon(topic) {
  // Mapping topic to category identifier
  return topic;
}
