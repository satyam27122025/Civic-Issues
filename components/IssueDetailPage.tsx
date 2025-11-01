import React from 'react';
import Header from './Header';
import { CivicIssue } from '../types';
import { UpvoteIcon } from './icons/UpvoteIcon';
import { BackIcon } from './icons/BackIcon';
import IssueDiscussion from './ChatWindow';
import MapPlaceholder from './MapPlaceholder';

interface IssueDetailPageProps {
  issue: CivicIssue;
  currentUser: { username: string };
  onBack: () => void;
  onLogout: () => void;
  onUpvote: (issueId: string) => void;
}

const IssueDetailPage: React.FC<IssueDetailPageProps> = ({ issue, currentUser, onBack, onLogout, onUpvote }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-900">
       <Header title={issue.title} username={currentUser.username} onLogout={onLogout} />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <button onClick={onBack} className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
            <BackIcon className="w-5 h-5"/>
            <span>Back to Dashboard</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Issue Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
                {issue.imageUrl && <img src={issue.imageUrl} alt={issue.title} className="w-full h-auto rounded-lg mb-4" />}
                <h2 className="text-2xl font-bold text-white mb-2">{issue.title}</h2>
                <p className="text-sm text-gray-400 mb-4">Reported by {issue.author} on {new Date(issue.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-300 whitespace-pre-wrap">{issue.description}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="text-yellow-400 font-bold text-lg">{issue.upvotes}</div>
                    <div className="text-gray-400">Upvotes</div>
                </div>
                <button 
                    onClick={() => onUpvote(issue.id)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <UpvoteIcon className="w-5 h-5"/>
                    <span>Upvote</span>
                </button>
            </div>
             <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
                 <h3 className="text-lg font-bold text-white mb-4">Location</h3>
                 <MapPlaceholder location={issue.location} />
            </div>
          </div>
          
          {/* Right Column: Discussion */}
          <div className="lg:col-span-2">
            <IssueDiscussion user={currentUser} issueId={issue.id} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueDetailPage;