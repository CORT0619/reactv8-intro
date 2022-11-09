/* eslint-disable react/jsx-no-comment-textnodes */
import { useParams, useNavigate } from "react-router";
import { useState, useContext } from "react";
import fetchPet from "./fetchPet";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import ErrorBoundary from "./Errorboundary";
import Modal from './Modal';
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate(); // programmatically reroute somewhere

	// eslint-disable-next-line no-unused-vars
	const [_, setAdoptedPet] = useContext(AdoptedPetContext);
	const { id } = useParams(); // works through context, comes from browerrouter component in app.jsx
	const results = useQuery(["details", id], fetchPet); // "details" is the caching key
	// you cannot await in a render function
	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">🌪</h2>
			</div>
		)
	}

	const pet = results.data.pets[0];

	return (
		<div className="details">
			<Carousel images={pet.images} />
			<div>
				<h1>{pet.name}</h1>
				<h2>{pet.animal} - {pet.breed} - {pet.city}, {pet.state}</h2>
				<button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
				<p>{pet.description}</p>
				{
					showModal ?
					(
						<Modal>
							<div>
								<h1>Would you like to adopt {pet.name}?</h1>
								<div className="buttons">
									<button onClick={() => {
										setAdoptedPet(pet);
										navigate('/');
									}}>Yes</button>
									<button onClick={() => setShowModal(false)}>No</button>
								</div>
							</div>
						</Modal>
					) : null
				}
			</div>
		</div>
	);
	// return <h2>{id}</h2>;
};

// export default Details;

function DetailsErrorBoundary(props) {
	return (
		<ErrorBoundary>
			<Details {...props} /> {/* i dont care what props are coming in*/}
		</ErrorBoundary>
	);
}

export default DetailsErrorBoundary;

