export interface treeNode {
  catId: number,
  catName: string
  level: number
  checked: boolean,
  childCats: Array<treeNode>
}