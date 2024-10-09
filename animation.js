document.addEventListener('DOMContentLoaded', () => {

	const flowersContainer = document.querySelector('.flowers-container');
	const flowerTemplate = document.querySelector('.flower');
	let isAnimationActive = false;  // Изначально анимация выключена

	// Create animation control button and add it to the bottom of main
	const controlButton = document.createElement('button');
	controlButton.id = 'animation-control';
	controlButton.textContent = 'Нажми меня 😉';  // Изначальный текст кнопки с улыбающимся смайлом
	document.querySelector('main').appendChild(controlButton);

	controlButton.addEventListener('click', toggleAnimation);

	function toggleAnimation() {
		isAnimationActive = !isAnimationActive;
		controlButton.textContent = isAnimationActive ? 'Остановка анимации' : 'Нажми меня 😉';

		if (isAnimationActive) {
			createFallingHeart(); // Запускаем анимацию
		} else {
			const hearts = document.querySelectorAll('.falling-heart');
			hearts.forEach(heart => heart.remove());
		}
	}

	function createFallingHeart() {
		const cardSection = document.querySelector('#card-section');
		const heart = document.createElement('div');
		heart.classList.add('falling-heart');
		cardSection.appendChild(heart);

		// Start from top with random horizontal position
		const startX = Math.random() * cardSection.offsetWidth;
		heart.style.left = `${startX}px`;
		heart.style.top = '0px';

		// Random angle between -30 and 30 degrees for slight horizontal movement
		const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
		const speed = 1 + Math.random() * 2;
		const dx = Math.sin(angle) * speed; // Horizontal movement
		const dy = Math.cos(angle) * speed + 1; // Vertical movement, always downward

		let x = startX;
		let y = 0;
		let opacity = 1;

		function animate() {
			if (!isAnimationActive) {
				heart.remove();
				return;
			}

			x += dx;
			y += dy;

			// Start fading out when heart is 70% down the container
			if (y > cardSection.offsetHeight * 0.85) {
				opacity -= 0.05;
			}

			heart.style.left = `${x}px`;
			heart.style.top = `${y}px`;
			heart.style.opacity = opacity;

			if (opacity <= 0 || y > cardSection.offsetHeight) {
				heart.remove();
			} else {
				requestAnimationFrame(animate);
			}
		}

		requestAnimationFrame(animate);

		// Следующее сердце создадим только если анимация активна
		if (isAnimationActive) {
			setTimeout(createFallingHeart, 100);
		}
	}

	// Не запускаем анимацию сразу после загрузки страницы
	// isAnimationActive = true;
	// createFallingHeart();

	// Remove original flower
	flowersContainer.removeChild(flowerTemplate);

	// Create flowers
	for (let i = 0; i < 8; i++) {
		const newFlower = flowerTemplate.cloneNode(true);
		flowersContainer.appendChild(newFlower);
	}


	// const flowersContainer = document.querySelector('.flowers-container');
	// const flowerTemplate = document.querySelector('.flower');
	// let isAnimationActive = true;

	// // Create animation control button and add it to the bottom of main
	// const controlButton = document.createElement('button');
	// controlButton.id = 'animation-control';
	// controlButton.textContent = 'Остановка анимации';
	// document.querySelector('main').appendChild(controlButton);

	// controlButton.addEventListener('click', toggleAnimation);

	// function toggleAnimation() {
	// 	isAnimationActive = !isAnimationActive;
	// 	controlButton.textContent = isAnimationActive ? 'Остановка анимации' : 'Старт анимации';

	// 	if (isAnimationActive) {
	// 		createFallingHeart(); // Запускаем анимацию
	// 	} else {
	// 		const hearts = document.querySelectorAll('.falling-heart');
	// 		hearts.forEach(heart => heart.remove());
	// 	}
	// }

	// function createFallingHeart() {
	// 	const cardSection = document.querySelector('#card-section');
	// 	const heart = document.createElement('div');
	// 	heart.classList.add('falling-heart');
	// 	cardSection.appendChild(heart);

	// 	// Start from top with random horizontal position
	// 	const startX = Math.random() * cardSection.offsetWidth;
	// 	heart.style.left = `${startX}px`;
	// 	heart.style.top = '0px';

	// 	// Random angle between -30 and 30 degrees for slight horizontal movement
	// 	const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
	// 	const speed = 1 + Math.random() * 2;
	// 	const dx = Math.sin(angle) * speed; // Horizontal movement
	// 	const dy = Math.cos(angle) * speed + 1; // Vertical movement, always downward

	// 	let x = startX;
	// 	let y = 0;
	// 	let opacity = 1;

	// 	function animate() {
	// 		if (!isAnimationActive) {
	// 			heart.remove();
	// 			return;
	// 		}

	// 		x += dx;
	// 		y += dy;

	// 		// Start fading out when heart is 70% down the container
	// 		if (y > cardSection.offsetHeight * 0.85) {
	// 			opacity -= 0.05;
	// 		}

	// 		heart.style.left = `${x}px`;
	// 		heart.style.top = `${y}px`;
	// 		heart.style.opacity = opacity;

	// 		if (opacity <= 0 || y > cardSection.offsetHeight) {
	// 			heart.remove();
	// 		} else {
	// 			requestAnimationFrame(animate);
	// 		}
	// 	}

	// 	requestAnimationFrame(animate);

	// 	// Следующее сердце создадим только если анимация активна
	// 	if (isAnimationActive) {
	// 		setTimeout(createFallingHeart, 100);
	// 	}
	// }

	// // Start animation immediately after page load
	// isAnimationActive = true;
	// createFallingHeart();

	// // Remove original flower
	// flowersContainer.removeChild(flowerTemplate);

	// // Create flowers
	// for (let i = 0; i < 8; i++) {
	// 	const newFlower = flowerTemplate.cloneNode(true);
	// 	flowersContainer.appendChild(newFlower);
	// }

	const flowers = document.querySelectorAll('.flower');

	flowers.forEach(flower => {
		const stem = flower.querySelector('.stem');
		const leaves = flower.querySelectorAll('.leaf');
		const petals = flower.querySelectorAll('.petal');
		const flowerCenter = flower.querySelector('.flower-center');

		gsap.set([stem, leaves, petals, flowerCenter], { drawSVG: "0%" });

		const tl = gsap.timeline({ defaults: { ease: "power1.inOut", delay: 0 } });

		tl.to(stem, { drawSVG: "100%", duration: 1 })
			.to(leaves, { drawSVG: "100%", opacity: 1, duration: 0.5, stagger: 0.2 }, "-=0.5")
			.to(petals, { drawSVG: "100%", opacity: 1, duration: 0.5, stagger: 0.1 })
			.to(flowerCenter, { drawSVG: "100%", opacity: 1, duration: 0.5 }, "-=0.5");

		// Swaying animation
		gsap.to(flower, {
			rotation: 5,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			transformOrigin: "bottom center"
		});

		// Leaf animation
		gsap.to(leaves, {
			rotation: 10,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			transformOrigin: "bottom center",
			stagger: {
				each: 0.2,
				from: "random"
			}
		});

		// Petal animation
		gsap.to(petals, {
			scale: 1.05,
			duration: 1.5,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			transformOrigin: "bottom center",
			stagger: {
				each: 0.1,
				from: "center"
			}
		});
	});

	// Card handling
	const cards = document.querySelectorAll('.card-3d');
	cards.forEach(card => {
		card.addEventListener('click', () => {
			card.classList.toggle('open');
			updateAriaExpanded(card);
		});

		card.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				card.classList.toggle('open');
				updateAriaExpanded(card);
			}
		});
	});

	function updateAriaExpanded(card) {
		const isOpen = card.classList.contains('open');
		card.setAttribute('aria-expanded', isOpen);
	}
});












