import { fireEvent, render, screen } from '@testing-library/react';

import { ILocation } from '../../models/interfaces';

import PokemonLocations from './PokemonLocations';

describe('Given i want to render pokemon basic content', function () {
	const generateLocation = (name: string) => ({
		location_area: {
			name,
		},
	});

	it('should render the found locations', function () {
		const locations = [generateLocation('Area 1')] as ILocation[];

		render(<PokemonLocations locations={locations} />);

		expect(screen.getByText('Area 1')).toBeInTheDocument();
	});

	it('should render the first 3 locations + a expand text', function () {
		const locations = [
			generateLocation('Area 1'),
			generateLocation('Area 2'),
			generateLocation('Area 3'),
			generateLocation('Area 4'),
		] as ILocation[];

		render(<PokemonLocations locations={locations} />);

		expect(screen.getByText('Area 1')).toBeInTheDocument();
		expect(screen.getByText('Area 2')).toBeInTheDocument();
		expect(screen.getByText('Area 3')).toBeInTheDocument();
		expect(screen.queryByText('Area 4')).not.toBeInTheDocument();
	});

	it('should render all the locations on expand', function () {
		const locations = [
			generateLocation('Area 1'),
			generateLocation('Area 2'),
			generateLocation('Area 3'),
			generateLocation('Area 4'),
		] as ILocation[];

		render(<PokemonLocations locations={locations} />);

		fireEvent.click(screen.getByText('Expand...'));

		expect(screen.getByText('Area 1')).toBeInTheDocument();
		expect(screen.getByText('Area 2')).toBeInTheDocument();
		expect(screen.getByText('Area 3')).toBeInTheDocument();
		expect(screen.getByText('Area 4')).toBeInTheDocument();
	});

	it('should render reduce the locations on reduce click', function () {
		const locations = [
			generateLocation('Area 1'),
			generateLocation('Area 2'),
			generateLocation('Area 3'),
			generateLocation('Area 4'),
		] as ILocation[];

		render(<PokemonLocations locations={locations} />);

		fireEvent.click(screen.getByText('Expand...'));
		fireEvent.click(screen.getByText('Reduce...'));

		expect(screen.getByText('Area 1')).toBeInTheDocument();
		expect(screen.getByText('Area 2')).toBeInTheDocument();
		expect(screen.getByText('Area 3')).toBeInTheDocument();
		expect(screen.queryByText('Area 4')).not.toBeInTheDocument();
	});
});
