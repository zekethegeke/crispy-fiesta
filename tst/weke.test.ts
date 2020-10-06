import { double } from 'weke-plex';

test('adds 2 * 2  to equal 4', () => {
	expect(double(2)).toBe(4);
});
	
test('adds 2 * 2  to equal 4', () => {
	expect(double(2)).toMatchSnapshot();
});
