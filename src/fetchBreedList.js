const fetchBreedList = async ({ queryKey }) => {
	const animal = queryKey[1];

	if (!animal) return [];

	const apiRes = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
	// if it was an unsuccessful request you should throw an error

	if (!apiRes.ok) {
		throw new Error(`breeds/${animal} fetch not ok`);
	}
	
	return apiRes.json(); //react query expects you to return a promise
};

export default fetchBreedList;

// useMutation allows you to post to a site and it won't cache it