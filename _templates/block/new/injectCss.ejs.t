---
inject: true
to: src/css/blocks.css
skip_if: <%= name %>
before: "/* Generated blocks */"
---
@import '../blocks/<%= name %>/<%= name %>.css';
