import WorkspaceItem from './WorkspaceItem';
import WorkspaceFile from './WorkspaceFile';

const fs = window.require('fs');

export const WorkspaceRefreshedChildren = (dir) => {
  const parentDirPath = dir.relativePath;
  const files = fs.readdirSync(parentDirPath);
  const children = files.map((fileName) => {
    const filePath = `${parentDirPath}/${fileName}`;
    const isDir = fs.lstatSync(filePath).isDirectory();
    const child = isDir ? new WorkspaceDirectory(filePath) : new WorkspaceFile(filePath);
    return child;
  });

  return children;
};

export default class WorkspaceDirectory extends WorkspaceItem {
  constructor(path) {
    super(path);
    this.isCollapsed = true;
    this.children = WorkspaceRefreshedChildren(this);
  }

  expand() {
    this.isCollapsed = false;
    this.children = WorkspaceRefreshedChildren(this);
    return this.children;
  }

  collapse() {
    this.isCollapsed = true;
    this.children = [];
  }
}
