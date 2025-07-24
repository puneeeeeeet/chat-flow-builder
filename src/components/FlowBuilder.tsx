import React, { useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useStore from '../store/useStore';
import TextNode from './nodes/TextNode';

const nodeTypes = {
  textNode: TextNode,
};

const FlowBuilder = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  
  const { setSelectedNodeId, addTextNode } = useStore();

  const [reactFlowInstance, setReactFlowInstance] = React.useState<any>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      useStore.setState({ nodes: applyNodeChanges(changes, useStore.getState().nodes) });
    },
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      useStore.setState({ edges: applyEdgeChanges(changes, useStore.getState().edges) });
    },
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      useStore.setState({ edges: addEdge(connection, useStore.getState().edges) });
    },
    []
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );
  
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      addTextNode(position);
    },
    [reactFlowInstance, addTextNode]
  );

  const isValidConnection = useCallback(
    (connection: Connection) => {
      const sourceNodeEdges = useStore.getState().edges.filter(edge => edge.source === connection.source);
      return sourceNodeEdges.length < 1;
    },
    []
  );
  
  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: '100%', width: '75%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        isValidConnection={isValidConnection}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);