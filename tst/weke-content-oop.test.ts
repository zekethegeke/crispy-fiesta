import dedent from 'ts-dedent';

test('all your object belong to us', () => {
    const content = dedent `
        === Purpose ===
    `;
    expect(content).toMatchSnapshot();
});