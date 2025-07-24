import { useMemo } from 'react';
import useStore from '../store/useStore';
import NodesPanel from './panels/NodesPanel';
import SettingsPanel from './panels/SettingsPanel';

const Sidebar = () => {
  const nodes = useStore((state) => state.nodes);
  const selectedNodeId = useStore((state) => state.selectedNodeId);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId),
    [nodes, selectedNodeId]
  );

  return (
    <div
      style={{
        padding: '15px',
        borderLeft: '1px solid #E2E8F0',
        width: '25%',
      }}
    >
      {selectedNode ? (
        <SettingsPanel selectedNode={selectedNode} />
      ) : (
        <NodesPanel />
      )}
    </div>
  );
};

export default Sidebar;