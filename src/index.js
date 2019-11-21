function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}

/**
 * Creates a base level text element.
 *  @param {text}   text This is the text that will be displayed within this element.
 */
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function render(element, container) {
  const dom = element.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type);

  const isProperty = key => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    })

  element.props.children.forEach(child => {
    render(child, dom);
  });

  container.appendChild(dom);
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitofWork && !shouldYield) {
    nextUnitofWork = performUnitOfWork(
      nextUnitofWork
    )
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(nextUnitofWork) {
  // TODO
}

const Didact = {
  createElement,
  render,
}

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <h1>bar</h1>
    hey
    <b />
  </div>
)

const container = document.getElementById("root");
Didact.render(element, container);
