import { Dropbox } from 'dropbox';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import FileUpload from './upload';
import { Button, Input, Form } from 'rsuite';

const FolderTools = ({ currentPath, token, update }: FolderTools) => {
  const [showUpload, setShowUpload] = useState(false);
  const router = useRouter();
  const changeFoldername = useRef<any>(null);
  const changeFoldeId = useRef<any>(null);

  const createFolder = async () => {
    const { path } = currentPath;
    if (!changeFoldeId.current.value || !changeFoldername.current.value)
      return alert('نام و id یوشه باید حتما پر شود');
    try {
      const dropBox = new Dropbox({ accessToken: token });
      const result = await dropBox.filesCreateFolderV2({
        path: `${path}/${changeFoldeId.current.value}-${changeFoldername.current.value}`,
        autorename: false,
      });
      router.reload();
    } catch (error) {}
  };

  return (
    <>
      <div dir="rtl">
        <Button size="xs" onClick={() => setShowUpload(!showUpload)} appearance="ghost">
          {!showUpload ? 'برو به آپلود فایل' : 'برو به اضافه کردن پوشه'}
        </Button>
      </div>
      <br />
      <br />
      <br />
      <Form>
        {!showUpload ? (
          <Form.Group controlId="addFolder">
            <p>اضافه کردن پوشه</p>
            <br />
            <Input size="xs" style={{ width: 224 }} type="text" placeholder="نام فولدر" ref={changeFoldername} />
            <Input size="xs" style={{ width: 224 }} type="text" placeholder="id پوشه" ref={changeFoldeId} />
            <Button size="xs" onClick={createFolder}>ایجاد فولدر</Button>
            <br />
            <br />
            <br />
          </Form.Group>
        ) : (
          <Form.Group controlId="uploadForm">
            <p>آپلود فایل جدید</p>
            <br />
            <FileUpload
              token={token}
              currentPath={currentPath}
              update={update}
            />
          </Form.Group>
        )}
      </Form>
    </>
  );
};

interface FolderTools {
  currentPath: { path: string };
  token: string;
  update?: { rev: string; name: string };
}

export default FolderTools;