// document.addEventListener('DOMContentLoaded', () => {
// 	const flowersContainer = document.querySelector('.flowers-container');
// 	const flowerTemplate = document.querySelector('.flower');
// 	let isAnimationActive = false;
// 	let animationInterval;

// 	// Create animation control button and add it to the bottom of main
// 	const controlButton = document.createElement('button');
// 	controlButton.id = 'animation-control';
// 	controlButton.textContent = 'Остановка анимации';
// 	document.querySelector('main').appendChild(controlButton);

// 	controlButton.addEventListener('click', toggleAnimation);

// 	function toggleAnimation() {
// 		isAnimationActive = !isAnimationActive;
// 		controlButton.textContent = isAnimationActive ? 'Остановка анимации' : 'Старт анимации';

// 		if (isAnimationActive) {
// 			animationInterval = setInterval(createFallingHeart, 100);
// 		} else {
// 			clearInterval(animationInterval);
// 			const hearts = document.querySelectorAll('.falling-heart');
// 			hearts.forEach(heart => heart.remove());
// 		}
// 	}

// 	// Start animation immediately after page load
// 	isAnimationActive = true;
// 	animationInterval = setInterval(createFallingHeart, 100);

// 	function createFallingHeart() {
// 		const cardSection = document.querySelector('#card-section');
// 		const heart = document.createElement('div');
// 		heart.classList.add('falling-heart');
// 		cardSection.appendChild(heart);

