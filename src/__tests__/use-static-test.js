const babel = require('babel-core');
const content = `
var React = require('react');

type Props = { x: string }

class C extends React.Component<Props> {
  static test = 1;
  render() { return <div /> }
}
`;

it('use-static', () => {
  const res = babel.transform(content, {
    babelrc: false,
    presets: ['@babel/env', '@babel/react', '@babel/flow'],
    plugins: ['@babel/syntax-flow',
      [require('../'), { useStatic: true }],
      "@babel/plugin-proposal-class-properties",
    ],
  }).code;
  expect(res).toMatchSnapshot();
  expect(res).toMatch(/.propTypes =/);
});
