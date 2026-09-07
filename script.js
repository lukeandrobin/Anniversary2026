// Put 36 photos in /photos/: month01-1.jpg ... month12-3.jpg
const months = [
	["October", "🤵‍♂️👰‍♀️💍", ""],
	["November", "🏠📦📦📦📦📦📦📦📦", ""],
	["December", "🎅🌲", ""],
	["January", "🫰🧧🥩🏬🚽", ""],
	["February", "💘🪉", ""],
	["March", "🍝⛪🛶🤌", ""],
	["April", "🐰🐥", ""],
	["May", "🏇💵🛋️", ""],
	["June", "", ""],
	["July", "🛳️🐻🦦🚁🐕🛷", ""],
	["August", "🛥️🎉🥳🏄‍♀️🌊", ""],
	["September", "👋🧎‍➡️🚶‍♀️‍➡️", ""]
];
const timeline = document.querySelector("#timeline"),
	nav = document.querySelector("#monthNav");
months.forEach((m, i) => {
	const s = document.createElement("section");
	s.className = "month";
	s.id = `month-${i+1}`;
	s.innerHTML = `<div class="month-marker">${String(i+1).padStart(2,"0")}</div><div class="month-title"><h2>${m[0]}</h2> <h2>${m[1]}</h2><p>${m[2]}</p></div><div class="photos"></div><p class="hint">👆</p>`;
	const grid = s.querySelector(".photos");
	for (let j = 1; j <= 3; j++) {
		const card = document.createElement("article");
		card.className = "photo-card";
		card.style.setProperty("--r", [-2, 1.5, -1][j - 1] + "deg");
		const c = document.createElement("canvas");
		c.width = 600;
		c.height = 600;
		const ctx = c.getContext("2d");
		const img = new Image();
		img.onload = () => drawCover(ctx, img, 600, 600);
		img.onerror = () => placeholder(ctx, 600, 600);
		img.src = `photos/month${String(i+1).padStart(2,"0")}-${j}.jpg`;
		card.appendChild(c);
		const cap = document.createElement("div");
		cap.className = "caption";
		cap.textContent = ["", "", ""][j - 1];
		card.appendChild(cap);
		c.onclick = e => {
			const r = c.getBoundingClientRect();
			jelly(c, img, (e.clientX - r.left) * 600 / r.width, (e.clientY - r.top) * 600 / r.height)
		};
		grid.appendChild(card);
	}
	timeline.appendChild(s);
	const dot = document.createElement("a");
	dot.href = `#month-${i+1}`;
	dot.dataset.month = i + 1;
	nav.appendChild(dot);
});

function drawCover(ctx, img, w, h) {
	const sc = Math.max(w / img.naturalWidth, h / img.naturalHeight),
		iw = img.naturalWidth * sc,
		ih = img.naturalHeight * sc;
	ctx.clearRect(0, 0, w, h);
	ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih)
}

function placeholder(ctx, w, h) {
	ctx.fillStyle = "#ffe65c";
	ctx.fillRect(0, 0, w, h);
	ctx.font = "bold 60px sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "#32162b";
	ctx.fillText("📸", w / 2, h / 2)
}

function jelly(canvas, img, cx, cy) {
	const ctx = canvas.getContext("2d"),
		w = canvas.width,
		h = canvas.height,
		base = document.createElement("canvas");
	base.width = w;
	base.height = h;
	const b = base.getContext("2d");
	drawCover(b, img, w, h);
	const src = b.getImageData(0, 0, w, h),
		out = ctx.createImageData(w, h),
		start = performance.now(),
		duration = 1100,
		maxR = Math.sqrt(w * w + h * h) * .72;

	function frame(now) {
		const t = Math.min(1, (now - start) / duration),
			radius = t * maxR,
			d = out.data,
			s = src.data;
		for (let y = 0; y < h; y++)
			for (let x = 0; x < w; x++) {
				let dx = x - cx,
					dy = y - cy,
					dist = Math.hypot(dx, dy),
					env = Math.exp(-((dist - radius) ** 2) / (2 * 70 * 70)),
					strength = (1 - t) * 30 * env,
					ang = Math.atan2(dy, dx),
					sx = Math.max(0, Math.min(w - 1, Math.round(x - Math.cos(ang) * strength))),
					sy = Math.max(0, Math.min(h - 1, Math.round(y - Math.sin(ang) * strength))),
					si = (sy * w + sx) * 4,
					oi = (y * w + x) * 4;
				d[oi] = s[si];
				d[oi + 1] = s[si + 1];
				d[oi + 2] = s[si + 2];
				d[oi + 3] = s[si + 3]
			}
		ctx.putImageData(out, 0, 0);
		if (t < 1) requestAnimationFrame(frame);
		else drawCover(ctx, img, w, h)
	}
	requestAnimationFrame(frame);
	burst(canvas, cx, cy)
}

function burst(c, x, y) {
	const r = c.getBoundingClientRect(),
		em = ["💖", "💕", "✨", "🫠", "🎈", "🥰", "💍"];
	for (let i = 0; i < 14; i++) {
		const p = document.createElement("span");
		p.className = "float";
		p.textContent = em[Math.floor(Math.random() * em.length)];
		p.style.left = r.left + x / c.width * r.width + (Math.random() - .5) * 80 + "px";
		p.style.top = r.top + y / c.height * r.height + (Math.random() - .5) * 50 + "px";
		document.body.appendChild(p);
		setTimeout(() => p.remove(), 1900)
	}
}
const cursor = document.querySelector("#cursor");
let last = 0;
document.addEventListener("mousemove", e => {
	cursor.style.left = e.clientX + "px";
	cursor.style.top = e.clientY + "px";
	if (Date.now() - last > 60) {
		last = Date.now();
		const p = document.createElement("span");
		p.className = "particle";
		p.textContent = ["💖", "✨", "💕", "⭐", "🌈"][Math.floor(Math.random() * 5)];
		p.style.left = e.clientX + "px";
		p.style.top = e.clientY + "px";
		document.body.appendChild(p);
		setTimeout(() => p.remove(), 800)
	}
});
const sections = [...document.querySelectorAll(".month")],
	dots = [...document.querySelectorAll(".month-nav a")];
new IntersectionObserver(es => es.forEach(e => {
	if (e.isIntersecting) {
		let n = e.target.id.split("-")[1];
		dots.forEach(d => d.classList.toggle("active", d.dataset.month === n))
	}
}), {
	threshold: .35
}).observe;
sections.forEach(s => new IntersectionObserver(es => es.forEach(e => {
	if (e.isIntersecting) {
		let n = e.target.id.split("-")[1];
		dots.forEach(d => d.classList.toggle("active", d.dataset.month === n))
	}
}), {
	threshold: .35
}).observe(s));

function celebrate() {
	for (let i = 0; i < 60; i++) {
		const p = document.createElement("span");
		p.className = "float";
		p.textContent = ["🎉", "💖", "🎈", "✨", "💕", "🥳"][Math.floor(Math.random() * 6)];
		p.style.left = Math.random() * 100 + "vw";
		p.style.top = (Math.random() * 60 + 20) + "vh";
		document.body.appendChild(p);
		setTimeout(() => p.remove(), 2200)
	}
}
document.querySelector("#start").onclick = () => document.querySelector("#month-1").scrollIntoView();
document.querySelector("#again").onclick = celebrate;