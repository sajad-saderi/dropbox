import { Dropbox } from 'dropbox';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import {
	Button,
	Form,
	Input,
	InputGroup,
	Modal,
	Dropdown,
	Uploader,
} from 'rsuite';
import { FileType } from 'rsuite/esm/Uploader/Uploader';
import store from '../../../contexts/store';

const UploadModal = ({
	open,
	isUpdate,
	name,
	setClose,
	update,
	resetUpdate,
}: Data) => {
	const [value, setValue] = useState<any>([]);
	const [openModal, setOpenModel] = useState(false);
	const [currentPath, setCurrentpath] = useState<any>(null);
	const [documentsNumber, setDocumentsNumber] = useState<any>(null);
	const [pathId, setPathId] = useState(null);
	const [fileName, setFileName] = useState(null);
	const [fileExtension, setFileExtension] = useState(null);
	const [insuranceNumber, setInsuranceNumber] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const { setGetList } = useContext(store);
	const router = useRouter();
	const insuranceId = useRef<any>(null);

	const handleClose = () => {
		setClose();
		setOpenModel(false);
	};

	useEffect(() => {
		if (open) {
			setOpenModel(true);
		} else {
			setValue([]);
			setDocumentsNumber(null);
			setFileName(null);
			setFileExtension(null);
		}
	}, [open]);

	useEffect(() => {
		// getToken();
		let path = { path: router.asPath === '/' ? '' : decodeURI(router.asPath) };
		setCurrentpath(path);
	}, [router]);

	const uploadingFile = async () => {
		const { path, pathId, fileName, fileExtension }: any = fileInfoSetup();

		if (name === 'بیمه اجاره' && !insuranceId.current.value) {
			return alert('شماره بیمه را وارد کنید.');
		}
		if (update?.name) {
			const oldExtension: any = update.name.split('.').pop();
			if (!checkFormat(fileExtension, oldExtension)) return;
		}
		let mode: any = { '.tag': 'add' };
		if (update?.rev) {
			mode = { update: update.rev, '.tag': 'update' };
		}
		try {
			const dropBox = new Dropbox({ accessToken: process.env.TOKEN });

			const result = await dropBox.filesUpload({
				contents: value[0].blobFile,
				path: `${path}/${update?.name ? '' : pathId}${fileName}${
					name === 'بیمه اجاره' ? '_' + insuranceId.current.value : ''
				}${documentsNumber ? '_' + documentsNumber : ''}.${fileExtension}`,
				autorename: false,
				mode: mode,
			});
			setGetList(true);
			resetUpdate();
			handleClose();
		} catch (error) {
			if (typeof error === 'object')
				if ((error as any).status === 409) {
					error =
						'این فایل قبلا آپلود شده است، برای آپلود نمونه دیگر آن را شماره گذاری کنید.';
				}
			alert(error);
		}
	};

	const fileInfoSetup = () => {
		const { path } = currentPath;
		const pathId = path.split('/').pop().split('-')[0] + '_';
		if (value) {
			if (value.length !== 1) return alert('یک فایل باید آپلود شود.');
		} else if (!update?.name && !name) {
			return alert('وارد کردن نام برای سند اجباری است.');
		}
		let fileName = name || update?.name.split('.').shift();
		const fileExtension = value[0].blobFile.name.split('.').pop();
		return {
			path: path,
			pathId: pathId,
			fileName: fileName,
			fileExtension: fileExtension,
		};
	};

	const checkFormat = (newFile: string, oldFile: string) => {
		if (newFile !== oldFile) {
			alert(`فرمت فایل باید ${oldFile} باشد.`);
			return false;
		}
		return true;
	};

	useEffect(() => {
		if (value[0]) {
			const { pathId, fileName, fileExtension }: any = fileInfoSetup();
			setPathId(pathId);
			setFileName(fileName);
			setFileExtension(fileExtension);
		}
	}, [value]);

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
				{name === 'بیمه اجاره' && (
					<InputGroup style={{ width: 300, float: 'right' }}>
						<Input
							ref={insuranceId}
							onChange={(e: any) => setInsuranceNumber(e)}
						/>
						<InputGroup.Addon>شماره بیمه</InputGroup.Addon>
					</InputGroup>
				)}
				{!update?.name && (
					<div className='itemNumbers'>
						<Dropdown
							placement='leftStart'
							onSelect={(e) => setDocumentsNumber(e)}
							title='شماره سند:'
							// className={styles.userNameDropdown}
						>
							<Dropdown.Item eventKey='1'>1</Dropdown.Item>
							<Dropdown.Item eventKey='2'>2</Dropdown.Item>
							<Dropdown.Item eventKey='3'>3</Dropdown.Item>
							<Dropdown.Item eventKey='4'>4</Dropdown.Item>
							<Dropdown.Item eventKey='5'>5</Dropdown.Item>
						</Dropdown>
					</div>
				)}
			</Modal.Body>
			<br />
			{value[0] && (
				<p
					style={{
						textAlign: 'right',
						direction: 'rtl',
					}}
				>
					نام فایل :{' '}
					{`${update?.name ? '' : pathId}${fileName}${
						name === 'بیمه اجاره' ? '_' + insuranceNumber : ''
					}${documentsNumber ? '_' + documentsNumber : ''}.${fileExtension}`}
				</p>
			)}
			<Modal.Footer>
				<Button onClick={uploadingFile} appearance='primary'>
					تایید
				</Button>
				<Button onClick={handleClose} appearance='subtle'>
					لغو
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

interface Data {
	open: boolean;
	name: string;
	isUpdate: boolean;
	setClose: () => void;
	update?: { rev: string; name: string };
	resetUpdate: () => void;
}

export default UploadModal;
