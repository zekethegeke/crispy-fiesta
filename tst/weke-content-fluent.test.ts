import dedent from 'ts-dedent';
import { Addresses } from '../src/Addresses';
import { wrap } from 'jest-snapshot-serializer-raw';
const addresses = (new Addresses(require("./test-addresses.json")));

class WekeUmlBuilder {
    private content: string;

    constructor(readonly builder: WekeBuilder) {
        this.content = "{{plantUML}}\n@startuml\n";
    }
    append(text: string):  WekeUmlBuilder {
        this.content += text;
        return this;
    }
    endUml() {
        this.content += "\n@enduml\n{{/plantUML}}";
        this.builder.append(this.content)
        return this.builder;
    }

}

class WekeBuilder {
    private content: string;
    constructor() {
        this.content = "";
    }

    h3(title: string): WekeBuilder {
        this.content += `=== ${title} ===\n`;
        return this;
    }
    append(text: string): WekeBuilder {
        this.content += text;
        return this;
    }
    startUml(): WekeUmlBuilder {
        return new WekeUmlBuilder(this);
    }
    build(): string { 
        return this.content;
    }
}

test('smooth talker', () => {
    const males = addresses.males.map(it => `"${it.first}" -> "Male"`);

    const builder = new WekeBuilder();
    const content: string = builder
        .h3("Purpose")
        .append("Our purpose is to test the content.\n")
        .startUml()
            .append("(*) - (*)\n")
            .append(males.join("\n"))
        .endUml()
        .build();

        expect(wrap(content)).toMatchSnapshot();
});