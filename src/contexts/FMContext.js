import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { FilesContext } from './FilesContext';
import { useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

export const FMContext = createContext();

export const FileManagerProvider = (props) => {
	const [currentFile, setCurrentFile] = useState(null);
	const [indexOfSelected, setIndexOfSelected] = useState(null);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [clipboard, setClipboard] = useState([]);
	const [isCut, setIsCut] = useState(false);
	const [newName, setNewName] = useState('');
	const [isRename, setIsRename] = useState(false);
	const { loadFiles, loadPublicUserFiles, files, setFiles } = useContext(
		FilesContext
	);
	const [name, setName] = useState('');
	const [isAddDir, setIsAddDir] = useState(false);
	const [showUpload, setShowUpload] = useState(false);
	const location = useLocation();
	const { loadCurrentUser } = useContext(UserContext);

	const sendData = async (method, url, data) => {
		const resp = await axios({
			method: method,
			url: url,
			withCredentials: true,
			data: data,
		});
		return await resp.data;
	};

	const selectFiles = (e, file) => {
		let selFiles = selectedFiles;
		if (!e.shiftKey) {
			setIndexOfSelected(files.indexOf(file));
		}
		if (e.shiftKey) {
			const start =
				files.indexOf(file) <= indexOfSelected
					? files.indexOf(file)
					: indexOfSelected;
			const end =
				files.indexOf(file) >= indexOfSelected
					? files.indexOf(file)
					: indexOfSelected;
			setSelectedFiles(files.slice(start, end + 1));
		} else if (e.ctrlKey) {
			if (!selectedFiles.includes(file)) {
				setSelectedFiles([...selectedFiles, file]);
			} else {
				selFiles.splice(selFiles.indexOf(file), 1);
				setSelectedFiles(selFiles);
			}
		} else {
			setSelectedFiles([file]);
		}
	};

	const selectAll = () => {
		setSelectedFiles(files);
	};

	const openFile = () => {
		if (currentFile.directory) loadFiles(currentFile.url, currentFile.id);
	};

	const openPublicFile = (username) => {
		if (currentFile.directory) loadPublicUserFiles(username, currentFile.id);
	};

	const rename = async () => {
		setIsRename(false);
		const data = {
			id: currentFile.id,
			name: newName === '' ? currentFile.filename : newName,
		};
		try {
			const resp = sendData(
				'put',
				process.env.REACT_APP_BASE_URL + '/' + currentFile.id,
				data
			);
			if (resp) {
				return resp;
			}
		} catch {
			alert('Cannot rename file(s)');
		}
	};

	const copy = () => {
		setClipboard(selectedFiles);
		setIsCut(false);
	};

	const cut = () => {
		setClipboard(selectedFiles);
		setIsCut(true);
	};

	const paste = async (isLoosePaste) => {
		let data;
		if (isLoosePaste) {
			data = {
				files: clipboard,
				targetDirId: new URLSearchParams(location.search).get('id'),
			};
		} else {
			data = {
				files: clipboard,
				targetDirId: currentFile.id,
			};
		}
		try {
			let resp;
			if (!isCut) {
				resp = await sendData('post', process.env.REACT_APP_COPY_URL, data);
				console.log(resp);
				loadCurrentUser();
			} else {
				resp = await sendData('put', process.env.REACT_APP_REPLACE_URL, data);
			}
			if (resp) {
				if (isLoosePaste) {
					let newArray = files.concat(resp);
					setSelectedFiles(resp);
					setFiles(newArray);
				} else if (isCut) {
					let filesClone = files.slice();
					for (let rmfile of clipboard) {
						filesClone = filesClone.filter((file) => rmfile.id !== file.id);
					}
					setFiles(filesClone);
				}
			}
		} catch {
			alert('Cannot paste file(s)!\nMaybe your storage is full.');
		}
	};

	const moveToTrash = () => {
		const deletedFiles = selectedFiles.slice();
		let filesClone = files.slice();
		for (let deletedFile of deletedFiles) {
			filesClone = filesClone.filter((file) => deletedFile.id !== file.id);
		}
		setFiles(filesClone);
		const data = {
			files: deletedFiles,
			targetDirId: null,
		};
		try {
			deletedFiles.map(async (file) => {
				await sendData('put', process.env.REACT_APP_TRASH_BIN_URL, data);
			});
		} catch {
			alert('Cannot remove file(s)');
		}
	};

	const restore = () => {
		const data = {
			files: selectedFiles,
			targetDirId: null,
		};
		let filesClone = files.slice();
		for (let restoredFile of selectedFiles) {
			filesClone = filesClone.filter((file) => restoredFile.id !== file.id);
		}
		setFiles(filesClone);
		try {
			sendData('put', process.env.REACT_APP_REPLACE_URL, data);
		} catch {
			alert("Couldn't restore the files");
		}
	};

	const restoreAll = async () => {
		const data = {
			files: files,
			targetDirId: null,
		};
		try {
			await sendData('put', process.env.REACT_APP_REPLACE_URL, data);
			setFiles([]);
		} catch {
			alert("Couldn't restore the files");
		}
	};

	const remove = () => {
		const deletedFiles = selectedFiles.slice();
		let filesClone = files.slice();
		for (let deletedFile of deletedFiles) {
			filesClone = filesClone.filter((file) => deletedFile.id !== file.id);
		}
		setFiles(filesClone);
		removeFromDB(deletedFiles);
	};

	const removeAll = async () => {
		removeFromDB(files);
		setFiles([]);
	};

	const removeFromDB = (deletedFiles) => {
		try {
			deletedFiles.map(async (file) => {
				await sendData(
					'delete',
					process.env.REACT_APP_BASE_URL + '/' + file['id'],
					null
				);
				loadCurrentUser();
			});
		} catch {
			alert('Cannot remove file(s)');
		}
	};

	const share = (fileId = currentFile.id) => {
		const sharedFiles = selectedFiles.slice();
		let filesClone = [...files];
		for (let sharedFile of sharedFiles) {
			filesClone = filesClone.map((file) => {
				if (sharedFile.id === file.id) {
					file.shared = !file.shared;
					return file;
				} else return file;
			});
		}
		setFiles(filesClone);
		try {
			sharedFiles.map(async (file) => {
				await sendData(
					'put',
					process.env.REACT_APP_SHARE_URL + '/' + file.id,
					null
				);
			});
		} catch {
			alert('Cannot remove share this file');
		}
	};

	const addFolder = async () => {
		const data = {
			id: null,
			name: 'New folder',
		};
		let id = new URLSearchParams(location.search).get('id');
		if (id == null) id = '';
		const resp = await sendData(
			'post',
			process.env.REACT_APP_BASE_URL + '/directories/' + id,
			data
		);
		if (resp) {
			const newArray = files.slice();
			newArray.unshift(resp);
			setFiles(newArray);
			setCurrentFile(resp);
			setIsRename(true);
		}
		setIsAddDir(false);
	};

	const FileDownload = require('js-file-download');
	const download = () => {
		const filename = currentFile.filename + '.' + currentFile.extension;
		sendData('get', currentFile.url).then((resp) => {
			FileDownload(resp, filename);
		});
	};

	const downloadShared = (username) => {
		const filename = currentFile.filename + '.' + currentFile.extension;
		sendData(
			'get',
			process.env.REACT_APP_PUBLIC_BASE_URL +
				'/' +
				username +
				'/' +
				currentFile.id
		).then((resp) => {
			FileDownload(resp, filename);
		});
	};

	return (
		<FMContext.Provider
			value={{
				currentFile: currentFile,
				setCurrentFile: setCurrentFile,
				selectFiles: selectFiles,
				selectAll: selectAll,
				selectedFiles: selectedFiles,
				setSelectedFiles: setSelectedFiles,
				clipboard: clipboard,
				openFile: openFile,
				openPublicFile: openPublicFile,
				rename: rename,
				newName: newName,
				setNewName: setNewName,
				isRename: isRename,
				setIsRename: setIsRename,
				copy: copy,
				cut: cut,
				isCut: isCut,
				paste: paste,
				moveToTrash: moveToTrash,
				restore: restore,
				restoreAll: restoreAll,
				remove: remove,
				removeAll: removeAll,
				share: share,
				addFolder: addFolder,
				name: name,
				setName: setName,
				isAddDir: isAddDir,
				setIsAddDir: setIsAddDir,
				download: download,
				downloadShared: downloadShared,
				showUpload: showUpload,
				setShowUpload: setShowUpload,
				setIndexOfSelected: setIndexOfSelected,
			}}
		>
			{props.children}
		</FMContext.Provider>
	);
};
