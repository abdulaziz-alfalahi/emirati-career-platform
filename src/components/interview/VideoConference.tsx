import React, { useState, useEffect } from 'react';

interface Participant {
  id: string;
  name: string;
  isHost: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
}

export default function VideoConference() {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{name: string, message: string, time: string}[]>([]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isJoined) {
      // In a real implementation, this would connect to a video conferencing API
      // For now, we'll simulate adding participants after a delay
      const timer = setTimeout(() => {
        setParticipants([
          {
            id: '1',
            name: userName,
            isHost,
            isMuted,
            isVideoOn,
            isScreenSharing: false
          },
          {
            id: '2',
            name: 'Ahmed Al Hashemi',
            isHost: !isHost,
            isMuted: false,
            isVideoOn: true,
            isScreenSharing: false
          }
        ]);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isJoined, userName, isHost, isMuted, isVideoOn]);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomId.trim()) {
      setError('Room ID is required');
      return;
    }
    
    if (!userName.trim()) {
      setError('Your name is required');
      return;
    }
    
    setError(null);
    setIsJoined(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      name: userName,
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
  };

  const handleLeaveRoom = () => {
    // In a real implementation, this would disconnect from the video conferencing API
    setIsJoined(false);
    setParticipants([]);
    setChatMessages([]);
    setNotes('');
  };

  if (!isJoined) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#007A3D', textAlign: 'center' }}>Join Interview Room</h1>
        
        {error && (
          <div style={{ backgroundColor: '#FFEBEE', color: '#B71C1C', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <form onSubmit={handleJoinRoom}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Room ID</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isHost}
                  onChange={(e) => setIsHost(e.target.checked)}
                  style={{ marginRight: '0.5rem' }}
                />
                Join as host (interviewer)
              </label>
            </div>
            
            <button
              type="submit"
              style={{ 
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#007A3D',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Join Room
            </button>
          </form>
        </div>
        
        <div style={{ marginTop: '2rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Interview Tips</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>For Candidates</h3>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Test your camera and microphone before joining</li>
              <li>Find a quiet, well-lit location</li>
              <li>Dress professionally</li>
              <li>Have your resume and notes ready</li>
              <li>Prepare questions to ask the interviewer</li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>For Interviewers</h3>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Review the candidate's resume beforehand</li>
              <li>Prepare structured questions</li>
              <li>Take notes during the interview</li>
              <li>Allow time for the candidate to ask questions</li>
              <li>Provide clear next steps at the end</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#007A3D', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Room: {roomId}</h1>
          <p>Duration: 00:15:32</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setIsMuted(!isMuted)}
            style={{ 
              backgroundColor: isMuted ? '#B71C1C' : 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            style={{ 
              backgroundColor: !isVideoOn ? '#B71C1C' : 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            {isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
          </button>
          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            style={{ 
              backgroundColor: isScreenSharing ? '#B71C1C' : 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
          </button>
          <button
            onClick={handleLeaveRoom}
            style={{ 
              backgroundColor: '#B71C1C',
              color: 'white',
              border: 'none',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Leave Room
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Video area */}
        <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f5f5f5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', height: '100%' }}>
            {participants.map((participant) => (
              <div 
                key={participant.id}
                style={{ 
                  backgroundColor: 'black',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '16/9'
                }}
              >
                {participant.isVideoOn ? (
                  // This would be a real video stream in production
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img 
                      src={`https://i.pravatar.cc/300?u=${participant.id}`}
                      alt={participant.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )  : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#007A3D', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                      {participant.name.charAt(0)}
                    </div>
                  </div>
                )}
                
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{participant.name} {participant.isHost ? '(Host)' : ''}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {participant.isMuted && (
                      <span>🔇</span>
                    )}
                    {participant.isScreenSharing && (
                      <span>📊</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div style={{ width: '300px', backgroundColor: 'white', borderLeft: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Participants ({participants.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {participants.map((participant) => (
                <div key={participant.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{participant.name} {participant.isHost ? '(Host)' : ''}</span>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {participant.isMuted && (
                      <span>🔇</span>
                    )}
                    {!participant.isVideoOn && (
                      <span>📵</span>
                    )}
                    {participant.isScreenSharing && (
                      <span>📊</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderBottom: '1px solid #eee' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Chat</h2>
            </div>
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
              {chatMessages.length === 0 ? (
                <p style={{ color: '#666', textAlign: 'center' }}>No messages yet</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {chatMessages.map((msg, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 'bold' }}>{msg.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>{msg.time}</span>
                      </div>
                      <p>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ padding: '1rem' }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem 0 0 0.25rem' }}
                />
                <button
                  type="submit"
                  style={{ 
                    backgroundColor: '#007A3D',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0 0.25rem 0.25rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
          
          {isHost && (
            <div style={{ padding: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Interview Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes during the interview..."
                style={{ width: '100%', height: '150px', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', resize: 'none' }}
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
