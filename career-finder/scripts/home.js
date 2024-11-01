const opinionsContainer = document.getElementById('opinion-cards-container');

function createOpinionCard (user) {
	return `
        <div class="opinion-card">
			<img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}" loading="lazy">
            <h2>${user.name.first} ${user.name.last}</h2>
            <p>Age: ${user.dob.age}</p>
            <p>"${user.opinion}"</p>
        </div>
        `;
}

function getRandom(array, count=1) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

const showOpinions = async () => {
    try {
        const { results: users } = await fetch('https://randomuser.me/api/?results=8').then(response => response.json());
        const userOpinions = getRandom(opinions, users.length);
        users.forEach((user, index) => user.opinion = userOpinions[index]);
        opinionsContainer.innerHTML = users.map(createOpinionCard).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const opinions = [
    "Studying IT has opened so many doors for my career!",
    "I loved the hands-on approach in my programming classes.",
    "The professors were industry experts, which made learning so much more relevant.",
    "I never realized how much I would enjoy data science until I took the course.",
    "Networking with fellow students and alumni has been invaluable!",
    "Cybersecurity classes were intense but incredibly rewarding.",
    "The project-based learning really helped me understand the concepts.",
    "I found my passion for artificial intelligence during my studies.",
    "Completing my degree online allowed me to work and study at the same time.",
    "The support from career services helped me land my first job.",
    "My experience in the IT program was life-changing; I learned so much!",
    "The curriculum was challenging but incredibly rewarding; I feel well-prepared for my career.",
    "I loved the collaborative projects; working with peers really enhanced my learning experience.",
    "Studying IT has equipped me with skills that are in high demand in the job market.",
    "The diversity of courses available allowed me to explore different areas of technology.",
    "I appreciated the real-world applications of our coursework; it made learning exciting.",
    "The internship opportunities offered by the program were invaluable for my career growth.",
    "I enjoyed the supportive community; my classmates and professors were always there to help.",
    "The emphasis on critical thinking and problem-solving skills has been crucial in my job.",
    "Taking online classes provided me with the flexibility I needed while working part-time.",
    "I was surprised by how much I enjoyed my cybersecurity courses; they were fascinating!",
    "Learning about data analytics opened my eyes to new career possibilities.",
    "The hands-on labs were my favorite part of the program; they made complex concepts easier to understand.",
    "The faculty were knowledgeable and passionate; their enthusiasm was contagious.",
    "Networking events connected me with industry leaders, which helped me land my dream job.",
    "I found the coursework in software development particularly engaging; it ignited my passion for coding.",
    "The program's focus on emerging technologies kept me on the cutting edge of the industry.",
    "I loved the freedom to choose elective courses; it allowed me to tailor my education to my interests.",
    "Completing group projects taught me valuable teamwork skills that I use every day at work.",
    "Studying IT has transformed my perspective on technology and its impact on society."
];

showOpinions();