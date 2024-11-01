import { getCareers } from "./get-careers.js";

const select = document.getElementById('career');

async function init() {
    const careers = await getCareers();
	careers.sort((a, b) => a.name.localeCompare(b.name));
	select.innerHTML = '<option value="">-- Choose a career --</option>' + careers.map(career => `<option value="${career.name} - ${career.institution.shortName}">${career.name} - ${career.institution.shortName}</option>`).join('');
}

init();