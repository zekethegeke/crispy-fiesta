import dedent from 'ts-dedent';
import { Addresses } from '../src/Addresses';
import { wrap } from 'jest-snapshot-serializer-raw';
const addresses = (new Addresses(require("./test-addresses.json")));

interface WekeLineWriter {
    append(lines: string[]): void;
}

interface WekeElement {
    readonly tag: string,
    toLines(writer: WekeLineWriter): void;
}

class WekeUmlElement implements WekeElement {
    readonly tag = "UML";
    private lines: string[] = [];
    appendLines(lines: string[]) {
        this.lines = this.lines.concat(lines);
    }
    toLines(writer: WekeLineWriter): void {
        writer.append(["{{plantUML}}", 
            "@startuml"]);
        
            writer.append(this.lines);
        
        writer.append(["@enduml", 
            "{{/plantUML}}"]);
    }
}

class WekeLinesElement implements WekeElement {
    readonly tag = "LINES";
    constructor(readonly lines: string[]) {

    }
    toLines(writer: WekeLineWriter): void {
        writer.append(this.lines);
    }
}

class WekeH3Element implements WekeElement {
    readonly tag = "H3";
    constructor(readonly text: string) {

    }
    toLines(writer: WekeLineWriter): void {
        writer.append([`=== ${this.text} ===`]);
    }
}

class WekeDocument {
    private _elements: WekeElement[] = [];

    public get elements(): WekeElement[] {
        return this._elements;
    }

    appendElements(elements: WekeElement[]): void {
        this._elements = this._elements.concat(elements);
    }

    appendLine(line: string): void {
        this.appendElements([new WekeLinesElement([line])]);
    }

    toLines(writer: WekeLineWriter): void {
        this._elements.forEach(it => it.toLines(writer));
    }

}

class WekeDocumentSerializer {
    serializeToString(doc: WekeDocument): string {
        var result: string[] = [];
        const writer: WekeLineWriter = {
            append(lines) {
                result = result.concat(lines);
            }
        }
        doc.toLines(writer);
        return result.join("\n");
    }
}

test('all your object belong to us', () => {
    const doc = new WekeDocument();
    doc.appendElements([new WekeH3Element("Purpose")]);
    doc.appendLine("Our purpose is to test the content.");

    const uml = new WekeUmlElement();
    uml.appendLines(["(*) - (*)"]);
    uml.appendLines(addresses.males.map(it => `"${it.first}" -> "Male"`));
    doc.appendElements([uml]);

    const serializer = new WekeDocumentSerializer();
    expect(wrap(serializer.serializeToString(doc))).toMatchSnapshot();
});