// 		// Start from top with random horizontal position
// 		const startX = Math.random() * cardSection.offsetWidth;
// 		heart.style.left = `${startX}px`;
// 		heart.style.top = '0px';

// 		// Random angle between -30 and 30 degrees for slight horizontal movement
// 		const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
// 		const speed = 1 + Math.random() * 2;
// 		const dx = Math.sin(angle) * speed; // Horizontal movement
// 		const dy = Math.cos(angle) * speed + 1; // Vertical movement, always downward

// 		let x = startX;
// 		let y = 0;
// 		let opacity = 1;

// 		function animate() {
// 			if (!isAnimationActive) {
// 				heart.remove();
// 				return;
// 			}

// 			x += dx;
// 			y += dy;

// 			// Start fading out when heart is 70% down the container
// 			if (y > cardSection.offsetHeight * 0.85) {
// 				opacity -= 0.05;
// 			}

// 			heart.style.left = `${x}px`;
// 			heart.style.top = `${y}px`;
// 			heart.style.opacity = opacity;

// 			if (opacity <= 0 || y > cardSection.offsetHeight) {
// 				heart.remove();
// 			} else {
// 				requestAnimationFrame(animate);
// 			}
// 		}

// 		requestAnimationFrame(animate);
// 	}

// 	// Remove original flower
// 	flowersContainer.removeChild(flowerTemplate);

// 	// Create flowers
// 	for (let i = 0; i < 8; i++) {
// 		const newFlower = flowerTemplate.cloneNode(true);
// 		flowersContainer.appendChild(newFlower);
// 	}

// 	const flowers = document.querySelectorAll('.flower');

// 	flowers.forEach(flower => {
// 		const stem = flower.querySelector('.stem');
// 		const leaves = flower.querySelectorAll('.leaf');
// 		const petals = flower.querySelectorAll('.petal');
// 		const flowerCenter = flower.querySelector('.flower-center');

// 		gsap.set([stem, leaves, petals, flowerCenter], { drawSVG: "0%" });

// 		const tl = gsap.timeline({ defaults: { ease: "power1.inOut", delay: 0 } });

// 		tl.to(stem, { drawSVG: "100%", duration: 1 })
// 			.to(leaves, { drawSVG: "100%", opacity: 1, duration: 0.5, stagger: 0.2 }, "-=0.5")
// 			.to(petals, { drawSVG: "100%", opacity: 1, duration: 0.5, stagger: 0.1 })
// 			.to(flowerCenter, { drawSVG: "100%", opacity: 1, duration: 0.5 }, "-=0.5");

// 		// Swaying animation
// 		gsap.to(flower, {
// 			rotation: 5,
// 			duration: 2,
// 			repeat: -1,
// 			yoyo: true,
// 			ease: "sine.inOut",
// 			transformOrigin: "bottom center"
// 		});

// 		// Leaf animation
// 		gsap.to(leaves, {
// 			rotation: 10,
// 			duration: 2,
// 			repeat: -1,
// 			yoyo: true,
// 			ease: "sine.inOut",
// 			transformOrigin: "bottom center",
// 			stagger: {
// 				each: 0.2,
// 				from: "random"
// 			}
// 		});

// 		// Petal animation
// 		gsap.to(petals, {
// 			scale: 1.05,
// 			duration: 1.5,
// 			repeat: -1,
// 			yoyo: true,
// 			ease: "sine.inOut",
// 			transformOrigin: "bottom center",
// 			stagger: {
// 				each: 0.1,
// 				from: "center"
// 			}
// 		});
// 	});

// 	// Card handling
// 	const cards = document.querySelectorAll('.card-3d');
// 	cards.forEach(card => {
// 		card.addEventListener('click', () => {
// 			card.classList.toggle('open');
// 			updateAriaExpanded(card);
// 		});

// 		card.addEventListener('keydown', (event) => {
// 			if (event.key === 'Enter' || event.key === ' ') {
// 				card.classList.toggle('open');
// 				updateAriaExpanded(card);
// 			}
// 		});
// 	});

// 	function updateAriaExpanded(card) {
// 		const isOpen = card.classList.contains('open');
// 		card.setAttribute('aria-expanded', isOpen);
// 	}
// });