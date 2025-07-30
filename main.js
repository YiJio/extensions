/*window.addEventListener('load', () => {
	alert('In order to send email successfully, the reCAPTCHA must work. However, for reCAPTCHA to work, please disable an ad blocker. If that still doesn\'t work, try another browser without any extensions installed.');
  setTimeout(() => {
    if (typeof grecaptcha === 'undefined') {
      alert('CAPTCHA couldn\'t load. Please disable AdBlocker or try another browser.');
    }
  }, 3000);
});*/

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
		headers: { 'Content-Type': 'application/json', 'X-Api-Key': 'SNm9B5SqF0RIFvnBdwedFGDzazUxQTqD' },
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