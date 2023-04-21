const favoritePokemonKey = 'pokemon:favorite';

export const getFavoritePokemon = () => {
	const result = localStorage.getItem(favoritePokemonKey);
	if (result) return JSON.parse(result);

	return [];
};

export const setFavoritePokemon = (values: string[]) => {
	localStorage.setItem(favoritePokemonKey, JSON.stringify(values));
};
