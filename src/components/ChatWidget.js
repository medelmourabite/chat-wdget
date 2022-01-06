import React, { PureComponent } from "react";

class ChatWidget extends PureComponent {
  constructor(props) {
    super(props);
    this.widgetRef = React.createRef();
  }

  componentDidMount() {
    if (window.ChatWidget !== undefined) {
      window.ChatWidget.mount(this.props, this.widgetRef.current);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (window.ChatWidget !== undefined) {
        window.ChatWidget.mount(this.props, this.widgetRef.current);
      }
    }
  }

  componentWillUnmount() {
    window.ChatWidget?.unmount(this.widgetRef.current);
  }

  render() {
    return <div ref={this.widgetRef}/>;
  }
}

export default ChatWidget;
