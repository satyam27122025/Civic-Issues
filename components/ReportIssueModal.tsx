import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Loader } from './Loader';
import { CivicIssue } from '../types';
import { analyzeIssuePriority } from '../services/geminiService';
import { ImageIcon } from './icons/ImageIcon';

interface ReportIssueModalProps {
  onClose: () => void;
  onAddIssue: (newIssue: Omit<CivicIssue, 'id' | 'createdAt' | 'author' | 'upvotes' | 'status'>) => void;
}

const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ onClose, onAddIssue }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Get Geolocation
      const location = await new Promise<{ latitude: number, longitude: number } | null>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
          () => resolve(null) // Handle location permission denial gracefully
        );
      });

      // 2. Analyze with AI
      const priority = await analyzeIssuePriority(description);

      // 3. Create issue object
      const newIssue = {
        title,
        description,
        location,
        priority,
        imageUrl: imagePreview || undefined,
      };

      onAddIssue(newIssue);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to submit issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-800 border border-purple-500/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Report a New Civic Issue</h2>
          <p className="text-sm text-gray-400">Help improve your community by reporting problems.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Large pothole on Main St"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Provide details about the issue..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Upload Photo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md" />
                ) : (
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-purple-400 hover:text-purple-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*"/>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
        <div className="p-6 border-t border-gray-700 flex justify-end items-center space-x-4">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">Cancel</button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSubmitting ? <><Loader /> <span className="ml-2">Submitting...</span></> : 'Submit Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportIssueModal;
