async function getDirectory() {
    try {
        const response = await fetch('data/members.json');
        return await response.json();
    }
    catch (err) {
        console.log(err);
    }
}

export { getDirectory };