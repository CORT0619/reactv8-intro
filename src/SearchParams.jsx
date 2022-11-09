import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from './Results';
import useBreedList from './useBreedList';
import fetchSearch from './fetchSearch';
import AdoptedPetContext from './AdoptedPetContext';

// not allowed to have side effects inside of your render functions, they need to be stateless
// use hooks to have state inside of a function
// hooks have to be called every single time in the same order
// anytime you see "use" that's a sign you're using a hook
// custom hooks are other hooks bundled together

const ANIMALS = ['dog', 'cat', 'bird', 'rabbit', 'reptile'];

const SearchParams = () => {
	const [requestParams, setRequestParams] = useState({
		location: '',
		animal: '',
		breed: ''
	});
	const [animal, setAnimal] = useState('');
	const [breeds]  = useBreedList(animal);
	const [adoptedPet] = useContext(AdoptedPetContext); // this is reading from the adopted pet context

	const results = useQuery(['search', requestParams], fetchSearch);
	const pets = results?.data?.pets ?? [];	

	return (
		<div className="search-params">
			<form onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.target);
				const obj = {
					animal: formData.get('animal') ?? '',
					location: formData.get('location') ?? '',
					breed: formData.get('breed') ?? ''
				};
				setRequestParams(obj);
			}}>
				{
					adoptedPet ? (
						<div className="pet image-container">
							<img src={adoptedPet.images[0]} alt={adoptedPet.name} />
						</div>
					) : null
				}
				<label htmlFor="location">
					Location
					<input
						name="location"
						id="location"
						placeholder="Location"
					/>
				</label>

				<label htmlFor="animal">
						Animal
					<select id="animal" 
					  value={animal}
						onChange={(e) => {
						setAnimal(e.target.value);
					}}>
					<option/>
					{
						ANIMALS.map((animal) => (
							<option key={animal}>{animal}</option>
						))
					}
					</select>
				</label>

				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						name="breed"
						disabled={breeds.length === 0}
					>
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

/* what is an elastic search??*/