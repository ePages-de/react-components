export default require('unexpected')
  .clone()
  .use(require('unexpected-react'))
  .use(require('unexpected-sinon'))
  .use(require('unexpected-immutable'))
