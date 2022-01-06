import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from "./components/Chat/Chat";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


window.ChatWidget = {
  mount: (props, container) => {
    ReactDOM.render(<Chat {...props} />, container);
  },
  unmount: (container) => {
    ReactDOM.unmountComponentAtNode(container);
  }
};
