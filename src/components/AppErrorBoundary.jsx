import { Component } from 'react';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.appId !== this.props.appId && this.state.hasError) this.setState({ hasError: false });
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return <div className="app-error"><h2>This app could not open</h2><p>CyberDesk is still running. Close this window and try again.</p></div>;
  }
}
