import { useState, useEffect } from 'react';
import Results from './Results';
import useBreedList from './useBreedList';

// not allowed to have side effects inside of your render functions, they need to be stateless
// use hooks to have state inside of a function
// hooks have to be called every single time in the same order
// anytime you see "use" that's a sign you're using a hook
// custom hooks are other hooks bundled together

const ANIMALS = ['dog', 'cat', 'bird', 'rabbit', 'reptile'];

const SearchParams = () => {
	const [location, setLocation] = useState(''); // default state in quotes
	const [animal, setAnimal] = useState('');
	const [breed, setBreed] = useState('');
	const [pets, setPets] = useState([]);
	const [breeds]  = useBreedList(animal);

	useEffect(() => { // all of this is called a controlled form
		requestPets();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	// will keep making the request everytime you type
// if you give it an empty array it'll only make the request once and never again
// if you give the array animal it's telling react every time animal changes then make another request 
	async function requestPets() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		);
		const json = await res.json();
		setPets(json.pets);
	}

	// call setLocation to let it know somehting changed and go update yourself
	return (
		<div className="search-params">
			<form onSubmit={(e) => {
				e.preventDefault();
				requestPets();
			}}>
				<label htmlFor="location">
					Location
					<input id="location" value={location} placeholder="Location" onChange={e => setLocation(e.target.value)} />
				</label>

				<label htmlFor="animal">
						Animal
					<select id="animal" value={animal} onChange={(e) => {
						setAnimal(e.target.value);
						setBreed("");
					}}>
					<option/>
					{
						ANIMALS.map((animal) => (
							<option key={animal} value={animal}>{animal}</option>
						))
					}
					</select>
				</label>

				<label htmlFor="breed">
					Breed
					<select id="breed" value={breed} disabled={breeds.length === 0} onChange={(e) => setBreed(e.target.value)}>
					<option/>
					{
						breeds.map((breed) => (
							<option key={breed} value={breed}>{breed}</option>
						))
					}
					</select>
				</label>				
				<button>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	);
};

export default SearchParams;

// what is an elastic search??