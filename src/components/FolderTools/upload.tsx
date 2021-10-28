import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Dropbox, Error, files } from 'dropbox'; // eslint-disable-line no-unused-vars
import { Button, Input, Cascader, Form } from 'rsuite';

const data = [
  { value: 'کارت ملی پشت', label: 'کارت ملی پشت' },
  { value: 'کارت ملی رو', label: 'کارت ملی رو' },
  { value: 'شناسنامه ', label: 'شناسنامه ' },
  {
    value: 'شناسنامه همسر.فامیل .معرف....',
    label: 'شناسنامه همسر.فامیل .معرف....',
  },
  { value: 'سفته ', label: 'سفته ' },
  { value: 'چک', label: 'چک' },
  { value: 'گواهی شغلی ', label: 'گواهی شغلی ' },
  { value: 'پروانه کسب ', label: 'پروانه کسب ' },
  { value: 'مجوز ', label: 'مجوز ' },
  { value: 'سند ملک جدید و قدیم ', label: 'سند ملک جدید و قدیم ' },
  { value: 'اجاره نامه پشت ', label: 'اجاره نامه پشت ' },
  { value: 'اجاره نامه رو', label: 'اجاره نامه رو' },
  { value: 'سند ماشین', label: 'سند ماشین' },
  { value: 'کارت خودرو پشت', label: 'کارت خودرو پشت' },
  { value: 'کارت خودرو رو ', label: 'کارت خودرو رو ' },
  { value: 'بیمه نامه شخص ثالث', label: 'بیمه نامه شخص ثالث' },
  { value: 'کارت بانکی ', label: 'کارت بانکی ' },
  { value: 'شبا ', label: 'شبا ' },
  { value: 'فیش آب ', label: 'فیش آب ' },
  { value: 'برق ', label: 'برق ' },
  { value: 'گاز', label: 'گاز' },
  { value: 'پاسپورت', label: 'پاسپورت' },
  { value: 'کارت اقامت ', label: 'کارت اقامت ' },
];

const FileUpload = ({ token, currentPath, update }: FolderTools) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [dropDownValue, setDropDownValue] = useState<any>(null);
  const router = useRouter();
  const fileref = useRef<any>(null);
  const filename = useRef<any>(null);

  useEffect(() => {
    if (!update?.name) {
      setIsUpdating(false);
    } else if (update?.name) {
      setIsUpdating(true);
    }
  }, [update]);

  const checkFormat = (newFile: string, oldFile: string) => {
    if (newFile !== oldFile) {
      alert(`فرمت فایل باید ${oldFile} باشد.`);
      return false;
    }
    return true;
  };

  const uploadingFile = async () => {
    if (fileref.current.files.length === 0) {
      return alert('وارد کردن فایل برای سند اجباری است.');
    } else if (!update?.name && !dropDownValue) {
      return alert('وارد کردن نام برای سند اجباری است.');
    }

    let fileName = dropDownValue || update?.name.split('.').shift();
    const fileExtension = fileref.current.files[0].name.split('.').pop();
    if (update?.name) {
      const oldExtension: any = update.name.split('.').pop();
      if (!checkFormat(fileExtension, oldExtension)) return;
    }
    const { path } = currentPath;
    let mode: any = { '.tag': 'add' };
    if (update?.rev) {
      mode = { update: update.rev, '.tag': 'update' };
    }
    try {
      const dropBox = new Dropbox({ accessToken: token });
      const result = await dropBox.filesUpload({
        contents: fileref.current.files[0],
        path: `${path}/${fileName}.${fileExtension}`,
        autorename: false,
        mode: mode,
      });
      router.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="upload file">
        <Form.ControlLabel> انتخاب فایل</Form.ControlLabel>
        <Input
          size="xs"
          style={{ width: 224 }}
          type="file"
          name="test"
          ref={fileref}
        />
      </Form.Group>

      {isUpdating ? (
        <Form.Group controlId="upload file" className="updateFileForm">
          <Form.ControlLabel> نام فایل</Form.ControlLabel>
          <Input
            size="xs"
            style={{ width: 224 }}
            readOnly
            value={update?.name}
          />

          <Button
            size="xs"
            onClick={() => {
              setIsUpdating(false);
              update = { rev: '', name: '' };
            }}
            color="orange"
            appearance="primary"
          >
            انصراف از به روز رسانی
          </Button>
        </Form.Group>
      ) : (
        <Form.Group controlId="add file">
          <Form.ControlLabel> انتخاب نام فایل</Form.ControlLabel>
          <Cascader
            size="xs"
            data={data}
            style={{ width: 224 }}
            onChange={(e) => setDropDownValue(e)}
          />
        </Form.Group>
      )}
      <Form.Group controlId="submit button">
        <Button
          size="xs"
          onClick={uploadingFile}
          color="blue"
          appearance="primary"
        >
          آپلود فایل
        </Button>
        <br />
        <br />
      </Form.Group>
    </Form>
  );
};
interface FolderTools {
  currentPath: { path: string };
  token: string;
  update?: { rev: string; name: string };
}

export default FileUpload;
