import React, { useContext } from 'react';

import './styles/AppOptionsStyle.css';
import { AppOptionsContext } from '../../contexts/AppOptionsContext';
import { ClickAwayListener } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import ShowWindowDimensions from '../WindowDimension';

const AppOptions = (props) => {
	const history = useHistory();
	const { user } = useContext(UserContext);
	const { showAppOptions, setShowAppOptions, logout } = useContext(
		AppOptionsContext
	);

	const getOptions = () => {
		if (user) {
			return [
				{
					text: 'My files',
					id: 'file-manager-opt',
					onClick: () => {
						history.push('/file-manager');
						setShowAppOptions(false);
					},
				},
				{
					text: 'Users',
					id: 'users-opt',
					onClick: () => {
						history.push('/users');
						setShowAppOptions(false);
					},
				},
				{
					text: 'Trash bin',
					id: 'file-trash-bin',
					onClick: () => {
						history.push('/file-manager/trash-bin');
						setShowAppOptions(false);
					},
				},
				{
					text: 'Log out',
					id: 'logout-opt',
					onClick: () => {
						logout();
						setShowAppOptions(false);
					},
				},
			];
		} else
			return [
				{
					text: 'Users',
					id: 'users-opt',
					onClick: () => {
						history.push('/users');
						setShowAppOptions(false);
					},
				},
				{
					text: 'Sign up',
					id: 'sign-up-opt',
					onClick: () => {
						history.push('/sign-up');
						setShowAppOptions(false);
					},
				},
				{
					text: 'Sign in',
					id: 'sign-in-opt',
					onClick: () => {
						history.push('/sign-in');
						setShowAppOptions(false);
					},
				},
			];
	};

	return showAppOptions ? (
		<ClickAwayListener onClickAway={() => setShowAppOptions(false)}>
			<div className="App-options-card">
				<div className="App-options">
					{getOptions().map((item, index) => {
						return (
							<div
								key={index}
								id={item.id}
								onClick={item.onClick}
								className="app-option_item"
							>
								{item.text}
							</div>
						);
					})}
				</div>
			</div>
		</ClickAwayListener>
	) : null;
};

export default AppOptions;
