import { Dropbox } from 'dropbox';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputGroup, Modal, Uploader } from 'rsuite';
import { FileType } from 'rsuite/esm/Uploader/Uploader';

const token =
  'PU3kh0_0Eh4AAAAAAAAAAcx-5U-vejMkiCwvn56MyCXAE4BWHn9EmFXJRm6VUQ-V';

const UploadModal = ({ open, isUpdate, name, setClose, update }: Data) => {
  const [value, setValue] = useState<any>(null);
  const [openModal, setOpenModel] = useState(false);
  const [currentPath, setCurrentpath] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const handleClose = () => {
    setClose();
    setOpenModel(false);
  };

  useEffect(() => {
    if (open) {
      setOpenModel(true);
    }
  }, [open]);

  useEffect(() => {
    // getToken();
    let path = { path: router.asPath === '/' ? '' : decodeURI(router.asPath) };
    setCurrentpath(path);
  }, [router]);

  const uploadingFile = async () => {
    if (value) {
      if (value.length !== 1) return alert('یک فایل باید آپلود شود.');
    } else if (!update?.name && !name) {
      return alert('وارد کردن نام برای سند اجباری است.');
    }
    let fileName = name || update?.name.split('.').shift();
    const fileExtension = value[0].blobFile.name.split('.').pop();
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
        contents: value[0].blobFile,
        path: `${path}/${fileName}.${fileExtension}`,
        autorename: false,
        mode: mode,
      });
      router.reload();
    } catch (error) {
      alert(error);
    }
  };

  const checkFormat = (newFile: string, oldFile: string) => {
    if (newFile !== oldFile) {
      alert(`فرمت فایل باید ${oldFile} باشد.`);
      return false;
    }
    return true;
  };

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>آپلود فایل {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Uploader
          draggable
          autoUpload={false}
          multiple={false}
          disabledFileItem={false}
          onChange={(e: FileType[]) => setValue(e)}
        >
          <div
            style={{
              lineHeight: '200px',
            }}
          >
            .برای آپلود فایل اینجا کلیک کنید یا آن را داخل این کادر بیندازید
          </div>
        </Uploader>
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={uploadingFile} appearance="primary">
          تایید
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          لغو
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

interface Data {
  open: boolean;
  name: boolean;
  isUpdate: boolean;
  setClose: () => void;
  update?: { rev: string; name: string };
}

export default UploadModal;
