import { getCareers } from "./get-careers.js";

const cardsContainer = document.querySelector('#cards-container');

const show = (careers, filterFn = () => true) => {
	const cards = careers.filter(filterFn).map(createCard);
	cardsContainer.innerHTML = `
            ${cards.join('\n')}
            <dialog class="modal" id="career-modal"><button id="closeModal">X</button></dialog>
        `;
    careers.forEach(career => {
        const card = document.getElementById(`item-card-${career.id}`);
		card.addEventListener('click', () => showModal(career));
	});
}

const createCard = (item) => {
	return `
			<div class="item-card" id="item-card-${item.id}">
                <div style="background-color: #394f77">
                    <h2 style="color: white;">${item.name}</h2>
                </div>
                <div class="content-careers">
                    <div class="content-image">
                        <img class="hover" 
                            src="${item.institution.imageUrl}" 
                            loading="lazy" 
                            alt="${item.institution.shortName} logo">
                    </div>
                    <div class="content-text">
                        <p>${item.institution.name}</p>
                    </div>
                </div>
                <div>
                    Price level: ${item.price || 'FREE'}
                </div>
            </div>
		   `
}

function showModal (item) {
	const modal = document.getElementById('career-modal');
	modal.innerHTML =
	`
        <div class="career-card">
            <div class="career-header">
                <h2>Details</h2>
                <button class="close-button" aria-label="Close" id="close-modal">&times;</button>
            </div>
            <div class="career-details">
                <p><strong>Career:</strong> ${item.name}</p>
                <p><strong>Institution:</strong> ${item.institution.name}</p>
                <p><strong>Course format:</strong> ${item.courseFormat}</p>
                <p><strong>Duration:</strong> ${item.durationInYears} years</p>
                <p><strong>Price:</strong> ${item.price || 'FREE'} </p>
                <a href="${item.websiteUrl}" target="_blank" class="website-link">Visit Website</a>
            </div>
        </div>
	`;
	modal.showModal();
	const closeModal = document.getElementById('close-modal');
	closeModal.addEventListener('click', () => modal.close());
}

async function init() {
    const careers = await getCareers();
    show(careers);

}

init();

const viewSelectors = document.querySelectorAll('.view-selector');

viewSelectors.forEach(e => e.addEventListener('click', function() {
    viewSelectors.forEach(e => {
        cardsContainer.classList.remove(e.dataset.viewSelectorKey)
        e.classList.remove('active');
    });
    this.classList.add('active');
    cardsContainer.classList.add(this.dataset.viewSelectorKey);
}));
