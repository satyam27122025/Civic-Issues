export type MessageType = 'user_message' | 'system_message';

export interface ChatMessage {
  id: string | number;
  type: MessageType;
  username: string; // "system" for system messages
  text: string;
  isAI?: boolean;
}

export type IssueStatus = "Open" | "In Progress" | "Resolved";
export type IssuePriority = "High" | "Medium" | "Low" | "Unknown";

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  author: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  imageUrl?: string;
  upvotes: number;
  status: IssueStatus;
  priority: IssuePriority;
  createdAt: string;
}
