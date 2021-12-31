import { Dropbox } from 'dropbox';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Button, Input, InputGroup, Modal } from 'rsuite';

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
		let path: any = null;
		let firstletter = 'u';
		if (changeFolderModel.current) {
			firstletter = 'c';
			path = '/otoli document/cars';
		} else if (changeFoldername.current) {
			path = '/otoli document/users';
		} else {
			firstletter = 'b';
			path = '/otoli document/booking';
		}

		if (!changeFoldeId.current.value) return alert('id یوشه باید حتما پر شود');
		if (name && !changeFoldername.current.value)
			return alert('نام یوشه باید حتما پر شود');
		if (
			model &&
			(!changeFolderModel.current.value || !changeFoldername.current.value)
		)
			return alert('نام مالک، مدل و برند یوشه باید حتما پر شود');
		try {
			const dropBox = new Dropbox({ accessToken: process.env.TOKEN });
			const result = await dropBox.filesCreateFolderV2({
				path: `${path}/${firstletter}${changeFoldeId.current.value}${
					changeFolderModel.current
						? '-' +
						  changeFolderModel.current.value +
						  '-' +
						  changeFoldername.current.value
						: changeFoldername.current
						? '-' + changeFoldername.current.value
						: ''
				}`,
				autorename: false,
			});

			handleClose();
			router.push(
				`${path}/${firstletter}${changeFoldeId.current.value}${
					changeFolderModel.current
						? '-' +
						  changeFolderModel.current.value +
						  '-' +
						  changeFoldername.current.value
						: changeFoldername.current
						? '-' + changeFoldername.current.value
						: ''
				}`,
			);
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
					<>
						<InputGroup>
							<Input ref={changeFolderModel} />
							<InputGroup.Addon>برند و مدل</InputGroup.Addon>
						</InputGroup>
						<br />
					</>
				)}
				{(name || model) && (
					<InputGroup>
						<Input ref={changeFoldername} />
						<InputGroup.Addon>{name ? 'نام' : 'نام مالک'}</InputGroup.Addon>
					</InputGroup>
				)}
				<br />
				<InputGroup>
					<Input ref={changeFoldeId} />
					<InputGroup.Addon>شناسه</InputGroup.Addon>
				</InputGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={createFolder} appearance='primary'>
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
	title: string | boolean;
	name: boolean;
	model: boolean;
	setClose: () => void;
}

export default FolderModal;
