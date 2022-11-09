import { Component } from 'react';

class Carousel extends Component { // class components and hooks do not mix
	state = { // we keep track of state with state, change state with this.setstate
		active: 0
	};

	// lifecycle methods are like using useEffect to make a request, for class components you'd say componentDidMount (gets run once when it mounts onto the dom and never gets run again), componentDidUpdate(run whenever the state updates), componentWillUnmount, useEffect combines these lifecycle methods

	// no advantage to using a class component over a functional component, fine-tuning with performance for a class component though

	static defaultProps = {
		images: ['http://pets-images.dev-apis.com/pets/none.jpg'] // what the images props will be if nothing is passed in
	}

	handleIndexClick = (e) => { // when you invoke an arrow function it doesn't create new scope (scope is wherever its written - carousel), other functions create a new scope at the point of invocation
		console.log(this);
		this.setState({
			active: +e.target.dataset.index // dataset refers to things named data-* on html elements, unary plus which takes a string and converts it to a number
		})
	}

	// if you need to use a hook with a class component you make a small top level parent component
	// error boundary must be written as a class component

	render() { // must have a render function
		const {active} = this.state; // state is mutable, can be changed with this.setState
		const {images} = this.props; // immutable 

		return (
			<div className='carousel'>
				<img src={images[active]} alt="animal hero" />
				<div className='carousel-smaller'>
				{images.map((photo, index) => (
					// eslint-disable-next-line
					<img
						onClick={this.handleIndexClick}
						data-index={index}
						key={photo}
						src={photo}
						className={index === active ? 'active' : ''}
						alt="animal thumbnail"
					/>	
				))}
				</div>
			</div>
		);
	}
}

export default Carousel;