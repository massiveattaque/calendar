// O evento 'DOMContentLoaded' garante que o JavaScript só será executado após o carregamento do DOM
window.addEventListener("DOMContentLoaded", () => {
	const c = new Clock30(".clock"); // Instancia o relógio ao selecionar o elemento com a classe 'clock'
});

class Clock30 {
	date = [];

	constructor(el) {
		this.el = document.querySelector(el);
		this.init();
	}

	init() {
		this.dateUpdate(); // Atualiza a data ao iniciar
	}

	// Método que retorna a data atual como objeto (dia, mês e ano)
	get dateAsObject() {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return { day, month, year };
	}

	// Converte a data para palavras
	get dateInWords() {
		const { day, month, year } = this.dateAsObject;

		// Dicionários de números e meses por extenso
		const numbers = [
			"", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze",
			"treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove", "vinte", "vinte e um",
			"vinte e dois", "vinte e três", "vinte e quatro", "vinte e cinco", "vinte e seis", "vinte e sete",
			"vinte e oito", "vinte e nove", "trinta", "trinta e um"
		];

		const months = [
			"", "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro",
			"outubro", "novembro", "dezembro"
		];

		// Constrói a data por extenso
		const dayWord = numbers[day];
		const monthWord = months[month];
		const yearWord = this.yearInWords(year);

		return `Hoje é dia ${dayWord} de ${monthWord} de ${yearWord}`;
	}

	// Função para converter o ano em palavras
	yearInWords(year) {
		const yearStr = year.toString();
		const firstPart = numbers[parseInt(yearStr.substring(0, 2))]; // Primeiro milhar (dois mil)
		const secondPart = numbers[parseInt(yearStr.substring(2))]; // Últimos dois dígitos (quatro)

		return `dois mil e ${secondPart}`;
	}

	// Atualiza a data exibida no relógio
	dateUpdate() {
		const flyInClass = "clock__word--fade-fly-in";
		const dateWords = this.dateInWords.split(" ");

		const dateWordEls = Array.from(this.el.querySelectorAll(".clock__word"));

		for (let i = 0; i < dateWordEls.length; ++i) {
			const wordEl = dateWordEls[i];
			wordEl.innerText = dateWords[i] || "";
			if (dateWords[i] !== this.date[i]) wordEl.classList.add(flyInClass);
			else wordEl.classList.remove(flyInClass);
		}

		this.date = dateWords;
		clearTimeout(this.dateUpdateLoop);
		this.dateUpdateLoop = setTimeout(this.dateUpdate.bind(this), 1e3 * 60 * 60); // Atualiza a data uma vez por dia
	}
}
