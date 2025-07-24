import React, { useState } from 'react';
import FlowBuilder from './components/FlowBuilder';
import Sidebar from './components/Sidebar';
import useStore from './store/useStore';
import './index.css';

function App() {

  const [feedbackMessage, setFeedbackMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  const { nodes, edges } = useStore();

  const handleSave = () => {
 
    if (nodes.length <= 1) {
      setFeedbackMessage({ type: 'success', text: 'Flow saved successfully!' });
      setTimeout(() => setFeedbackMessage(null), 3000); // Hide message after 3s
      console.log('Flow saved:', { nodes, edges });
      return;
    }

    const nodesWithEmptyTargets = nodes.filter(node => {
        const isTarget = edges.some(edge => edge.target === node.id);
        return !isTarget;
    });

    if (nodesWithEmptyTargets.length > 1) {
      setFeedbackMessage({ type: 'error', text: 'Cannot save Flow: More than one node has an empty target.' });
      setTimeout(() => setFeedbackMessage(null), 3000);
    } else {
      setFeedbackMessage({ type: 'success', text: 'Flow saved successfully!' });
      setTimeout(() => setFeedbackMessage(null), 3000);
      console.log('Flow saved:', { nodes, edges });
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          padding: '15px 20px',
          background: '#F9FAFB',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        {feedbackMessage && (
            <div style={{
                color: feedbackMessage.type === 'error' ? '#EF4444' : '#10B981',
                background: feedbackMessage.type === 'error' ? '#FEE2E2' : '#D1FAE5',
                padding: '8px 16px',
                borderRadius: '8px',
                marginRight: '20px',
                fontWeight: '500'
            }}>
                {feedbackMessage.text}
            </div>
        )}
        <button
          onClick={handleSave}
          style={{
            padding: '8px 20px',
            border: '1px solid #6366F1',
            borderRadius: '8px',
            background: 'white',
            color: '#6366F1',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Save Changes
        </button>
      </header>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <FlowBuilder />
        <Sidebar />
      </div>
    </div>
  );
}

export default App;