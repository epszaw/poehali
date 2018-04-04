---
to: src/blocks/<%=name%>/<%=name%>.pug
skip_if: <%= name %>
---
mixin <%=name%>()
  +b.<%=name%>
    block
