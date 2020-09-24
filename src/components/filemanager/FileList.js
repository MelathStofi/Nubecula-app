import React, { useContext, useEffect, useCallback } from 'react';

import File from './File';
import ShowWindowDimensions from '../WindowDimension';
import { ClickAwayListener } from '@material-ui/core';
import { FMContext } from '../../contexts/FMContext';
import { ContextMenuContext } from '../../contexts/ContextMenuContext';

const FileList = ({ files, pathWithKeyId, queries, setQueries, trashBin }) => {
	const types = {
		image: 'image',
		audio: 'audio',
		video: 'video',
		text: 'text',
	};
	const { setSelectedFiles, setIndexOfSelected } = useContext(FMContext);
	const { optionClicked, setOptionClicked } = useContext(ContextMenuContext);
	const { copy, cut, paste, moveToTrash, remove, selectAll } = useContext(
		FMContext
	);

	const keydownHandler = useCallback(
		(e) => {
			if (e.keyCode === 65 && e.ctrlKey) {
				e.preventDefault();
				selectAll();
			}
			if (e.keyCode === 67 && e.ctrlKey) copy();
			if (e.keyCode === 88 && e.ctrlKey) cut();
			if (e.keyCode === 86 && e.ctrlKey) paste(true);
			if (e.keyCode === 46) moveToTrash();
			if (e.keyCode === 46 && e.shiftKey) remove();
		},
		[copy, cut, paste, moveToTrash, remove, selectAll]
	);

	useEffect(() => {
		document.addEventListener('keydown', keydownHandler);
		return () => {
			document.removeEventListener('keydown', keydownHandler);
		};
	}, [keydownHandler]);

	const handleClickAway = () => {
		setIndexOfSelected(null);
		if (!optionClicked) {
			setSelectedFiles([]);
		}
		setOptionClicked(false);
	};

	return (
		<div className="fm-table">
			<div
				className={ShowWindowDimensions() < 666 ? 'hidden-t-head' : 't-head'}
			>
				<div className="table-head-row">
					<div
						className="filename-th th"
						onClick={() => setQueries(['filename', !queries[1]])}
					>
						<span className="head-span cell-span">Name</span>
					</div>
					<div className="date-th th">
						<span
							className="head-span cell-span"
							onClick={() => setQueries(['modificationDate', !queries[1]])}
						>
							Modification Date
						</span>
					</div>
					<div className="type-th th">
						<span
							className="head-span cell-span"
							onClick={() => setQueries(['type', !queries[1]])}
						>
							Type
						</span>
					</div>
					<div className="extension-th th">
						<span
							className="head-span cell-span"
							onClick={() => setQueries(['extension', !queries[1]])}
						>
							Extension
						</span>
					</div>
					<div className="size-th th">
						<span
							className="head-span cell-span"
							onClick={() => setQueries(['size', !queries[1]])}
						>
							Size
						</span>
					</div>
					<div className="shared-th th">
						<span
							className="head-span cell-span"
							onClick={() => setQueries(['shared', !queries[1]])}
						>
							Shared
						</span>
					</div>
				</div>
			</div>

			<div className="t-body">
				<ClickAwayListener onClickAway={() => handleClickAway()}>
					{files.length !== 0 ? (
						<div>
							{files.map((file) => (
								<File
									file={file}
									types={types}
									key={file.id}
									pathWithKeyId={pathWithKeyId}
									trashBin={trashBin}
								/>
							))}
						</div>
					) : (
						<div style={{ textAlign: 'center', padding: '20%' }}>
							Empty folder
						</div>
					)}
				</ClickAwayListener>
			</div>
		</div>
	);
};

export default FileList;
