import morgan from "morgan";

// Morgan middleware configuration
const morganMiddleware = morgan("dev", {
  stream: {
    write: (message) => {
      console.log(message.trim());
    },
  },
});

export default morganMiddleware;
