function init () {
    const url = window.location.href;
    const rawFormData = (url.split('?')[1] ?? '').split('&');
    const entries = rawFormData.map(s => s.split('=')).map(([key, value]) => [key, decodeURIComponent(value).replace(/\+/g, ' ')]);
    const formData = Object.fromEntries(entries);
    const results = document.getElementById('results');
    const count = readAndSetCount();
    results.innerHTML = `
    <p><b>You have contacted us ${count} time${count === 1 ? '' : 's'}</p>
    <p><b>First Name</b>: ${formData['first-name']}</p>
    <p><b>Last Name</b>: ${formData['last-name']}</p>
    <p><b>Email</b>: ${formData['email']}</p>
    <p><b>Phone Number</b>: ${formData['phone']}</p>
    <p><b>Career</b>: ${formData['career']}</p>
    <p><b>Educational background</b>: ${formData['edutational-background']}</p>
    <p><b>Question</b>: ${formData['question']}</p>
    `
}

function readAndSetCount() {
    let previousCount = localStorage.getItem('formCount');
    if (previousCount === null) {
        previousCount = 0;
    } else {
        previousCount = parseInt(previousCount);
    }
    const count = previousCount + 1;
    localStorage.setItem('formCount', count);
    return count;
}

init();