export class TreeNode<T> {
  id: string;
  value: T;
  parent?: TreeNode<T>;
  children?: TreeNode<T>[];

  constructor(id: string, value: T, parent: TreeNode<T> = null) {
    this.id = id;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

export class Tree<T> {
  root: TreeNode<T>;

  constructor(rootId: string, value: T) {
    this.root = new TreeNode(rootId, value);
  }

  *preOrderTraversal(node = this.root): Generator<TreeNode<T>> {
    yield node;
    if (node.children.length) {
      for (const child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root): Generator<TreeNode<T>> {
    if (node.children.length) {
      for (const child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert({ parentId, id }: { parentId: string; id: string }, value: T) {
    const existingKey = this.find(id);

    if (existingKey) {
      throw new Error(`Cannot insert node. ID ${id} already exists in tree.`);
    }

    for (const node of this.preOrderTraversal()) {
      if (node.id === parentId) {
        node.children.push(new TreeNode(id, value, node));
        return true;
      }
    }
    return false;
  }

  remove(id: string) {
    for (const node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.id !== id);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(id: string) {
    for (const node of this.preOrderTraversal()) {
      if (node.id === id) return node;
    }
    return undefined;
  }
}
