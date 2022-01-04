import { Dropbox } from 'dropbox';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import FileUpload from './upload';
import { Button, Input, Form, Cascader, Dropdown, InputGroup } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';

const FolderTools = ({
	currentPath,
	update,
	handleOpen,
	resetUpdate,
}: FolderTools) => {
	const router = useRouter();
	const changeFoldername = useRef<any>(null);
	const changeFoldeId = useRef<any>(null);

	return (
		<>
			<Form>
				<Form.Group controlId='addFolder'>
					<Dropdown
						className='folderDropDown'
						title='ایجاد آیتم جدید'
						icon={<AddOutlineIcon />}
						placement='bottomEnd'
					>
						<Dropdown.Item
							onClick={() =>
								handleOpen({ title: 'کاربر', name: true, model: false })
							}
						>
							کاربر
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() =>
								handleOpen({ title: 'ماشین', name: false, model: true })
							}
						>
							ماشین
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() =>
								handleOpen({ title: 'رزرو', name: false, model: false })
							}
						>
							رزرو
						</Dropdown.Item>
					</Dropdown>
				</Form.Group>

				<Form.Group controlId='uploadForm'>
					<FileUpload update={update} resetUpdate={resetUpdate} />
				</Form.Group>
			</Form>
		</>
	);
};
interface FolderTools {
	currentPath: { path: string };
	handleOpen: any;
	update?: { rev: string; name: string };
	resetUpdate: () => void;
}

export default FolderTools;
