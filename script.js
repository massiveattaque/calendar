window.addEventListener("DOMContentLoaded", () => {
	const c = new Clock30(".clock"); // Instancia o relógio ao selecionar o elemento com a classe 'clock'
});

class Clock30 {
	date = [];
	time = [];

	constructor(el) {
		this.el = document.querySelector(el);
		this.init();
	}

	init() {
		this.dateUpdate(); // Atualiza a data ao iniciar
		this.timeUpdate(); // Atualiza o tempo ao iniciar
	}

	// Método para obter a data atual como objeto
	get dateAsObject() {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return { day, month, year };
	}

	// Método para obter o tempo atual como objeto
	get timeAsObject() {
		const date = new Date();
		const h = date.getHours();
		const m = date.getMinutes();
		return {h, m};
	}

	// Função de atualização de data e tempo
	dateUpdate() {
		const flyInClass = "clock__word--fade-fly-in";
		const dateWords = this.dateInWords.split(" ");
		const timeWords = this.timeInWords.split(" ");
		
		// Seleciona as palavras do DOM
		const dateWordEls = Array.from(this.el.querySelectorAll(".clock__word"));

		// Atualiza a data no DOM
		for (let i = 0; i < dateWordEls.length; ++i) {
			const wordEl = dateWordEls[i];
			wordEl.innerText = dateWords[i] || "";
			if (dateWords[i] !== this.date[i]) wordEl.classList.add(flyInClass);
			else wordEl.classList.remove(flyInClass);
		}

		// Atualiza o tempo no DOM
		for (let i = 0; i < timeWords.length; ++i) {
			const wordEl = dateWordEls[i];
			wordEl.innerText = timeWords[i] || "";
			if (timeWords[i] !== this.time[i]) wordEl.classList.add(flyInClass);
			else wordEl.classList.remove(flyInClass);
		}

		// Atualiza data e tempo
		this.date = dateWords;
		this.time = timeWords;

		clearTimeout(this.dateUpdateLoop);
		this.dateUpdateLoop = setTimeout(this.dateUpdate.bind(this), 1e3); // Atualiza a cada segundo
	}

	get dateInWords() {
		// Gera a data por extenso
		// Mesma lógica do primeiro código
	}

	get timeInWords() {
		// Gera o tempo por extenso
		// Mesma lógica do segundo código
	}
}
