import { Handle, Position, NodeProps } from 'reactflow';
import { TextNodeData } from '../../store/useStore';

function TextNode({ data, selected }: NodeProps<TextNodeData>) {
  return (
    <div
      style={{
        border: `1px solid ${selected ? '#6366F1' : '#E2E8F0'}`,
        borderRadius: '8px',
        padding: '10px 15px',
        backgroundColor: 'white',
        width: 200,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      
      <Handle type="target" position={Position.Left} id="a" />

    
      <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#4A5568' }}>
        ✉️ Send Message
      </div>
      <div style={{ marginTop: '5px', fontSize: '14px', color: '#2D3748' }}>
        {data.label}
      </div>


      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}

export default TextNode;