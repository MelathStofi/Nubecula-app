import React, { useContext } from 'react';
import DirectoryImg from '../../resources/directory.png';
import FileImg from '../../resources/file.png';

import './styles/FileSearchStyle.css';
import { ClickAwayListener } from '@material-ui/core';
import { FilesContext } from '../../contexts/FilesContext';
import { FMContext } from '../../contexts/FMContext';
import { useHistory, useLocation } from 'react-router-dom';

const FileSearchList = ({ searchedFiles, setSearchedFiles, search, user }) => {
	const { loadFiles } = useContext(FilesContext);
	const { setSelectedFiles } = useContext(FMContext);
	const location = useLocation();
	const history = useHistory();

	const handleClick = (file) => {
		if (location.pathname === '/users/' + user.username) {
			if (file.directory) {
				history.push('/users/' + user.username + '?id=' + file.id);
			} else {
				history.push(
					'/users/' + user.username + '?id=' + file.parentDirectoryId
				);
			}
		} else {
			if (file.directory) {
				history.push('/file-manager?id=' + file.parentDirectoryId);
			} else {
				history.push('/file-manager?id=' + file.id);

				setSelectedFiles([file]);
			}
		}
		setSearchedFiles([]);
	};

	const getFilename = (filename) => {
		filename = filename.toLowerCase();
		const arr = filename.split(search);
		let str = [];
		for (let i = 0; i < arr.length - 1; i++) {
			str.push(arr[i]);
			str.push(
				<span style={{ fontWeight: 'bold', color: '#545454' }} key={i}>
					{search}
				</span>
			);
		}
		str.push(arr[arr.length - 1]);
		return str;
	};

	return searchedFiles.length !== 0 ? (
		<ClickAwayListener onClickAway={() => setSearchedFiles([])}>
			<div className="search-list">
				{searchedFiles.map((file) => (
					<div
						key={file.id}
						className="search-list-row"
						onClick={() => handleClick(file)}
					>
						{file.directory ? (
							<img width="21,5px" height="27px" src={DirectoryImg} alt="DIR" />
						) : (
							<img width="21,5px" height="27px" src={FileImg} alt="FILE" />
						)}
						<div className="search-list-text">
							&nbsp;&nbsp;{getFilename(file.filename)}
						</div>
					</div>
				))}
			</div>
		</ClickAwayListener>
	) : null;
};

export default FileSearchList;
