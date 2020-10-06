import dedent from 'ts-dedent';

test('smooth talker', () => {
    const content = dedent `
        === Purpose ===
    `;
    expect(content).toMatchSnapshot();
});