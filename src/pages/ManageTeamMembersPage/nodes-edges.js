const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "CTO" },
    position,
  },
  {
    id: "3",
    data: { label: "Project Manager" },
    position,
  },
  {
    id: "2",
    data: { label: "HR Manager" },
    type: "output",
    position,
  },
  {
    id: "4",
    data: { label: "Accountant " },
    type: "output",
    position,
  },

  {
    id: "3a",
    data: { label: "Front-end Team Lead" },
    position,
  },
  {
    id: "3a1",
    data: { label: "Junior React Developer" },
    type: "output",
    position,
  },
  {
    id: "3a2",
    data: { label: "Senior Software Developer" },
    type: "output",
    position,
  },
  {
    id: "3b",
    data: { label: "Back-end Team Lead" },
    position,
  },
  {
    id: "3b1",
    data: { label: " Senior Nodejs Developer " },
    type: "output",
    position,
  },
  {
    id: "3b2",
    data: { label: "Junior Nodejs Developer" },
    type: "output",
    position,
  },
  // {
  //   id: "2c",
  //   data: { label: "AWS Cloud Engineer" },
  //   type: "output",
  //   position,
  // },
  // {
  //   id: "2d",
  //   data: { label: "DevOps Engineer" },
  //   type: "output",
  //   position,
  // },
];

export const initialEdges = [
  { id: "e12", source: "1", target: "2", type: edgeType, animated: false },
  { id: "e13", source: "1", target: "3", type: edgeType, animated: false },
  { id: "e14", source: "1", target: "4", type: edgeType, animated: false },
  { id: "e2a", source: "3", target: "3a", type: edgeType, animated: false },
  { id: "e2b", source: "3a", target: "3a1", type: edgeType, animated: false },
  { id: "e2c", source: "3a", target: "3a2", type: edgeType, animated: false },
  { id: "e2d", source: "3", target: "3b", type: edgeType, animated: false },
  { id: "e2e", source: "3b", target: "3b1", type: edgeType, animated: false },
  { id: "e2f", source: "3b", target: "3b2", type: edgeType, animated: false },
  { id: "e2g", source: "3", target: "3c", type: edgeType, animated: false },
  { id: "e2h", source: "3", target: "3d", type: edgeType, animated: false },
];
