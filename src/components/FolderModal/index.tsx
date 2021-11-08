import { Dropbox } from 'dropbox';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Button, Input, InputGroup, Modal } from 'rsuite';

const token =
  'PU3kh0_0Eh4AAAAAAAAAAcx-5U-vejMkiCwvn56MyCXAE4BWHn9EmFXJRm6VUQ-V';

const FolderModal = ({ open, title, model, name, setClose }: Data) => {

  const [openModal, setOpenModel] = useState(false);
  const [currentPath, setCurrentpath] = useState<any>(null);

  const router = useRouter();
  const changeFoldername = useRef<any>(null);
  const changeFoldeId = useRef<any>(null);
  const changeFolderModel = useRef<any>(null);

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

  const createFolder = async () => {
    const { path } = currentPath;

    if (!changeFoldeId.current.value) return alert('id یوشه باید حتما پر شود');
    if (name && !changeFoldername.current.value)
      return alert('نام یوشه باید حتما پر شود');
    if (model && !changeFolderModel.current.value)
      return alert('مدل و برند یوشه باید حتما پر شود');
    console.log(
      'path',
      `${path}/${changeFoldeId.current.value}${
        changeFoldername.current
          ? '-' + changeFoldername.current.value
          : changeFolderModel.current
          ? '-' + changeFolderModel.current.value
          : ''
      }`,
    );

    try {
      const dropBox = new Dropbox({ accessToken: token });
      const result = await dropBox.filesCreateFolderV2({
        path: `${path}/${changeFoldeId.current.value}${
          changeFoldername.current
            ? '-' + changeFoldername.current.value
            : changeFolderModel.current
            ? '-' + changeFolderModel.current.value
            : ''
        }`,
        autorename: false,
      });
      handleClose();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{title} جدید</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {model && (
          <InputGroup>
            <Input ref={changeFolderModel} />
            <InputGroup.Addon>برند و مدل</InputGroup.Addon>
          </InputGroup>
        )}
        {name && (
          <InputGroup>
            <Input ref={changeFoldername} />
            <InputGroup.Addon>نام</InputGroup.Addon>
          </InputGroup>
        )}
        <br />
        <InputGroup>
          <Input ref={changeFoldeId} />
          <InputGroup.Addon>شناسه</InputGroup.Addon>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createFolder} appearance="primary">
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
  title: string | boolean;
  name: boolean;
  model: boolean;
  setClose: () => void;
}

export default FolderModal;
