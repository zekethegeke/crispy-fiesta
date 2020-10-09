import { WekeDocument, WekeDocumentSerializer, WekeH3Element, WekeUmlElement } from 'weke-plex';
import { Addresses, addressesPage } from '../src/Addresses';
import { wrap } from 'jest-snapshot-serializer-raw';

const addresses = (new Addresses(require("./test-addresses.json")));

test('all your object belong to us', () => {
    const doc = new WekeDocument();
    doc.appendElement(new WekeH3Element("Purpose"));
    doc.appendLine("Our purpose is to test the content.");

    doc.appendElement(new WekeH3Element(`//[[${addressesPage.path}]]//`));
    const uml = new WekeUmlElement();
    uml.appendLines(["(*) - (*)"]);
    uml.appendLines(addresses.males.map(it => `"${it.first}" -> "Male"`));
    doc.appendElement(uml);

    const serializer = new WekeDocumentSerializer();
    expect(wrap(serializer.serializeToString(doc))).toMatchSnapshot();
});