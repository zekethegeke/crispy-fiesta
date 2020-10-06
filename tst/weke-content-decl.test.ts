import dedent from 'ts-dedent';

const h3 = (title:string) => `=== ${title} ===`;
const uml = (inner: string[]) => {
    return [ 
    dedent `
    {{plantUML}}
    @startuml
    `,
    ...inner,
    dedent `
    @enduml
    {{/plantUML}}
    `,
    ]
};

test('yet another mark around language', () => {
    // const json = require("./test-addresses.json");
    // expect(json).toMatchSnapshot();
    const content = [
        h3("Purpose"),
        // dedent `
        //     Our purpose is to test the content.
        // `,
    ].join("\n");
    expect(content).toMatchSnapshot();
});