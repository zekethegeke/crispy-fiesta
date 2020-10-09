import { WekeBuilder } from 'weke-plex';
import { Addresses, addressesPage } from '../src/Addresses';
import { wrap } from 'jest-snapshot-serializer-raw';

const addresses = (new Addresses(require("./test-addresses.json")));

test('smooth talker', () => {
    const males = addresses.males.map(it => `"${it.first}" -> "Male"`);

    const builder = new WekeBuilder();
    const content: string = builder
        .h3("Purpose")
        .append("Our purpose is to test the content.\n")
        .h3(`//[[${addressesPage.path}]]//`)
        .startUml()
            .append("(*) - (*)\n")
            .append(males.join("\n"))
        .endUml()
        .build();

        expect(wrap(content)).toMatchSnapshot();
});