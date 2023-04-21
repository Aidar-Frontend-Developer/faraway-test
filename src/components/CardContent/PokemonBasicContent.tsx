import React from 'react';
import startCase from 'lodash/startCase';
import { Typography } from '@mui/material';

interface IProps {
	name: string;
	id: string;
	description?: string;
}

export default function PokemonBasicContent(props: IProps) {
	const { id, name, description } = props;

	return (
		<>
			<Typography gutterBottom variant="h6" component="div" marginTop={1}>
				{startCase(name)} (#{id})
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{description || 'The description for this pokemon is not available'}
			</Typography>
		</>
	);
}
