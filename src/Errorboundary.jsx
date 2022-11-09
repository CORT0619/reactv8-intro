import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
	state = { hasError: false };

	static getDerivedStateFromError() { // every time it has an error it will call this function
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		console.error('ErrorBoundary component caught an error ', error, info); // send to trackjs or sentry or newrelic
	}

	render() {
		if (this.state.hasError) {
			return ( // could return this.props.something to make it more reusable and then pass in something to the error boundary component where it's called
				<h2>
				There was an error with this listing. <Link to="/">Click here to go back to the home pages.</Link>
				</h2>
			);
		}

		return this.props.children; // should just render details normally with no interference
	}
}

export default ErrorBoundary;