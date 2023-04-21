import { fireEvent, render, screen } from '@testing-library/react';

import PokemonTable from './PokemonTable';

describe('Given i want to render the pokemon table', function () {
	it('should render the empty state correctly', function () {
		render(
			<PokemonTable
				rows={[]}
				rowsPerPage={10}
				page={1}
				searchMode={false}
				onFavorite={jest.fn()}
				onClick={jest.fn()}
				onPageChange={jest.fn()}
				onRowsPerPageChange={jest.fn()}
			/>,
		);

		expect(screen.getByText('No data found')).toBeInTheDocument();
	});

	it('should render the table when data is provided', function () {
		render(
			<PokemonTable
				rows={[
					{
						id: '1',
						name: 'Bulbasaur',
						favorite: false,
					},
				]}
				rowsPerPage={10}
				page={0}
				searchMode={false}
				onFavorite={jest.fn()}
				onClick={jest.fn()}
				onPageChange={jest.fn()}
				onRowsPerPageChange={jest.fn()}
			/>,
		);

		expect(screen.getByText('#1')).toBeInTheDocument();
		expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
		expect(screen.getByText('star_outline')).toBeInTheDocument();
	});

	it('should call the onFavorite on icon click', function () {
		const onFavorite = jest.fn();

		render(
			<PokemonTable
				rows={[
					{
						id: '1',
						name: 'Bulbasaur',
						favorite: false,
					},
				]}
				rowsPerPage={10}
				page={0}
				searchMode={false}
				onFavorite={onFavorite}
				onClick={jest.fn()}
				onPageChange={jest.fn()}
				onRowsPerPageChange={jest.fn()}
			/>,
		);

		fireEvent.click(screen.getByText('star_outline'));

		expect(onFavorite).toHaveBeenCalledTimes(1);
	});

	it('should render the table footer only if enough data is provided', function () {
		render(
			<PokemonTable
				rows={[
					{
						name: 'bulbasaur',
						id: '1',
						favorite: true,
					},
					{
						name: 'ivysaur',
						id: '2',
						favorite: true,
					},
					{
						name: 'venusaur',
						id: '3',
						favorite: true,
					},
					{
						name: 'charmander',
						id: '4',
						favorite: false,
					},
					{
						name: 'charmeleon',
						id: '5',
						favorite: false,
					},
					{
						name: 'charizard',
						id: '6',
						favorite: false,
					},
					{
						name: 'squirtle',
						id: '7',
						favorite: true,
					},
					{
						name: 'wartortle',
						id: '8',
						favorite: true,
					},
					{
						name: 'blastoise',
						id: '9',
						favorite: true,
					},
					{
						name: 'caterpie',
						id: '10',
						favorite: true,
					},
					{
						name: 'metapod',
						id: '11',
						favorite: true,
					},
					{
						name: 'butterfree',
						id: '12',
						favorite: false,
					},
					{
						name: 'weedle',
						id: '13',
						favorite: false,
					},
					{
						name: 'kakuna',
						id: '14',
						favorite: false,
					},
					{
						name: 'beedrill',
						id: '15',
						favorite: true,
					},
					{
						name: 'pidgey',
						id: '16',
						favorite: false,
					},
					{
						name: 'pidgeotto',
						id: '17',
						favorite: false,
					},
					{
						name: 'pidgeot',
						id: '18',
						favorite: false,
					},
					{
						name: 'rattata',
						id: '19',
						favorite: false,
					},
					{
						name: 'raticate',
						id: '20',
						favorite: false,
					},
				]}
				rowsPerPage={10}
				page={0}
				searchMode={false}
				onFavorite={jest.fn()}
				onClick={jest.fn()}
				onPageChange={jest.fn()}
				onRowsPerPageChange={jest.fn()}
			/>,
		);

		expect(screen.getByText('Rows per page:')).toBeInTheDocument();
	});
});
