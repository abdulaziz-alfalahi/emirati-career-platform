import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoConferencingComponent from '../components/interview/VideoConferencingComponent';
import '../../styles/theme.css';

const InterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleJoinRoom = () => {
    if (!participantName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!roomName.trim()) {
      setError('Please enter a room name');
      return;
    }
    
    setError(null);
    setIsInRoom(true);
  };
  
  const handleRoomJoined = (roomId: string) => {
    setRoomId(roomId);
    console.log(`Joined room: ${roomId}`);
  };
  
  const handleRoomLeft = () => {
    setIsInRoom(false);
    setRoomId(null);
  };
  
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsInRoom(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-green-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
      </div>
      
      {!isInRoom ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Online Interview</h2>
          
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <label htmlFor="participantName" className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                id="participantName"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your name"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="roomName" className="block text-gray-700 font-medium mb-2">Interview Room</label>
              <input
                type="text"
                id="roomName"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary"
                  checked={isHost}
                  onChange={(e) => setIsHost(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">I am the interviewer (host)</span>
              </label>
            </div>
            
            {error && (
              <div className="mb-6 bg-red-100 text-accent p-3 rounded-md">
                {error}
              </div>
            )}
            
            <button
              className="btn-primary w-full"
              onClick={handleJoinRoom}
            >
              {isHost ? 'Create and Join Interview Room' : 'Join Interview Room'}
            </button>
          </div>
        </div>
      ) : (
        <VideoConferencingComponent
          roomName={roomName}
          participantName={participantName}
          isHost={isHost}
          onRoomJoined={handleRoomJoined}
          onRoomLeft={handleRoomLeft}
          onError={handleError}
        />
      )}
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Interview Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">For Candidates</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Test your camera and microphone before the interview</li>
              <li>• Choose a quiet location with good lighting</li>
              <li>• Dress professionally as you would for an in-person interview</li>
              <li>• Have your resume and portfolio ready to share</li>
              <li>• Prepare questions to ask the interviewer</li>
            </ul>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">For Interviewers</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Prepare your questions in advance</li>
              <li>• Take notes during the interview</li>
              <li>• Share relevant information about the position and company</li>
              <li>• Allow time for the candidate to ask questions</li>
              <li>• Explain next steps in the hiring process</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Technical Requirements</h2>
        <p className="text-gray-700 mb-4">
          For the best interview experience, please ensure you have:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="font-medium text-primary mb-1">Internet Connection</div>
            <p className="text-gray-600 text-sm">Stable broadband connection with at least 1 Mbps upload and download speed</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="font-medium text-primary mb-1">Web Browser</div>
            <p className="text-gray-600 text-sm">Latest version of Chrome, Firefox, Safari, or Edge</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="font-medium text-primary mb-1">Hardware</div>
            <p className="text-gray-600 text-sm">Working webcam, microphone, and speakers or headphones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
