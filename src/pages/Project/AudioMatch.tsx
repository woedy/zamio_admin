// src/components/AudioMatch.jsx

import React, { useState } from 'react';
import axios from 'axios';
import MatchConfidenceChart from './MatchConfidenceChart';

const AudioMatch = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
    setMatchResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioFile) return;

    const formData = new FormData();
    formData.append('audio_file', audioFile);

    setLoading(true);
    setMatchResult(null);

    try {
      const response = await axios.post('http://localhost:8000/api/monitor/detect-audio-match/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMatchResult(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
      setMatchResult({ error: 'Something went wrong.' });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🎵 Match Audio Snippet</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button type="submit" disabled={!audioFile || loading} style={{ marginLeft: '1rem' }}>
          {loading ? 'Matching...' : 'Upload & Match'}
        </button>
      </form>

      {matchResult && (
  <div style={{ marginTop: '2rem' }}>
    {matchResult.match ? (
      <div>
        <h3>✅ Match Found</h3>
        <p><strong>Title:</strong> {matchResult.song_name}</p>
        <p><strong>Offset (seconds):</strong> {matchResult.offset_seconds}s</p>
        <p><strong>Matched Hashes:</strong> {matchResult.hashes_matched_in_input}</p>
        <p><strong>Total Query Hashes:</strong> {matchResult.input_total_hashes}</p>
        <p><strong>Total Song Hashes:</strong> {matchResult.fingerprinted_hashes_in_db}</p>

        <MatchConfidenceChart
          inputConfidence={matchResult.input_confidence}
          dbConfidence={matchResult.fingerprinted_confidence}
        />

        <p><strong>Total Time:</strong> {matchResult.total_time}s</p>
      </div>
    ) : matchResult.error ? (
      <div style={{ color: 'red' }}>{matchResult.error}</div>
    ) : (
      <div>
        ❌ No match found.
        {matchResult.reason && (
          <div style={{ marginTop: '0.5rem', color: 'gray' }}>
            Reason: {matchResult.reason}
            <p><strong>Input COnfidence:</strong> {matchResult.input_confidence}s</p>
            <p><strong>DB COnfidence:</strong> {matchResult.db_confidence}s</p>
          </div>
        )}
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default AudioMatch;
