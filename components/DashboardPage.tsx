import React, { useState } from 'react';
import Header from './Header';
import { CivicIssue } from '../types';
import IssueCard from './IssueCard';
import ReportIssueModal from './ReportIssueModal';
import { PlusIcon } from './icons/PlusIcon';

interface DashboardPageProps {
  issues: CivicIssue[];
  username: string;
  onSelectIssue: (issue: CivicIssue) => void;
  onAddIssue: (newIssue: Omit<CivicIssue, 'id' | 'createdAt' | 'author'| 'upvotes' | 'status'>) => void;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ issues, username, onSelectIssue, onAddIssue, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header title="Issues Dashboard" username={username} onLogout={onLogout} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} onSelect={() => onSelectIssue(issue)} />
          ))}
        </div>
      </main>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-300 z-20"
        aria-label="Report New Issue"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      {isModalOpen && (
        <ReportIssueModal
          onClose={() => setIsModalOpen(false)}
          onAddIssue={onAddIssue}
        />
      )}
    </div>
  );
};

export default DashboardPage;
