const babel = require('babel-core');
const content = `
type A = {
    foo: string
}
type Props = {
    bar: string,
    ...$Exact<A>
};
class MyComponent extends React.Component {
    props: Props;
}
`;

it('object-type-spread-exact', () => {
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
