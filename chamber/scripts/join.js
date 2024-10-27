import { getMemberships } from "./get-memberships.js";

const select = document.getElementById('membership');

const membershipsContainer = document.getElementById('memberships');

async function init() {
    const memberships = await getMemberships();
    show(memberships);
	initTimestamp();
}

function initTimestamp() {
	const timestampInput = document.getElementById('timestamp');
	// using the millis for the timestamp
	timestampInput.value = new Date().getTime();
}

function show (memberships) {
	select.innerHTML = '<option value="">-- Choose a membership --</option>' + memberships.map(p => `<option value="${p.level}">${p.level}</option>`).join('');
	membershipsContainer.innerHTML = `
		<h2>Membership Levels</h2>
		${memberships.map(createMembershipCard).join('\n')}
		<dialog class="modal" id="membership-modal"><button id="closeModal">X</button></dialog>
	`;
	memberships.forEach(membership => {
		const button = document.getElementById(`show${membership.code}Btn`);
		button.addEventListener('click', () => showModal(membership));
	})
}

function showModal (membership) {
	const membershipModal = document.getElementById('membership-modal');
	membershipModal.innerHTML =
	`
		<button id="close-modal">X</button>
		<h2>${membership.level} Membership Level</h2>
		<h4>Cost: U$S ${membership.price} Per Year</h4>
		<h3>Benefits:</h3>
		<ul>${membership.benefits.map(e =>`<li>${e}</li>`).join('')}</ul>
	`;
	membershipModal.showModal();
	const closeModal = document.getElementById('close-modal');
	closeModal.addEventListener('click', () => membershipModal.close());
}

function createMembershipCard (membership) {
	return `
		<div class="membership-card ${membership.level.toLowerCase()}">
			<p>${membership.level} Membership Level</p>
			<button id="show${membership.code}Btn">Learn More</button>
		</div>`;
}

init();