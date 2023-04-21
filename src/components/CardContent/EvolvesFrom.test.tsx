import { render, screen } from '@testing-library/react';

import EvolvesFrom from './EvolvesFrom';

describe('Given i want to render evolves from section', function () {
	it('should render the pokemon name and the right url', function () {
		render(
			<EvolvesFrom
				name={'Bulbasaur'}
				url={'https://pokeapi.co/api/v2/pokemon-species/1'}
			/>,
		);

		expect(screen.getByText('Evolves from Bulbasaur')).toBeInTheDocument();
		expect(screen.getByRole('link')).toHaveAttribute('href', '/1');
	});
});
