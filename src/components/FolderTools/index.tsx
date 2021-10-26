import { Dropbox } from 'dropbox';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import FileUpload from './upload';

const FolderTools = ({ currentPath, token }: FolderTools) => {
  const router = useRouter();
  const changeFoldername = useRef<any>(null);
  const createFolder = async () => {
    const { path } = currentPath;
    console.log(path, changeFoldername.current.value); 
    try {
      const dropBox = new Dropbox({ accessToken: token });
      const result = await dropBox.filesCreateFolderV2({
        path: `${path}/${changeFoldername.current.value}`,
        autorename: false,
      });
      router.reload();
    } catch (error) {}
  };

  return (
    <>
      <div>
        <input type="text" placeholder="نام فولدر" ref={changeFoldername} />
        <button onClick={createFolder}>ایجاد فولدر</button>
      </div>
      <FileUpload token={token} currentPath={currentPath} />
    </>
  );
};

interface FolderTools {
  currentPath: { path: string };
  token: string;
}

export default FolderTools;
