import { useRef } from 'react';
import { useRouter } from 'next/router';
import { Dropbox, Error, files } from 'dropbox'; // eslint-disable-line no-unused-vars

const FileUpload = ({ token, currentPath }: FolderTools) => {
  const router = useRouter();
  const fileref = useRef<any>(null);
  const filename = useRef<any>(null);
  const uploadingFile = async () => {
    if (filename.current.value === '') return;
    const { path } = currentPath;
    // fileref.current.files[0].name = 'sdfdsfs';
    console.log({
      path: path,
      contents: fileref.current.files[0],
    });
    const fileExtension = fileref.current.files[0].name.split('.').pop();
    try {
      const dropBox = new Dropbox({ accessToken: token });
      const result = await dropBox.filesUpload({
        contents: fileref.current.files[0],
        path: `${path}/${filename.current.value}.${fileExtension}`,
        autorename: false,
        mode: { '.tag': 'add' },
      });
      router.reload();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <input type="file" name="test" ref={fileref} />
      <input type="text" ref={filename} />
      <button onClick={uploadingFile}>آپلود فایل</button>
    </>
  );
};

interface FolderTools {
  currentPath: { path: string };
  token: string;
}

export default FileUpload;
