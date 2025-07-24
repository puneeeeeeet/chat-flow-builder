import React from 'react';

const nodeTypesConfig = [
  {
    type: 'textNode',
    label: '✉️ Message',
  },
];

const NodesPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#4A5568' }}>Nodes Panel</div>
      {nodeTypesConfig.map(({ type, label }) => (
        <div
          key={type}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
          style={{
            border: '2px solid #6366F1',
            borderRadius: '8px',
            padding: '15px',
            textAlign: 'center',
            cursor: 'grab',
            marginBottom: '10px',
            backgroundColor: 'white'
          }}
        >
          {label}
        </div>
      ))}
    </aside>
  );
};

export default NodesPanel;