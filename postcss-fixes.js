// PostCSS plugin to fix common CSS linting issues in the output
const postcss = require('postcss');

module.exports = postcss.plugin('postcss-fixes', () => {
  return (root) => {
    root.walkRules(rule => {
      // Fix appearance property
      rule.walkDecls('appearance', decl => {
        if (decl.value === 'button' && !decl.parent.some(d => d.prop === '-webkit-appearance')) {
          decl.cloneBefore({ prop: '-webkit-appearance', value: 'button' });
          decl.cloneBefore({ prop: '-moz-appearance', value: 'button' });
        }
      });

      // Fix vertical-align with display: block
      rule.walkDecls('display', (decl, i) => {
        if (decl.value === 'block') {
          const next = decl.next();
          if (next && next.prop === 'vertical-align') {
            next.remove();
          }
        }
      });
    });
  };
});
