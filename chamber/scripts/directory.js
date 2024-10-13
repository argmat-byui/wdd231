console.log('loaded directory.js');

const cardsContainer = document.querySelector('#cards-container');

async function getDirectory() {
    try {
        const response = await fetch('data/members.json');
        return await response.json();
    }
    catch (err) {
        console.log(err);
    }
}

const show = (directory, filterFn = () => true) => {
	const cards = directory.filter(filterFn).map(createCard);
	cardsContainer.innerHTML = cards.join('');
}

const createCard = (item) => {
	return `
			<div class="item-card">
				<img class="hover" src="${item.imageUrl}" loading="lazy" height="167" width="auto" alt="Córdoba temple">
                    <h2>${item.name}</h2>
                    <span class="card-value">${item.address}</span>
					<span class="card-value">${item.phoneNumber}</span>
                    <span class="card-value"><a href="${item.websiteUrl}">Website</a></span>
            </div>
		   `
}

async function init() {
    const directory = await getDirectory();
    show(directory);

}

init();

const viewSelectors = document.querySelectorAll('.view-selector');
console.log({ viewSelectors });

viewSelectors.forEach(e => e.addEventListener('click', function() {
    viewSelectors.forEach(e => {
        cardsContainer.classList.remove(e.dataset.viewSelectorKey)
        e.classList.remove('active');
    });
    this.classList.add('active');
    cardsContainer.classList.add(this.dataset.viewSelectorKey);
}));
