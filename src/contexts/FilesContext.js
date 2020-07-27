import React, { useState, createContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const FilesContext = createContext();

export const FilesProvider = (props) => {
	const [files, setFiles] = useState([]);
	const [directory, setDirectory] = useState([]);
	const [searchedFiles, setSearchedFiles] = useState([]);
	const [queries, setQueries] = useState([]);
	const [showTrashBin, setShowTrashBin] = useState(false);
	const history = useHistory();

	const loadFiles = (url, id) => {
		axios({
			method: 'get',
			url: url + getQueryString(queries[0], queries[1]),
			withCredentials: true,
		}).then((resp) => {
			if (resp) {
				setFiles(resp.data);
				history.push({
					pathname: '/file-manager',
					search: id ? '?id=' + id : '',
				});
			}
		});
	};

	function getQueryString(sort = 'filename', desc = false) {
		if (Array.isArray(queries) && queries.length !== 0)
			return '?sort=' + queries[0] + '&desc=' + queries[1];
		else return '';
	}

	const loadPublicUserFiles = (username, id, sort = 'size', desc = false) => {
		axios({
			method: 'get',
			url:
				process.env.REACT_APP_PUBLIC_BASE_URL +
				'/' +
				username +
				'/' +
				id +
				getQueryString(sort, desc),
			withCredentials: true,
		}).then((resp) => {
			if (resp) {
				setFiles(resp.data);
				history.push({
					pathname: '/users/' + username,
					search: id ? '?id=' + id : '',
				});
			}
		});
	};

	const loadTrashBin = () => {
		axios({
			method: 'get',
			url:
				process.env.REACT_APP_TRASH_BIN_URL +
				getQueryString(queries[0], queries[1]),
			withCredentials: true,
		}).then((resp) => {
			if (resp) {
				setFiles(resp.data);
				history.push({
					pathname: '/file-manager/trash-bin',
				});
				setShowTrashBin(true);
				console.log(resp.data);
			}
		});
	};

	const loadPrivateDirectory = (id = null) => {
		axios({
			method: 'get',
			url:
				id == null
					? process.env.REACT_APP_DIRECTORY_URL
					: process.env.REACT_APP_DIRECTORY_URL + '/' + id,
			withCredentials: true,
		}).then((resp) => {
			if (resp) {
				setDirectory(resp.data);
			}
		});
	};

	const loadPublicDirectory = (username, id) => {
		axios({
			method: 'get',
			url: process.env.REACT_APP_PUBLIC_BASE_URL + '/' + username + '/' + id,
			withCredentials: true,
		}).then((resp) => {
			if (resp) {
				setDirectory(resp.data);
			}
		});
	};

	const searchFilesAndSet = async (url, searched, username = null) => {
		if (searched !== '') {
			const resp = await getSearchedFiles(url, searched, 'false');
			setFiles(resp);
			if (username == null) {
				history.push({
					pathname: '/file-manager',
					search: '?search=' + searched,
				});
			} else {
				history.push({
					pathname: '/users/' + username,
					search: '?search=' + searched,
				});
			}
		}
	};

	const getSearchedFiles = async (url, searched, anywhere) => {
		const resp = await axios({
			method: 'get',
			url: url + '?search=' + searched + '&anywhere=' + anywhere,
			withCredentials: true,
		});
		return await resp.data;
	};

	return (
		<FilesContext.Provider
			value={{
				files: files,
				setFiles: setFiles,
				loadFiles: loadFiles,
				directory: directory,
				setDirectory: setDirectory,
				loadPrivateDirectory: loadPrivateDirectory,
				loadPublicDirectory: loadPublicDirectory,
				searchFilesAndSet: searchFilesAndSet,
				getSearchedFiles: getSearchedFiles,
				searchedFiles: searchedFiles,
				setSearchedFiles: setSearchedFiles,
				loadPublicUserFiles: loadPublicUserFiles,
				queries: queries,
				setQueries: setQueries,
				showTrashBin: showTrashBin,
				setShowTrashBin: setShowTrashBin,
				loadTrashBin: loadTrashBin,
			}}
		>
			{props.children}
		</FilesContext.Provider>
	);
};
