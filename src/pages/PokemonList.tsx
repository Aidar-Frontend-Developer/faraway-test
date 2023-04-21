import React from 'react';
import { useLocation } from 'wouter';
import {
	Container,
	Icon,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
	Tooltip,
	Box,
	CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ITableEntry } from '../models/interfaces';

import PokemonTable from '../components/PokemonTable';
import {
	setFilter,
	setItemsPerPage,
	setPage,
	setSearchText,
	toggleFavoritePokemon,
} from '../redux/slices/pokemonSlice';

const useStyles = makeStyles({
	root: {
		height: window.innerHeight - 128,
		padding: '0 2px',
		margin: '16px 0',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		'& > div:not(:last-of-type)': {
			marginRight: '16px',
		},
	},
	loader: {
		height: '100vh',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
});

// Pokemon with shortest name is "mew"
const SEARCH_MODE_LENGTH = 2;

export default function PokemonList() {
	const classes = useStyles();
	const dispatch = useAppDispatch();
	const [, setLocation] = useLocation();
	const pokemons = useAppSelector((s) => s.pokemon.pokemons);
	const search = useAppSelector((s) => s.pokemon.search);
	const favorite = useAppSelector((s) => s.pokemon.favoritePokemons);
	const filter = useAppSelector((s) => s.pokemon.filter);
	const rowsPerPage = useAppSelector((p) => p.pokemon.itemsPerPage);
	const page = useAppSelector((p) => p.pokemon.page);
	const isFetchingList = useAppSelector((p) => p.pokemon.isFetchingList);

	let rows =
		pokemons && search.length >= SEARCH_MODE_LENGTH
			? pokemons.filter((p) =>
					p.name.toLowerCase().includes(search.toLowerCase()),
			  )
			: pokemons;

	if (filter === 'favorite') {
		rows = rows.filter((p) => favorite.includes(p.name));
	} else if (filter === 'remaining') {
		rows = rows.filter((p) => !favorite.includes(p.name));
	}

	const onPageChange = (_: any, newPage: number) => {
		dispatch(setPage(newPage));
	};

	const onRowsPerPageChange = (event: any) => {
		dispatch(setItemsPerPage(parseInt(event.target.value, 10)));
		dispatch(setPage(0));
	};

	if (isFetchingList) {
		return (
			<div className={classes.loader}>
				<Box>
					<CircularProgress size={100} variant="determinate" value={100} />
				</Box>
			</div>
		);
	}

	return (
		<Container className={classes.root} maxWidth={'xl'}>
			<div className={classes.toolbar}>
				<Select
					value={filter}
					onChange={(v) => dispatch(setFilter(v.target.value))}
				>
					<MenuItem value={'all'}>Show all</MenuItem>
					<MenuItem value={'favorite'}>Show favorite only</MenuItem>
					<MenuItem value={'remaining'}>Show not favorite</MenuItem>
				</Select>
				<Tooltip title={'Insert at least 2 characters to search'}>
					<TextField
						variant={'standard'}
						placeholder={'Search Pokemon'}
						value={search}
						onChange={(v) => {
							dispatch(setSearchText(v.target.value));
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Icon>search</Icon>
								</InputAdornment>
							),
						}}
					/>
				</Tooltip>
			</div>
			<PokemonTable
				searchMode={search.length >= SEARCH_MODE_LENGTH}
				rows={rows.map(
					(r) =>
						({
							name: r.name,
							id: r.id,
							favorite: favorite.includes(r.name),
						} as ITableEntry),
				)}
				onFavorite={(value) => dispatch(toggleFavoritePokemon(value))}
				onClick={(v) => {
					setLocation(`/${v}`);
				}}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
			/>
		</Container>
	);
}
