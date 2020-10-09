import dedent from 'ts-dedent';
import { wrap } from 'jest-snapshot-serializer-raw';
import { Addresses } from '../src/Addresses';

const addresses = (new Addresses(require("./test-addresses.json")));

// type WekeFormat like WekeGroup? 
type WekeSpanParam = (string);
type WekeBlockParam = (WekeSpanParam | string[]);

function renderParam(param: WekeBlockParam): string {
    if (Array.isArray(param)) {
        return param.join("\n");
    }
    return param.toString();
}

// raw assumes the literals should be left alone
const span = (literals: TemplateStringsArray | string, ...params: WekeSpanParam[]): string => {
    let result = "";

    // interleave the literals with the params
    for (let i = 0; i < params.length; i++) {
        result += literals[i];
        result += renderParam(params[i]);
    }

    // add the last literal
    result += literals[literals.length - 1];
    return result;
}

// block will dedent the literals
const block = (literals: TemplateStringsArray | string, ...params: WekeBlockParam[]): string => {
    const rendered = params.map(param => renderParam(param));
    return dedent(literals, ...rendered);
}

const h3 = (literals: TemplateStringsArray | string, ...params: WekeSpanParam[]): string => {
    return "=== " + span(literals, ...params) + " ===";
}

const uml = (literals: TemplateStringsArray | string, ...params: WekeBlockParam[]): string => {
    return "{{plantUML}}\n@startuml\n"
        + block(literals, ...params)
        + "\n@enduml\n{{/plantUML}}";
}


test('yet another mark around language', () => {
    const males = addresses.males.map(it => `"${it.first}" -> "Male"`);

    const content = [
        h3 `Purpose`,
        block `
            Our purpose is to test the content.`,
        uml `
            (*) - (*)
            ${males}`,
    ].join("\n");
    expect(wrap(content)).toMatchSnapshot();
});