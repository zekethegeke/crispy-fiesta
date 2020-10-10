import { WekeDocument, WekeDocumentSerializer, WekeH3Element, WekeUmlElement } from 'weke-plex';
import { Addresses, addressesPage } from '../src/Addresses';
import { wrap } from 'jest-snapshot-serializer-raw';

const addresses = (new Addresses(require("./test-addresses.json")));
const males = addresses.males.map(it => `"${it.first}" -> "Male"`);

test('all your object belong to us', () => {
    const doc = new WekeDocument();
    doc.appendElement(new WekeH3Element("Purpose"));
    doc.appendLine("Our purpose is to test the content.");

    doc.appendElement(new WekeH3Element(`//[[${addressesPage.path}]]//`));
    const uml = new WekeUmlElement();
    uml.appendLines(["(*) - (*)"]);
    uml.appendLines(males);
    doc.appendElement(uml);

    const serializer = new WekeDocumentSerializer();
    expect(wrap(serializer.serializeToString(doc))).toMatchSnapshot();
});

test('all your list belong to us', () => {
    const doc = new WekeDocument();
    doc.appendElement(new WekeH3Element("Lists"));

    // const list1 = new WekeListElement();
    // males.forEach((male) => list1.appendLine(`each male: ${male}`));
    // doc.appendElement(list1);
    
    // const dotComs = addresses.all.filter((it) => it.email.endsWith('.com'));
    // const ofMales = (addy: Address) => males.filter((it) => it.includes(addy.first));
    // const list2 = new WekeListElement();
    // dotComs.forEach(dotCom => {
    //     list2.appendLine(`each dotCom: ${dotCom.email}`);
    //     const list3 = new WekeListElement();
    //     ofMales(dotCom).forEach((male) => {
    //         list3.appendLine(`each male: ${male}`);
    //     });
    //     list2.appendElement(list3);
    // });
    // doc.appendElement(list2);
    
    const serializer = new WekeDocumentSerializer();
    expect(wrap(serializer.serializeToString(doc))).toMatchSnapshot();
});