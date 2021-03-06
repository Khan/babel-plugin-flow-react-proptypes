const babel = require('babel-core');
const content = `
var React = require('react');

type FooProps = {
  foo: ?string,
}

export default class Foo extends React.Component {
  props: FooProps
}
`;

it('nullable', () => {
  const res = babel.transform(content, {
    babelrc: false,
    presets: ['@babel/env', '@babel/react', '@babel/flow'],
    plugins: [
      '@babel/syntax-flow',
      require('../'),
      "@babel/plugin-proposal-class-properties"
    ],
  }).code;
  expect(res).toMatchSnapshot();
});
