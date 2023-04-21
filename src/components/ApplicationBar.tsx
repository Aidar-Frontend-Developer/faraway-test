import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'wouter';

const useStyles = makeStyles({
	root: {
		boxShadow: 'none !important',
	},
	link: {
		textDecoration: 'none',
		color: 'white',
	},
});

export default function ApplicationBar() {
	const classes = useStyles();

	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
				<Typography variant="h6">
					<Link
						data-testid={'appbar-linkto-root'}
						to={'/'}
						className={classes.link}
					>
						Faraway - test task
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
