import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Dropbox, Error, files } from 'dropbox'; // eslint-disable-line no-unused-vars
import { Button, Input, Cascader, Form, Uploader } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import UploadModal from '../UploadModal';

const data = [
  { value: 'کارت ملی پشت', label: 'کارت ملی پشت' },
  { value: 'کارت ملی رو', label: 'کارت ملی رو' },
  { value: 'شناسنامه', label: 'شناسنامه ' },
  {
    value: 'شناسنامه همسر.فامیل .معرف....',
    label: 'شناسنامه همسر.فامیل .معرف....',
  },
  { value: 'گواهینامه رو', label: 'گواهینامه رو' },
  { value: 'گواهینامه پشت', label: 'گواهینامه پشت' },
  { value: 'اطلاعات کلی', label: 'اطلاعات کلی' },
  { value: 'سفته', label: 'سفته ' },
  { value: 'چک', label: 'چک' },
  { value: 'گواهی شغلی', label: 'گواهی شغلی ' },
  { value: 'پروانه کسب', label: 'پروانه کسب ' },
  { value: 'مجوز', label: 'مجوز' },
  { value: 'سند ملک جدید و قدیم', label: 'سند ملک جدید و قدیم ' },
  { value: 'اجاره نامه پشت', label: 'اجاره نامه پشت ' },
  { value: 'اجاره نامه رو', label: 'اجاره نامه رو' },
  { value: 'سند ماشین', label: 'سند ماشین' },
  { value: 'کارت خودرو پشت', label: 'کارت خودرو پشت' },
  { value: 'کارت خودرو رو', label: 'کارت خودرو رو ' },
  { value: 'بیمه نامه شخص ثالث', label: 'بیمه نامه شخص ثالث' },
  { value: 'کارت بانکی', label: 'کارت بانکی ' },
  { value: 'شبا', label: 'شبا ' },
  { value: 'فیش آب', label: 'فیش آب ' },
  { value: 'برق', label: 'برق ' },
  { value: 'گاز', label: 'گاز' },
  { value: 'پاسپورت', label: 'پاسپورت' },
  { value: 'کارت اقامت', label: 'کارت اقامت ' },
  { value: 'بیمه اجاره', label: 'بیمه اجاره' },
];

const FileUpload = ({ update }: FolderTools) => {
  const [dropDownValue, setDropDownValue] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!update?.name) {
      setIsUpdating(false);
    } else if (update?.name) {
      setDropDownValue(update?.name.split('.').shift());
      setOpen(true);
      setIsUpdating(true);
    }
  }, [update]);

  return (
    <Form>
      <UploadModal
        open={open}
        isUpdate={isUpdating}
        name={dropDownValue}
        update={update}
        setClose={() => {
          setOpen(false);
        }}
      />
      {/* <Uploader draggable>
        <div
          style={{
            lineHeight: '200px',
          }}
        >
          .برای آپلود فایل اینجا کلیک کنید یا آن را داخل این کادر بیندازید
        </div>
      </Uploader>
      <Form.Group controlId="upload file">
        <Form.ControlLabel> انتخاب فایل</Form.ControlLabel>
        <Input
          size="xs"
          style={{ width: 224 }}
          type="file"
          name="test"
          ref={fileref}
        />
      </Form.Group> */}

      {/* {isUpdating ? (
        <Form.Group controlId="upload file" className="updateFileForm">
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
      ) : ( */}
      <Form.Group controlId="add file">
        <Cascader
          className="uploadButton"
          placement="bottomEnd"
          appearance="subtle"
          placeholder="آپلود فایل"
          style={{ width: 120 }}
          data={data}
          onChange={(e) => {
            if (e) {
              setOpen(true);
              setDropDownValue(e);
            }
          }}
        />
      </Form.Group>
      {/* )} */}

      {/* <Form.Group controlId="submit button">
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
      </Form.Group> */}
    </Form>
  );
};
interface FolderTools {
  update?: { rev: string; name: string };
}

export default FileUpload;
