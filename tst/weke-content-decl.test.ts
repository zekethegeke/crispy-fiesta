import { wrap } from 'jest-snapshot-serializer-raw';
import { Address, Addresses, addressesPage } from '../src/Addresses';
import { block, group, h3, span, uml, list1, list2, tableByMap, tableOf, tableByColumns } from 'weke-plex';

const addresses = (new Addresses(require("./test-addresses.json")));
const males = addresses.males.map(it => `"${it.first}" -> "Male"`);

test('yet another mark around language', () => {
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

test('yet another mark around list', () => {
    const dotComs = addresses.all.filter((it) => it.email.endsWith('.com'));
    const ofMales = (addy: Address) => males.filter((it) => it.includes(addy.first));

    const content = [
        h3 `Lists`,
        list1(males, (male) => 
            span `* each male: ${male}`),

        list2(dotComs, (dotCom) => 
            [ span `* each email: ${dotCom.email}`, 
                ofMales(dotCom)],
            (male) => 
                span `** each male: ${male}`),
    ].join("\n");
    expect(wrap(content)).toMatchSnapshot();
});

test('yet another mark around list', () => {
    const dotComs = addresses.all.filter((it) => it.email.endsWith('.com'))
        .slice(0, 10);

    const content = [
        h3 `tableOf`,
        tableOf(dotComs),

        h3 `tableOf filtered`,
        tableOf(dotComs, ['first', 'email']),

        h3 `tableByMap`,
        //  tableOf
        tableByMap(dotComs, (it) => {
            return { 
                "//First Name//": 
                    span `cell: ${it.first}`,
                "Last Name":
                    span `cell: ${it.last}`,
            }
        }),

        h3 `tableByColumns`,
        tableByColumns({
            rows: dotComs, 
            columns: [{   
                key: 'first', 
                headOf: (key) => `//${key.toUpperCase()}//`,
                cellOf: (data) => span `cell: ${data.value}`
            },{   
                key: 'last', 
                headOf: (key, colIndex) => `//${key.toUpperCase()}#${colIndex}//`,
                cellOf: (data) =>  group `
                    multiline: ${data.value}
                    ${data.rowIndex}:${data.colIndex}`
            },{   
                key: 'last', 
                headOf: (key, colIndex) => `//${key.toUpperCase()}#${colIndex}//`,
                cellOf: (data) =>  group `
                    multiline: ${data.value}
                    ${data.rowIndex}:${data.colIndex}`
            },]
        }),
        ].join("\n");
    expect(wrap(content)).toMatchSnapshot();
});
