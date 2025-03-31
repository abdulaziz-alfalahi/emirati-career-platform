import React, { useState, useEffect, useRef } from 'react';
import { useAPI } from '../../lib/api/APIContext';
import '../../styles/theme.css';

// Interface for video conferencing options
interface VideoConferencingOptions {
  roomName: string;
  participantName: string;
  isHost: boolean;
  onRoomJoined?: (roomId: string) => void;
  onRoomLeft?: () => void;
  onError?: (error: string) => void;
}

// Interface for participant
interface Participant {
  id: string;
  name: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
}

// Mock implementation of video conferencing service
// This would be replaced with an actual implementation using a service like Twilio, Agora, or Daily.co
const VideoConferencingService = {
  initializeSDK: async () => {
    console.log('Initializing video conferencing SDK');
    // This would be an actual SDK initialization
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  },
  
  createRoom: async (roomName: string): Promise<string> => {
    console.log(`Creating room: ${roomName}`);
    // This would be an actual API call to create a room
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `room-${Date.now()}`;
  },
  
  joinRoom: async (roomId: string, participantName: string): Promise<void> => {
    console.log(`Joining room ${roomId} as ${participantName}`);
    // This would be an actual API call to join a room
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
  
  leaveRoom: async (): Promise<void> => {
    console.log('Leaving room');
    // This would be an actual API call to leave a room
    await new Promise(resolve => setTimeout(resolve, 500));
  },
  
  toggleAudio: async (enabled: boolean): Promise<void> => {
    console.log(`Toggling audio: ${enabled ? 'on' : 'off'}`);
    // This would be an actual API call to toggle audio
    await new Promise(resolve => setTimeout(resolve, 200));
  },
  
  toggleVideo: async (enabled: boolean): Promise<void> => {
    console.log(`Toggling video: ${enabled ? 'on' : 'off'}`);
    // This would be an actual API call to toggle video
    await new Promise(resolve => setTimeout(resolve, 200));
  },
  
  toggleScreenShare: async (enabled: boolean): Promise<void> => {
    console.log(`Toggling screen share: ${enabled ? 'on' : 'off'}`);
    // This would be an actual API call to toggle screen sharing
    await new Promise(resolve => setTimeout(resolve, 200));
  },
  
  getParticipants: async (): Promise<Participant[]> => {
    // This would be an actual API call to get participants
    // For demonstration, we'll return mock participants
    return [
      {
        id: 'host-123',
        name: 'Interviewer',
        isAudioEnabled: true,
        isVideoEnabled: true,
        isScreenSharing: false
      },
      {
        id: 'participant-456',
        name: 'Candidate',
        isAudioEnabled: true,
        isVideoEnabled: true,
        isScreenSharing: false
      }
    ];
  }
};

const VideoConferencingComponent: React.FC<VideoConferencingOptions> = ({
  roomName,
  participantName,
  isHost,
  onRoomJoined,
  onRoomLeft,
  onError
}) => {
  const api = useAPI();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  
  // Initialize SDK on component mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await VideoConferencingService.initializeSDK();
        setIsInitialized(true);
      } catch (err: any) {
        const errorMessage = 'Failed to initialize video conferencing';
        setError(errorMessage);
        if (onError) onError(errorMessage);
      }
    };
    
    initialize();
    
    // Cleanup on unmount
    return () => {
      if (isInRoom) {
        VideoConferencingService.leaveRoom();
      }
    };
  }, []);
  
  // Join room when initialized
  useEffect(() => {
    if (!isInitialized || isJoining || isInRoom || !roomName || !participantName) return;
    
    const joinRoom = async () => {
      setIsJoining(true);
      setError(null);
      
      try {
        let roomIdToJoin = roomId;
        
        // If host, create a new room
        if (isHost) {
          roomIdToJoin = await VideoConferencingService.createRoom(roomName);
          setRoomId(roomIdToJoin);
        }
        
        // Join the room
        if (roomIdToJoin) {
          await VideoConferencingService.joinRoom(roomIdToJoin, participantName);
          setIsInRoom(true);
          
          // Get participants
          const roomParticipants = await VideoConferencingService.getParticipants();
          setParticipants(roomParticipants);
          
          if (onRoomJoined) onRoomJoined(roomIdToJoin);
        } else {
          throw new Error('Room ID is not available');
        }
      } catch (err: any) {
        const errorMessage = `Failed to join room: ${err.message || 'Unknown error'}`;
        setError(errorMessage);
        if (onError) onError(errorMessage);
      } finally {
        setIsJoining(false);
      }
    };
    
    joinRoom();
  }, [isInitialized, roomName, participantName, isHost, roomId, onRoomJoined]);
  
  // Setup mock video streams for demonstration
  useEffect(() => {
    if (!isInRoom) return;
    
    // In a real implementation, these would be actual video streams from the SDK
    // For demonstration, we'll use mock video elements
    
    // Simulate local video
    if (localVideoRef.current) {
      localVideoRef.current.poster = 'https://via.placeholder.com/320x240?text=Your+Camera';
    }
    
    // Simulate remote video
    if (remoteVideoRef.current) {
      remoteVideoRef.current.poster = 'https://via.placeholder.com/640x480?text=Remote+Participant';
    }
    
  }, [isInRoom]);
  
  // Handle leaving the room
  const handleLeaveRoom = async () => {
    if (!isInRoom) return;
    
    try {
      await VideoConferencingService.leaveRoom();
      setIsInRoom(false);
      setRoomId(null);
      setParticipants([]);
      
      if (onRoomLeft) onRoomLeft();
    } catch (err: any) {
      const errorMessage = `Failed to leave room: ${err.message || 'Unknown error'}`;
      setError(errorMessage);
      if (onError) onError(errorMessage);
    }
  };
  
  // Handle toggling audio
  const handleToggleAudio = async () => {
    try {
      await VideoConferencingService.toggleAudio(!isAudioEnabled);
      setIsAudioEnabled(!isAudioEnabled);
    } catch (err: any) {
      const errorMessage = `Failed to toggle audio: ${err.message || 'Unknown error'}`;
      setError(errorMessage);
      if (onError) onError(errorMessage);
    }
  };
  
  // Handle toggling video
  const handleToggleVideo = async () => {
    try {
      await VideoConferencingService.toggleVideo(!isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    } catch (err: any) {
      const errorMessage = `Failed to toggle video: ${err.message || 'Unknown error'}`;
      setError(errorMessage);
      if (onError) onError(errorMessage);
    }
  };
  
  // Handle toggling screen sharing
  const handleToggleScreenShare = async () => {
    try {
      await VideoConferencingService.toggleScreenShare(!isScreenSharing);
      setIsScreenSharing(!isScreenSharing);
      
      // Simulate screen sharing
      if (screenShareRef.current) {
        if (!isScreenSharing) {
          screenShareRef.current.poster = 'https://via.placeholder.com/1280x720?text=Screen+Sharing';
        } else {
          screenShareRef.current.poster = '';
        }
      }
    } catch (err: any) {
      const errorMessage = `Failed to toggle screen sharing: ${err.message || 'Unknown error'}`;
      setError(errorMessage);
      if (onError) onError(errorMessage);
    }
  };
  
  // Render loading state
  if (!isInitialized || isJoining) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">{isInitialized ? 'Joining room...' : 'Initializing video conferencing...'}</p>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg">
        <div className="text-accent mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-accent font-medium mb-2">Error</p>
        <p className="text-gray-600 text-center">{error}</p>
        <button 
          className="btn-primary mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  // Render video conferencing UI
  return (
    <div className="relative">
      <div className="absolute inset-0 arabesque-geometric" style={{ opacity: 0.05 }}></div>
      
      <div className="bg-white shadow-sm rounded-lg p-6 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-primary">
            {isHost ? 'Hosting Interview' : 'Interview Session'}: {roomName}
          </h2>
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Live
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main video area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
              {isScreenSharing ? (
                <video 
                  ref={screenShareRef}
                  className="w-full h-full object-cover"
                  poster="https://via.placeholder.com/1280x720?text=Screen+Sharing"
                  autoPlay
                  playsInline
                  muted
                ></video>
              ) : (
                <video 
                  ref={remoteVideoRef}
                  className="w-full h-full object-cover"
                  poster="https://via.placeholder.com/640x480?text=Remote+Participant"
                  autoPlay
                  playsInline
                ></video>
              )}
              
              {/* Participant name */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm">
                {participants.length > 1 ? participants[0].name : 'Waiting for participant...'}
              </div>
            </div>
          </div>
          
          {/* Sidebar with local video and participants */}
          <div className="space-y-4">
            {/* Local video */}
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
              <video 
                ref={localVideoRef}
                className="w-full h-full object-cover"
                poster="https://via.placeholder.com/320x240?text=Your+Camera"
                autoPlay
                playsInline
                muted
              ></video>
              
              {/* Local participant name */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm">
                {participantName} (You)
              </div>
              
              {/* Video/audio status indicators */}
              <div className="absolute top-4 right-4 flex space-x-2">
                {!isVideoEnabled && (
                  <div className="bg-red-500 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                )}
                
                {!isAudioEnabled && (
                  <div className="bg-red-500 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Participants list */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-3">Participants ({participants.length})</h3>
              <div className="space-y-2">
                {participants.map(participant => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">
                        {participant.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700">{participant.name}</span>
                    </div>
                    <div className="flex space-x-1">
                      {!participant.isAudioEnabled && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      )}
                      {!participant.isVideoEnabled && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.94
(Content truncated due to size limit. Use line ranges to read in chunks)