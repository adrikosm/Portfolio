import "@testing-library/jest-dom";

beforeAll(() => {
  Object.defineProperty(window, "scrollTo", {
    value: jest.fn(),
    writable: true,
    configurable: true
  });

  if (!window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false
      })
    });
  }
});

beforeEach(() => {
  window.scrollTo.mockClear();
});

jest.mock("react-intersection-observer", () => ({
  useInView: () => [jest.fn(), true]
}));

jest.mock("typewriter-effect", () => {
  const React = require("react");
  return function TypewriterMock() {
    return React.createElement("span", null, "Typewriter");
  };
});

jest.mock("framer-motion", () => {
  const React = require("react");
  const motionPropNames = new Set([
    "animate",
    "initial",
    "exit",
    "variants",
    "whileHover",
    "whileInView",
    "whileTap",
    "transition",
    "viewport",
    "layout",
    "layoutId",
    "drag",
    "dragConstraints",
    "dragElastic",
    "dragMomentum"
  ]);
  const cache = new Map();

  const stripMotionProps = (props) => {
    const output = {};
    Object.entries(props).forEach(([key, value]) => {
      if (!motionPropNames.has(key)) {
        output[key] = value;
      }
    });
    return output;
  };

  const createMotionComponent = (tagName) =>
    React.forwardRef(function MotionComponent({ children, ...rest }, ref) {
      return React.createElement(tagName, { ref, ...stripMotionProps(rest) }, children);
    });

  const motion = new Proxy(
    {},
    {
      get: (_, tagName) => {
        if (!cache.has(tagName)) {
          cache.set(tagName, createMotionComponent(tagName));
        }
        return cache.get(tagName);
      }
    }
  );

  return {
    motion,
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    useReducedMotion: () => false
  };
});
