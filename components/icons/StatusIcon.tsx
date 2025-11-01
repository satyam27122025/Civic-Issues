import React from 'react';
import { IssueStatus } from '../../types';

interface StatusIconProps extends React.SVGProps<SVGSVGElement> {
    status: IssueStatus;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status, ...props }) => {
    switch (status) {
        case 'Resolved':
            return (
                <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${props.className} text-green-400`}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            );
        case 'In Progress':
            return (
                <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${props.className} text-blue-400`}>
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M12 6v6l4 2" />
                </svg>
            );
        case 'Open':
        default:
            return (
                <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${props.className} text-gray-400`}>
                   <circle cx="12" cy="12" r="10" />
                   <circle cx="12" cy="12" r="4" />
                </svg>
            );
    }
};
