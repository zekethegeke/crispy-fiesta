import { wrap } from 'jest-snapshot-serializer-raw';
import { Addresses, addressesPage } from '../src/Addresses';
import { block, h3, uml } from 'weke-plex';

const addresses = (new Addresses(require("./test-addresses.json")));

test('yet another mark around language', () => {
    const males = addresses.males.map(it => `"${it.first}" -> "Male"`);

    const content = [
        h3 `Purpose`,
        block `
            Our purpose is to test the content.`,
        h3 `//${addressesPage}//`,
        uml `
            (*) - (*)
            ${males}`,
    ].join("\n");
    expect(wrap(content)).toMatchSnapshot();
});