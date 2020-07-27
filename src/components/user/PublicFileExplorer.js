import React, { useState, useEffect, useContext } from 'react';
import { useLoading, LoadingScreen } from '../../contexts/Loading';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import FileList from '../filemanager/FileList';
import { FilesContext } from '../../contexts/FilesContext';
import ToolBar from '../toolbar/ToolBar';
import FileManagerContainer from '../container/FileManagerContainer';
import { ContextMenuContext } from '../../contexts/ContextMenuContext';
import { FMContext } from '../../contexts/FMContext';
import { UserContext } from '../../contexts/UserContext';

const PublicFileExplorer = (props) => {
	const { loading, setLoading } = useLoading();
	const [viewedUser, setViewedUser] = useState(null);
	const { user } = useContext(UserContext);
	const {
		files,
		setFiles,
		directory,
		setDirectory,
		queries,
		setQueries,
	} = useContext(FilesContext);
	const { currentMenu, setOptionClicked } = useContext(ContextMenuContext);
	const location = useLocation();
	const { openPublicFile, currentFile, copy, download } = useContext(FMContext);
	const history = useHistory();

	useEffect(() => {
		// load viewed user
		axios({
			method: 'get',
			url: process.env.REACT_APP_USERS_URL + props.match.params.username,
			withCredentials: true,
		})
			.catch((error) => {
				setLoading(false);
				history.push('/users');
			})
			.then((resp) => {
				if (resp) {
					setViewedUser(resp.data);
				} else history.push('/users');
			});

		// load user's files
		let id = new URLSearchParams(location.search).get('id');
		if (id == null) id = '';
		else {
			axios({
				method: 'get',
				url: process.env.REACT_APP_DIRECTORY_URL,
				withCredentials: true,
			}).then((resp) => {
				if (resp) {
					setDirectory(resp.data);
				}
			});
		}
		axios({
			method: 'get',
			url:
				Array.isArray(queries) && queries.length !== 0
					? process.env.REACT_APP_PUBLIC_BASE_URL +
					  '/' +
					  props.match.params.username +
					  '/' +
					  id +
					  '?sort=' +
					  queries[0] +
					  '&desc=' +
					  queries[1]
					: process.env.REACT_APP_PUBLIC_BASE_URL +
					  '/' +
					  props.match.params.username +
					  '/' +
					  id,
			withCredentials: true,
		}).then((resp) => {
			if (resp) {
				setFiles(resp.data);
				setLoading(false);
			}
		});
	}, [
		location.search,
		setLoading,
		setFiles,
		props.match.params.username,
		queries,
		history,
		setDirectory,
	]);

	const giveContextMenu = () => {
		const contextMenuItems = [];
		if (currentMenu === 'file-contextmenu') {
			if (currentFile['directory']) {
				contextMenuItems.push({
					text: 'Open',
					id: 'c-m-open',
					onClick: () => {
						setOptionClicked(true);
						openPublicFile(viewedUser.username);
					},
				});
			} else {
				contextMenuItems.push({
					text: 'Download',
					id: 'c-m-open',
					onClick: () => {
						setOptionClicked(true);
						download();
					},
				});
			}
			if (user) {
				contextMenuItems.push.apply(contextMenuItems, [
					{
						text: 'Copy',
						id: 'c-m-copy',
						onClick: () => {
							setOptionClicked(true);
							copy();
						},
					},
				]);
			}
		}
		return contextMenuItems;
	};

	if (loading) return <LoadingScreen />;
	return (
		<FileManagerContainer
			id="file-manager-operations"
			menuItems={giveContextMenu()}
		>
			<ToolBar user={viewedUser} auth={false} directory={directory} />
			<FileList
				files={files}
				pathWithKeyId={
					viewedUser ? '/users/' + viewedUser.username + '?id=' : '/users'
				}
				queries={queries}
				setQueries={setQueries}
			/>
		</FileManagerContainer>
	);
};

export default PublicFileExplorer;
