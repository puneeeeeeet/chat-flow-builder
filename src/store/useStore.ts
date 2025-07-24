import { create } from 'zustand';
import {
  Edge,
  Node,
} from 'reactflow';
import { nanoid } from 'nanoid';

export type TextNodeData = {
  label: string;
};

export type RFState = {
  nodes: Node<TextNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  addTextNode: (position: { x: number; y: number }) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
};

const useStore = create<RFState>((set) => ({
  nodes: [
    {
      id: nanoid(),
      type: 'textNode',
      position: { x: 100, y: 100 },
      data: { label: 'test message 1' },
    },
  ],
  edges: [],
  selectedNodeId: null,

  addTextNode: (position) => {
    const newNode: Node<TextNodeData> = {
      id: nanoid(),
      type: 'textNode',
      position,
      data: { label: 'textNode' },
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  setSelectedNodeId: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },

  updateNodeLabel: (nodeId, label) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, label } };
        }
        return node;
      }),
    }));
  },
}));

export default useStore;