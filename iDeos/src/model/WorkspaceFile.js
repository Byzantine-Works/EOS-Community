import WorkspaceItem from './WorkspaceItem';

/**
 *
 *
 * @interface WorkspaceFile
 * @extends {WorkspaceItem}
 */
export default class WorkspaceFile extends WorkspaceItem {
  constructor(path) {
    super(path);
    this.contents = null;
    this.fileType = null;
    this.isDirty = false;
  }
}
