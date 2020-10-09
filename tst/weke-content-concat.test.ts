import dedent from 'ts-dedent';
import { Addresses, addressesPage } from '../src/Addresses';
import { wrap } from 'jest-snapshot-serializer-raw';

const addresses = (new Addresses(require("./test-addresses.json")));

test('just the text, maam', () => {
    const males = addresses.males.map(it => `"${it.first}" -> "Male"`);

    const content = 
        dedent `
        === Purpose ===
        Our purpose is to test the content.
        === //[[${addressesPage.path}]]// ===
        {{plantUML}}
        @startuml`
        + "\n"
        + males.join("\n")
        + dedent `        
        @enduml
        {{/plantUML}}`
    ;
    expect(wrap(content)).toMatchSnapshot();
});