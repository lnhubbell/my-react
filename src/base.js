const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello Friend",
  },
}

const container = document.getElementById("root");

const node = document.createElement(element.type);
node["title"] = element.props.title;

const text2 = document.createTextNode("");
text2["nodeValue"] = element.props.children;

node.appendChild(text2);

container.appendChild(node);
