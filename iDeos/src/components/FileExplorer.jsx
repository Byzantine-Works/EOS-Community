import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

const chokidar = window.require('chokidar');
const fs = window.require('fs');
const path = require('path');

const render = (props) => {
  const rootDir = props.projectRoot;
  const rootPath = rootDir.relativePath;

  console.log("root path in file explorer: ", rootPath);

  const renderDirectory = workspaceDir =>
    workspaceDir.children.map((item) => {
      const itemPath = item.relativePath;
      const itemInfo = fs.statSync(itemPath);
      console.log(itemInfo)

      if (itemInfo.isDirectory()) {
        const children = fs.readdirSync(itemPath);

        return { name: item.displayName, links: renderDirectory(item), isExpanded: false };

        // link.links = renderChildrenFor(filePath);
        // link.isExpanded = true; // TODO: set this based on the isCollapsed property in WorkspaceDirectory
      } else if (itemInfo.isFile()) {
        return {
          name: item.displayName,
          key: itemPath,
          onClick: (e, key) => props.openFile(key.key),
        };
      }
      // don't accept unknown items in the project root
      throw new Error('Unknown item found in filesystem located at the project root directory!');
    });

  const groups = typeof rootDir === 'object' ? [{ links: renderDirectory(rootDir) }] : [];
  // console.log(`groups: ${JSON.stringify(groups, null, 2)}`);

  chokidar.watch(rootPath, { ignoreInitial: true }).on('all', (event, path) => {
    props.projectFilesystemChange({ event, path });
  });

  console.log("group: ", groups)
  return (
    <div
      style={{
        height: '100%',
        overflow: 'scroll',
        backgroundColor: '#444',
      }}
    >
      <Nav className="ms-Nav root-72" id="file-explorer" groups={groups} />
    </div>
  );
};

render.propTypes = {
  projectRoot: PropTypes.object.isRequired,
  projectFilesystemChange: PropTypes.func.isRequired,
};

export default render;
