document.addEventListener('DOMContentLoaded', function() {
	const filters = document.querySelectorAll('.badge');
	const tools = document.querySelectorAll('.link');
	let activeFilter = 'ext';
	applyFilter(activeFilter);
	// change filter based on badge selection
	filters.forEach(button => {
		button.addEventListener('click', () => {
			filters.forEach(btn => btn.classList.replace('badge--on', 'badge--off'));
			button.classList.replace('badge--off', 'badge--on');
			activeFilter = button.id;
			applyFilter(activeFilter);
		});
	});
	// function to apply filter and render list
	function applyFilter(tag) {
		const visible = [];
		tools.forEach(item => {
			const bullet = item.querySelector('.bullet');
			if(bullet) bullet.remove();
			if(item.classList.contains(tag)) {
				item.style.display = '';
				visible.push(item);
			} else {
				item.style.display = 'none';
			}
		});
		if(visible.length > 1) {
			visible.forEach((item, index) => {
				if(index < visible.length - 1) {
					const bullet = document.createElement('span');
					bullet.className = 'bullet';
					bullet.innerHTML = '&bull;';
					item.appendChild(bullet);
				}
			});
		}
	}
});