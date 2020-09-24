import React, { useState, useContext } from 'react';
import BoxImg from '../../resources/box1-01.png';
import TickedBoxImg from '../../resources/ticked_box.png';
import DirectoryImg from '../../resources/directory.png';
import FileImg from '../../resources/file.png';
import AudioImg from '../../resources/music.png';
import VideoImg from '../../resources/video.png';
import ImageImg from '../../resources/imageImg.png';

import { FilesContext } from '../../contexts/FilesContext';
import ShowWindowDimensions from '../WindowDimension';
import { FMContext } from '../../contexts/FMContext';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ContextMenuContext } from '../../contexts/ContextMenuContext';
import { useHistory } from 'react-router-dom';
import FileView from '../fileview/FileView';

const File = ({ file, types, pathWithKeyId, trashBin }) => {
	const type = file.type.substring(0, file.type.indexOf('/'));
	const [selected, setSelected] = useState(false);
	const [showFile, setShowFile] = useState(false);
	const { files, setFiles } = useContext(FilesContext);
	const {
		currentFile,
		setCurrentFile,
		selectFiles,
		isRename,
		selectedFiles,
		setIsRename,
		newName,
		setNewName,
		rename,
		isCut,
		clipboard,
	} = useContext(FMContext);
	const { setCurrentMenu } = useContext(ContextMenuContext);
	const history = useHistory();

	const handleSelection = (e) => {
		if (!isRename && window.getSelection) {
			var sel = window.getSelection();
			sel.removeAllRanges();
		}
		files.indexOf(currentFile);
		setSelected(!selected);
		selectFiles(e, file);
	};

	const handleContextMenu = async (e) => {
		setCurrentFile(file);
		if (!selectedFiles.includes(file)) handleSelection(e, file);
		setCurrentMenu('file-contextmenu');
	};

	const handleMouseOver = (e) => {
		if (e.buttons === 1) {
			selectFiles(e, file);
		}
	};

	const renameFile = (e) => {
		if (e.target.value !== '' && e.target.value !== file.filename) {
			rename();
			const newArray = [...files];
			const newFile = Object.assign({}, file);
			const index = files.indexOf(file);
			newFile['filename'] = newName;
			newArray[index] = newFile;
			setFiles(newArray);
		} else setIsRename(false);
	};

	const setClassName = () => {
		if (selectedFiles.includes(file)) {
			return 'table-row selected-table-row';
		}
		return 'table-row';
	};

	const loadData = (e) => {
		if (file.directory && !trashBin) history.push(pathWithKeyId + file.id);
		else setShowFile(true);
	};

	const getIcon = () => {
		if (type === types.audio) return AudioImg;
		else if (type === types.video) return VideoImg;
		else if (type === types.image) return ImageImg;
		else if (file.directory) return DirectoryImg;
		else return FileImg;
	};

	return (
		<div>
			<div
				id={file.id}
				className={setClassName()}
				onClick={
					ShowWindowDimensions() < 900
						? null
						: (event) => handleSelection(event)
				}
				onMouseOver={(event) => handleMouseOver(event)}
				onContextMenu={(event) => handleContextMenu(event)}
			>
				<div
					className="filename-cell table-cell"
					onDoubleClick={(event) => loadData(event)}
				>
					<div className="filename-text">
						{
							<img
								width="21,5px"
								height="27px"
								src={getIcon()}
								alt="DIR"
								style={
									isCut && clipboard.includes(file) ? { opacity: '0.3' } : null
								}
							/>
						}
						<span className="filename cell-span">
							&nbsp;&nbsp;
							{isRename && currentFile.id === file.id ? (
								<ClickAwayListener onClickAway={() => setIsRename(false)}>
									<input
										className="rename-input"
										type="text"
										placeholder="new name"
										defaultValue={file.filename}
										selected="selected"
										autoFocus
										onFocus={(e) => e.target.select()}
										onBlur={(e) => renameFile(e)}
										onChange={(e) => setNewName(e.target.value)}
										onKeyUp={(e) => {
											if (e.keyCode === 13) renameFile(e);
										}}
									/>
								</ClickAwayListener>
							) : (
								file.filename
							)}
						</span>
					</div>
				</div>
				<div
					align="left"
					className={
						ShowWindowDimensions() < 666 ? 'hidden-div' : 'date-cell table-cell'
					}
					onDoubleClick={(event) => loadData(event, file)}
				>
					<span className="date cell-span">{file.modificationDate}</span>
				</div>
				<div
					align="left"
					className={
						ShowWindowDimensions() < 666 ? 'hidden-div' : 'type-cell table-cell'
					}
					onDoubleClick={(event) => loadData(event, file)}
				>
					<span
						className="type cell-span"
						title={!file.directory ? file.type : 'folder'}
					>
						{!file.directory ? file.type : 'folder'}
					</span>
				</div>
				<div
					align="left"
					className={
						ShowWindowDimensions() < 666
							? 'hidden-div'
							: 'extension-cell table-cell'
					}
					onDoubleClick={(event) => loadData(event, file)}
				>
					<span className="extension cell-span">
						{file.extension ? file.extension : ' '}
					</span>
				</div>
				<div
					align="left"
					className={
						ShowWindowDimensions() < 666 ? 'hidden-div' : 'size-cell table-cell'
					}
					onDoubleClick={(event) => loadData(event, file)}
				>
					<span className="size cell-span">
						{!file.directory ? file.size : ' '}
					</span>
				</div>
				<div
					align="left"
					className={
						ShowWindowDimensions() < 666
							? 'hidden-div'
							: 'shared-cell table-cell'
					}
					onDoubleClick={(event) => loadData(event, file)}
				>
					<span className="shared cell-span">
						<img
							width="19,5px"
							height="14px"
							alt={file.shared ? 'yes' : 'no'}
							src={file.shared ? TickedBoxImg : BoxImg}
						/>
					</span>
				</div>
			</div>
			{Object.values(types).includes(type) ? (
				<FileView
					file={file}
					types={types}
					type={type}
					showFile={showFile}
					setShowFile={setShowFile}
				/>
			) : null}
		</div>
	);
};

export default File;
