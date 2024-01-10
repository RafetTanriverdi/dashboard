import { parse } from "path-to-regexp";
import { hasArrayElement } from "../utils/array-utils";
import { generateShortUID } from "../utils/object-utils";

const flatten = (children, extractFn, outputArr) => {
  if (hasArrayElement(children)) {
    children.forEach((el) => {
      outputArr.push(el);
      flatten(extractFn(el), extractFn, outputArr);
    });
  }
};

const flatArray = (treeStructure, extractFn) => {
  const outputArr = [];
  flatten(extractFn(treeStructure), extractFn, outputArr);
  return outputArr;
};

export const flatRoutes = (routes) => {
  const extractChildren = (x) => x.children;
  const treeRoutesRootNode = {
    path: "dump",
    title: "dump",
    modulePath: "dump",
    children: routes,
  };
  const flattenRoutes = flatArray(treeRoutesRootNode, extractChildren);
  return flattenRoutes;
};

//===========
//Its similar with.. https://v5.reactrouter.com/web/api/generatePath
//Below can be used for Extra EncodingWith URI Components if Params not UniqueIds
export function computePath(pathString, params) {
  const parsedPathString = parse(pathString);
  let constructedPath = "";

  for (let i = 0; i < parsedPathString.length; i++) {
    let parsedPathPiece = parsedPathString[i];

    if (typeof parsedPathPiece == "string") {
      constructedPath = constructedPath + parsedPathPiece;
    } else {
      let pathVarFromParams = params[parsedPathPiece.name];
      constructedPath =
        constructedPath + "/" + encodeURIComponent(pathVarFromParams);
    }
  }

  return constructedPath;
}

export function computePathWithRandomId(pathString) {
  const parsedPathString = parse(pathString);
  let constructedPath = "";

  for (let i = 0; i < parsedPathString.length; i++) {
    let parsedPathPiece = parsedPathString[i];

    if (typeof parsedPathPiece == "string") {
      constructedPath = constructedPath + parsedPathPiece;
    } else {
      let pathVarFromParams = generateShortUID();
      constructedPath =
        constructedPath + "/" + encodeURIComponent(pathVarFromParams);
    }
  }

  return constructedPath;
}
