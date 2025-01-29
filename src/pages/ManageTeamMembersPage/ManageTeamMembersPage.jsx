import { useCallback } from "react";
import ReactFlow, {
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from "reactflow";
import dagre from "dagre";

import "reactflow/dist/style.css";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTSider from "@rt/components/RTSider/RTSider";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";

// Roller
const roleOptions = [
  { name: "Owner", rank: 1, permissions: ["All:Access"] },
  {
    name: "Admin",
    rank: 2,
    permissions: [
      "Product:Create",
      "Product:Read",
      "Product:Update",
      "Product:Delete",
      "User:Manage",
    ],
  },
  {
    name: "Product Manager",
    rank: 3,
    permissions: ["Product:Create", "Product:Read", "Product:Update"],
  },
  {
    name: "Customer Service",
    rank: 4,
    permissions: ["Customer:Read", "Order:Update", "Order:Refund"],
  },
  {
    name: "User",
    rank: 5,
    permissions: ["Product:Read", "Order:Read", "Customer:Details"],
  },
];

// Kullanıcılar
const users = [
  { id: "user1", name: "Alice", roles: ["Owner"] },
  { id: "user2", name: "Bob", roles: ["Admin"] },
  { id: "user3", name: "Charlie", roles: ["Product Manager", "User"] },
  { id: "user4", name: "Diana", roles: ["Customer Service", "User"] },
];

// Dagre Konfigürasyonu
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

// Düğümleri ve Kenarları Dinamik Oluşturma
const generateNodesAndEdges = (roles, users) => {
  const nodes = roles.map((role) => ({
    id: role.name,
    data: { label: role.name },
    position: { x: 0, y: 0 },
    style: { background: "#D6EAF8", border: "1px solid #1F618D" },
  }));

  users.forEach((user) => {
    nodes.push({
      id: user.id,
      data: { label: `${user.name}\nRoles: ${user.roles.join(", ")}` },
      position: { x: 0, y: 0 },
      style: { background: "#FADBD8", border: "1px solid #CB4335" },
    });
  });

  const edges = users.flatMap((user) =>
    user.roles.map((role) => ({
      id: `edge-${user.id}-${role}`,
      source: role,
      target: user.id,
      type: "smoothstep",
    }))
  );

  return getLayoutedElements(nodes, edges);
};

// Ana Bileşen
const RoleHierarchyFlow = () => {
  const { nodes, edges } = generateNodesAndEdges(roleOptions, users);
  const [currentNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [currentEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  const {data} = useQuery({
    queryKey: ["team-members"],
    queryFn:() => {
      return axiosInstance.get(ENDPOINTS.USER.TEAM).then((res) => res.data);
    },
  });

  console.log(data);
  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      currentNodes,
      currentEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [currentNodes, currentEdges]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={currentNodes}
        edges={currentEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Controls />
        <MiniMap />
        <button
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: "5px 10px",
            backgroundColor: "#3498DB",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={onLayout}
        >
          Reorganize Layout
        </button>
      </ReactFlow>
    </div>
  );
};

const ManageTeamMembersPageContainer = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <RoleHierarchyFlow />
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
