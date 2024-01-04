/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'


export class ErrorBoundaryPage extends React.Component {
  state = { error: false, errorMsg: "", errorStack: "" };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    // Log or store the error
    this.setState({ errorMsg: error.message, errorStack: error.stack });
  }

  render() {
    return this.state.error ? (
      <div>
        Something Error
        <h3>{this.props.fallback}</h3>
        <p>{JSON.stringify(this.state.errorMsg, null, 4)}</p>
        <p>{JSON.stringify(this.state.errorStack, null, 4)}</p>
      </div>
    ) : (
      <>{this.props.children}</>
    );
  }
}
