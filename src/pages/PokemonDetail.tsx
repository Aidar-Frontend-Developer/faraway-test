import React, { useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import get from 'lodash/get';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Icon,
	Box,
	CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
	fetchPokemon,
	fetchPokemonDescription,
	fetchPokemonLocations,
	toggleFavoritePokemon,
} from '../redux/slices/pokemonSlice';

import PokemonLocations from '../components/CardContent/PokemonLocations';
import EvolvesFrom from '../components/CardContent/EvolvesFrom';
import PokemonBasicContent from '../components/CardContent/PokemonBasicContent';
import FavoriteIcon from '../components/FavoriteIcon';

const useStyles = makeStyles({
	root: {
		display: 'grid !important',
		placeContent: 'center',
		margin: '16px 0',
		alignItems: 'start !important',
	},
	content: {
		width: '-webkit-fill-available',
		padding: '32px !important',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
	toolbar: {
		display: 'flex',
		paddingBottom: '12px',
		marginBottom: '16px',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		'& > span:first-of-type': {
			cursor: 'pointer',
		},
		'& > span:last-of-type': {
			marginLeft: 'auto',
		},
	},
	loader: {
		height: '100vh',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
});

export default function PokemonDetail() {
	const [, params] = useRoute('/:id');
	const id = params?.id;
	const classes = useStyles();

	const dispatch = useAppDispatch();
	const pokemon = useAppSelector((s) => s.pokemon.pokemon);
	const favoritePokemon = useAppSelector((s) => s.pokemon.favoritePokemons);
	const isFetchingPokemon = useAppSelector((p) => p.pokemon.isFetchingPokemon);
	const wasFavorite = favoritePokemon.includes(pokemon?.name);

	useEffect(() => {
		if (id) {
			dispatch(fetchPokemon(id));
			dispatch(fetchPokemonLocations(id));
			dispatch(fetchPokemonDescription(id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (isFetchingPokemon) {
		return (
			<div className={classes.loader}>
				<Box>
					<CircularProgress size={100} variant="determinate" value={100} />
				</Box>
			</div>
		);
	}

	return (
		<Container className={classes.root}>
			{pokemon.id && (
				<Card sx={{ display: 'flex', alignItems: 'start' }}>
					<CardContent className={classes.content}>
						<div className={classes.toolbar}>
							<Link to={'/'}>
								<Icon>arrow_back</Icon>
							</Link>
							<FavoriteIcon
								favorite={wasFavorite}
								onToggle={() => dispatch(toggleFavoritePokemon(pokemon.name))}
							/>
						</div>
						<PokemonBasicContent
							name={pokemon.name}
							id={pokemon.id}
							description={pokemon.description}
						/>
						{pokemon.locations?.length > 0 && (
							<PokemonLocations locations={pokemon.locations} />
						)}
						{pokemon.previous?.name && (
							<EvolvesFrom
								url={pokemon.previous?.url}
								name={pokemon.previous.name}
							/>
						)}
					</CardContent>
					<CardActionArea>
						<CardMedia
							component="img"
							sx={{
								maxWidth: '400px',
								margin: '0 auto',
								padding: '30px',
								boxSizing: 'border-box',
							}}
							image={
								get(pokemon, 'sprites.other.official-artwork.front_default') ||
								get(pokemon, 'sprites.front_default')
							}
						/>
					</CardActionArea>
				</Card>
			)}
		</Container>
	);
}
