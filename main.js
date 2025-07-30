window.addEventListener('load', () => {
  setTimeout(() => {
    if (typeof grecaptcha === 'undefined') {
      alert('CAPTCHA couldn\'t load. Please disable AdBlocker or try another browser.');
    }
  }, 3000);
});

document.getElementById('form').addEventListener('submit', async(e) => {
	e.preventDefault();
	const fieldEmail = document.getElementById('email').value;
	const fieldCategory = document.getElementById('category').value;
	const fieldSubject = document.getElementById('subject').value;
	const fieldMessage = document.getElementById('message').value;
	const captchaToken = grecaptcha.getResponse();
	if(!captchaToken) {
		alert('Please complete the CAPTCHA.');
		return;
	}
	const res = await fetch('https://service.yijione.com/email/send', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ source: 'GitHub', email: fieldEmail, category: fieldCategory, subject: fieldSubject, message: fieldMessage, captchaToken }),
	});
	const data = await res.json();
	if(data.error) {
		alert('Failed: ' + data.error);
	} else {
		alert('Message sent!');
		grecaptcha.reset();
	}
});