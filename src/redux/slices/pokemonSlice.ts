import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IListEntry } from '../../models/interfaces';
import { ApiBaseUrl } from '../../models/constants';

import {
	getFavoritePokemon,
	setFavoritePokemon,
} from '../../utils/localStorageUtils';

interface PokemonState {
	isFetchingList: boolean;
	isFetchingPokemon: boolean;
	pokemons: IListEntry[];
	search: string;
	favoritePokemons: string[];
	filter: 'all' | 'favorite' | 'remaining';
	pokemon: any;
	page: number;
	itemsPerPage: number;
}

export const initialState: PokemonState = {
	isFetchingList: true,
	isFetchingPokemon: true,
	pokemons: [],
	favoritePokemons: getFavoritePokemon(),
	search: '',
	filter: 'all',
	pokemon: {},
	page: 0,
	itemsPerPage: 15,
};

export const fetchAllPokemons = createAsyncThunk(
	'pokemon/fetchAll',
	async () => {
		const response = await fetch(`${ApiBaseUrl}/pokemon?limit=-1`);
		const jsonResponse = await response.json();

		return jsonResponse.results.map(
			(d: any) =>
				({
					id: d.url.split(`${ApiBaseUrl}/pokemon/`)[1].replace('/', ''),
					name: d.name,
					url: d.url,
				} as IListEntry),
		);
	},
);

export const fetchPokemon = createAsyncThunk(
	'pokemon/fetch',
	async (pokemonId: string, _) => {
		const pokemonReq = await fetch(`${ApiBaseUrl}/pokemon/${pokemonId}`);
		return await pokemonReq.json();
	},
);

export const fetchPokemonDescription = createAsyncThunk(
	'pokemon/fetchDescription',
	async (pokemonId: string, _) => {
		const characteristic = await fetch(
			`${ApiBaseUrl}/pokemon-species/${pokemonId}`,
		);
		return await characteristic.json();
	},
);

export const fetchPokemonLocations = createAsyncThunk(
	'pokemon/fetchLocation',
	async (pokemonId: string, _) => {
		const canBeFound = await fetch(
			`${ApiBaseUrl}/pokemon/${pokemonId}/encounters`,
		);
		return await canBeFound.json();
	},
);

export const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		toggleFavoritePokemon: (state, action: PayloadAction<string>) => {
			if (state.favoritePokemons.includes(action.payload)) {
				state.favoritePokemons.splice(
					state.favoritePokemons.indexOf(action.payload),
					1,
				);
			} else {
				state.favoritePokemons.push(action.payload);
			}

			setFavoritePokemon(state.favoritePokemons);
		},
		setSearchText: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setFilter: (state, action: PayloadAction<string>) => {
			switch (action.payload) {
				case 'all':
					state.filter = 'all';
					break;
				case 'favorite':
					state.filter = 'favorite';
					break;
				case 'remaining':
					state.filter = 'remaining';
					break;
				default:
					state.filter = 'all';
			}
			state.page = 0;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setItemsPerPage: (state, action: PayloadAction<number>) => {
			state.itemsPerPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchAllPokemons.fulfilled,
			(state, action: { payload: IListEntry[] }) => {
				state.isFetchingList = false;
				state.pokemons = action.payload;
			},
		);
		builder.addCase(fetchPokemon.pending, (state, action) => {
			state.pokemon = {};
		});
		builder.addCase(fetchPokemon.fulfilled, (state, action) => {
			state.isFetchingPokemon = false;
			state.pokemon.id = action.payload.id;
			state.pokemon.name = action.payload.name;
			state.pokemon.sprites = action.payload.sprites;
		});
		builder.addCase(fetchPokemonDescription.fulfilled, (state, action) => {
			state.pokemon.previous = action.payload.evolves_from_species;
			state.pokemon.description = action.payload.flavor_text_entries
				.filter((e: any) => e.language.name === 'en')
				.reverse()[0].flavor_text;
		});
		builder.addCase(fetchPokemonLocations.fulfilled, (state, action) => {
			state.pokemon.locations = action.payload;
		});
	},
});

export const {
	toggleFavoritePokemon,
	setSearchText,
	setFilter,
	setPage,
	setItemsPerPage,
} = pokemonSlice.actions;
