/**
 * Describes an item (file or directory) contained within the workspace
 * -The File Navigator is responsible for displaying these items
 * -The File Editor is responsible for mutating the contents of these items
 */

export default class WorkspaceItem {
  constructor(path) {
    this.relativePath = path;
  }

  get displayName() {
    // SEE: https://stackoverflow.com/a/423385/1477226
    return this.relativePath.replace(/^.*[\\\/]/, '');
  }
}
