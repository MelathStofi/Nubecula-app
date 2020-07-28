import React, { useContext } from 'react';

import { useLoading } from '../../contexts/Loading';
import { FilesContext } from '../../contexts/FilesContext';
import { useHistory } from 'react-router-dom';
import './styles/SideBarStyle.css';

const SideBar = (props) => {
	const { loading } = useLoading();
	const { loadTrashBin } = useContext(FilesContext);
	const history = useHistory();

	const handleFileManager = () => {
		history.push('/file-manager');
	};

	const handleTrashBin = () => {
		loadTrashBin();
	};

	if (loading) return null;
	return (
		<React.Fragment>
			<div className="sidebar">
				<div className="sidebar-field" onClick={() => handleFileManager()}>
					My Files
				</div>

				<div className="sidebar-field" onClick={() => handleTrashBin()}>
					Trash bin
				</div>
			</div>
		</React.Fragment>
	);
};

export default SideBar;
