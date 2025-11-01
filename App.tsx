import React, { useState, useCallback, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import IssueDetailPage from './components/IssueDetailPage';
import { CivicIssue } from './types';
import { MOCK_ISSUES } from './mockData';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('civicUsername');
  });
  
  const [issues, setIssues] = useState<CivicIssue[]>(MOCK_ISSUES);
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);

  useEffect(() => {
    // On first load, if a user is logged in, generate a random username.
    // In a real app, this would come from a user profile.
    if (isLoggedIn && !username) {
        const randomName = `Citizen${Math.floor(Math.random() * 1000)}`;
        localStorage.setItem('civicUsername', randomName);
        setUsername(randomName);
    }
  }, [isLoggedIn, username]);


  const handleLoginSuccess = useCallback(() => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    const randomName = `Citizen${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem('civicUsername', randomName);
    setUsername(randomName);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('civicUsername');
    setIsLoggedIn(false);
    setUsername(null);
    setSelectedIssue(null);
  }, []);

  const handleSelectIssue = useCallback((issue: CivicIssue) => {
    setSelectedIssue(issue);
  }, []);
  
  const handleBackToDashboard = useCallback(() => {
    setSelectedIssue(null);
  }, []);

  const handleAddIssue = useCallback((newIssue: Omit<CivicIssue, 'id' | 'createdAt' | 'author' | 'upvotes' | 'status'>) => {
    if(!username) return;
    const issueToAdd: CivicIssue = {
      ...newIssue,
      id: `issue-${Date.now()}`,
      author: username,
      upvotes: 0,
      status: "Open",
      createdAt: new Date().toISOString()
    };
    setIssues(prev => [issueToAdd, ...prev]);
  }, [username]);

  const handleUpvote = useCallback((issueId: string) => {
    setIssues(prevIssues => prevIssues.map(issue => 
      issue.id === issueId ? { ...issue, upvotes: issue.upvotes + 1 } : issue
    ));
     // Also update the selected issue if it's being viewed
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue(prev => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null);
    }
  }, [selectedIssue]);


  const renderContent = () => {
    if (!isLoggedIn || !username) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }
    
    if (selectedIssue) {
        return <IssueDetailPage issue={selectedIssue} onBack={handleBackToDashboard} onUpvote={handleUpvote} currentUser={{username}} onLogout={handleLogout}/>;
    }

    return <DashboardPage issues={issues} onSelectIssue={handleSelectIssue} onAddIssue={handleAddIssue} onLogout={handleLogout} username={username} />;
  };

  return (
    <div className="min-h-screen text-white font-sans transition-all duration-500">
      {renderContent()}
    </div>
  );
};

export default App;
