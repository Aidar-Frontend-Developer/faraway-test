import { render, screen, fireEvent } from '@testing-library/react';

import FavoriteIcon from './FavoriteIcon';

describe('Given i want to render the favorite icon', function () {
	it('should render the icon "star_outline" if not favorite', function () {
		const fn = jest.fn();

		render(<FavoriteIcon onToggle={fn} favorite={false} />);

		expect(screen.getByText('star_outline')).toBeInTheDocument();
	});

	it('should render the icon "star_outline" if favorite', function () {
		const fn = jest.fn();

		render(<FavoriteIcon onToggle={fn} favorite={true} />);

		expect(screen.getByText('star')).toBeInTheDocument();
	});

	it('should trigger the "onToggle" function when clicked', function () {
		const fn = jest.fn();

		render(<FavoriteIcon onToggle={fn} favorite={false} />);

		fireEvent.click(screen.getByText('star_outline'));

		expect(fn).toBeCalledTimes(1);
	});
});
