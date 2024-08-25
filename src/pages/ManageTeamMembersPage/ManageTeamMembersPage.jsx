import { useCallback } from "react";
import ReactFlow, {
  //addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Panel,
} from "reactflow";
import dagre from "dagre";

import { initialNodes, initialEdges } from "./nodes-edges.js";

import "reactflow/dist/style.css";
import MainLayout from "@rt/layout/MainLayout/MainLayout.jsx";
import RTSider from "@rt/components/RTSider/RTSider.jsx";
import { Segmented } from "antd";
import { ArrowDownOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // const onConnect = useCallback(
  //   (params) =>
  //     setEdges((eds) =>
  //       addEdge(
  //         { ...params, type: ConnectionLineType.SmoothStep, animated: true },
  //         eds
  //       )
  //     ),
  //   []
  // );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes, edges]
  );
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Panel
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: " 0 10px",
          }}
        >
          <Typography.Title
            level={3}
          >
            Your Team
          </Typography.Title>
          <Segmented
            style={{ margin: "10px" }}
            options={[
              { value: "TB", label: "Vertical", icon: <ArrowDownOutlined /> },
              {
                value: "LR",
                label: "Horizontial",
                icon: <ArrowRightOutlined />,
              },
            ]}
            onChange={(e) => onLayout(e)}
          />
        </Panel>
        <MiniMap />
        <Controls />
      </ReactFlow>
    </>
  );
};

const ManageTeamMembersPageContainer = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <LayoutFlow />
    </div>
  );
};

const ManageTeamMembersPage = (props) => {
  const { title } = props.routeData;
  return (
    <>
      <MainLayout
        title={title}
        sider={<RTSider />}
        content={<ManageTeamMembersPageContainer />}
      />
    </>
  );
};

export default ManageTeamMembersPage;
