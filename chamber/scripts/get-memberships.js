async function getMemberships() {
    try {
        const response = await fetch('data/memberships.json');
        return await response.json();
    }
    catch (err) {
        console.log(err);
    }
}

export { getMemberships };