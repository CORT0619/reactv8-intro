const fetchPet = async ({ queryKey }) => {
	const id = queryKey[1];

	const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
	// if it was an unsuccessful request you should throw an error

	if (!apiRes.ok) {
		throw new Error(`details/${id} fetch not ok`);
	}
	
	return apiRes.json(); //react query expects you to return a promise
};

export default fetchPet;