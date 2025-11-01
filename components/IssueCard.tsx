import React from 'react';
import { CivicIssue, IssuePriority } from '../types';
import { UpvoteIcon } from './icons/UpvoteIcon';
import { StatusIcon } from './icons/StatusIcon';

interface IssueCardProps {
  issue: CivicIssue;
  onSelect: () => void;
}

const priorityStyles: Record<IssuePriority, { bg: string; text: string; border: string }> = {
  High: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500/50' },
  Medium: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500/50' },
  Low: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-500/50' },
  Unknown: { bg: 'bg-gray-700/50', text: 'text-gray-300', border: 'border-gray-500/50' },
};

const IssueCard: React.FC<IssueCardProps> = ({ issue, onSelect }) => {
  const styles = priorityStyles[issue.priority];

  return (
    <div
      onClick={onSelect}
      className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border ${styles.border} p-6 cursor-pointer transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-500 hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white pr-4">{issue.title}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles.bg} ${styles.text}`}>
          {issue.priority}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-6 h-10 overflow-hidden text-ellipsis">
        {issue.description}
      </p>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2 text-gray-300">
            <StatusIcon status={issue.status} className="w-5 h-5" />
            <span>{issue.status}</span>
        </div>
        <div className="flex items-center space-x-2 text-yellow-400">
          <UpvoteIcon className="w-5 h-5" />
          <span className="font-bold">{issue.upvotes}</span>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
