import React from 'react';
import { Icon } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	starIcon: {
		marginRight: '12px',
		cursor: 'pointer',
	},
});

interface IProps {
	onToggle: () => void;
	favorite: boolean;
}

export default function FavoriteIcon(props: IProps) {
	const classes = useStyles();
	const { favorite } = props;

	return (
		<Icon
			className={classes.starIcon}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				props.onToggle();
			}}
		>
			{favorite ? 'star' : 'star_outline'}
		</Icon>
	);
}
