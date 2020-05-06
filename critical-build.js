const critical = require('critical');
critical.generate({
  // Inline the generated critical-path CSS
  // - true generates HTML
  // - false generates CSS
  inline: true,

  // Your base directory
  base: '/',

  // HTML source
  html: '<html>...</html>',

  // HTML source file
  src: 'src/_index.html',

  // Your CSS Files (optional)
  css: ['src/css/style.min.css'],

  // Viewport width
  width: 1300,

  // Viewport height
  height: 900,

  // Output results to file
  target: {
    css: 'critical.css',
    html: 'index-critical.html',
    uncritical: 'uncritical.css'
  },

  // Minify critical-path CSS when inlining
  minify: true,

  // Extract inlined styles from referenced stylesheets
  extract: true,

  // Complete Timeout for Operation
  timeout: 30000,

  // ignore CSS rules
  ignore: {
    atrule: ['@font-face'],
    rule: [/some-regexp/],
    decl: (node, value) => /big-image\.png/.test(value)
  }
});