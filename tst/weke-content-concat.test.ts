import dedent from 'ts-dedent';
import { Addresses } from '../src/Addresses';
import { wrap } from 'jest-snapshot-serializer-raw';
const addresses = (new Addresses(require("./test-addresses.json")));

test('just the text, maam', () => {
    const males = addresses.males.map(it => `"${it.first}" -> "Male"`);

    const umlContent = males.join("\n");

    const content = 
        dedent `
        === Purpose ===
        Our purpose is to test the content.
        {{plantUML}}
        @startuml
        

        `
        + umlContent
        + dedent `        

        @enduml
        {{/plantUML}}`
    ;
    expect(wrap(content)).toMatchSnapshot();
});