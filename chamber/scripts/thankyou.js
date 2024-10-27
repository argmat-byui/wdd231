function init () {
    const url = window.location.href;

    const rawFormData = (url.split('?')[1] ?? '').split('&');
    const entries = rawFormData.map(s => s.split('=')).map(([key, value]) => [key, decodeURIComponent(value).replace(/\+/g, ' ')]);
    const formData = Object.fromEntries(entries);
    const results = document.getElementById('results');
    results.innerHTML = `
    <p><b>First Name</b>: ${formData['first-name']}</p>
    <p><b>Last Name</b>: ${formData['last-name']}</p>
    <p><b>Email</b>: ${formData['email']}</p>
    <p><b>Phone Number</b>: ${formData['phone']}</p>
    <p><b>Organization</b>: ${formData['organization']}</p>
    <p><b>Date</b>: ${new Date(parseInt(formData['timestamp']))}</p>
    `
}

init();