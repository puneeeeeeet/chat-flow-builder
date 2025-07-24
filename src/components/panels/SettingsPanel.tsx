
import useStore from '../../store/useStore';
import { Node } from 'reactflow';
import { TextNodeData } from '../../store/useStore';

const SettingsPanel = ({ selectedNode }: { selectedNode: Node<TextNodeData> }) => {
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  const onLabelChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeLabel(selectedNode.id, event.target.value);
  };

  return (
    <aside>
       <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#4A5568' }}>Settings Panel</div>
       <div>
         <label style={{display: 'block', marginBottom: '5px', color: '#4A5568'}}>Text</label>
         <textarea
           rows={4}
           value={selectedNode.data.label}
           onChange={onLabelChange}
           style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #CBD5E0'}}
         />
       </div>
    </aside>
  );
};

export default SettingsPanel;