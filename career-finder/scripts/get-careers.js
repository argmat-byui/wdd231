async function getGeneric(path) {
    try {
        const response = await fetch(path);
        return await response.json();
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function getCareers() {
    const careers = await getGeneric('data/careers.json');
    const institutions = await getInstitutions();
    careers.forEach(career => {
        career.institution = institutions.find(i => i.id === career.institutionId);
        delete career.institutionId;
    });
    return careers;
}

async function getInstitutions() {
    return getGeneric('data/institutions.json');
}

export { getCareers };