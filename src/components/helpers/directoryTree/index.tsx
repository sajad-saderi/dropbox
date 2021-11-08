export type { Dropbox } from 'dropbox/types';

interface DirectoryTree {
  id: string;
  children: Array<DirectoryTree>;
  isOpen: boolean;
  parentId: string | null;
}
let test = [];

export const directoryTree = (entry: any[], parentId: any) => {
  test = entry.map((item, index) => ({
    id: item.id,
    isOpen: false,
    parentId,
    children: [],
    index,
    isFolder: item['.tag'] === 'folder' ? true : false,
  }));
  console.log('rwsr', test);
};
