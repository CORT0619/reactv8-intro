import Pet from './Pet';

const Results = ({ pets }) => {
	return (
		<div className='search'>
			{!pets.length ? (
				<h1>No Pets Found</h1>
			) : (
				pets.map(pet => (
					<Pet 
						animal={pet.animal}
						id={pet.id}
						key={pet.id}
						breed={pet.breed}
						name={pet.name}
						images={pet.images}
						location={`${pet.city}, ${pet.state}`}
					/>
				))
			)}
		</div>
	);
};

export default Results;