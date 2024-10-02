// Evento 'DOMContentLoaded' garante que o JavaScript só será executado após o carregamento do DOM
window.addEventListener("DOMContentLoaded", () => {
	const calendar = new Calendar(".clock"); // Instancia o calendário ao selecionar o elemento com a classe 'clock'
  });
  
  class Calendar {
	// Inicializa um array vazio para armazenar a data
	date = [];
  
	constructor(el) {
	  this.el = document.querySelector(el); // Seleciona o elemento do DOM baseado no seletor passado
	  this.init(); // Chama o método inicializador
	}
  
	init() {
	  this.dateUpdate(); // Atualiza a data ao iniciar
	}
  
	// Método que retorna a data atual como objeto (dia, mês e ano)
	get dateAsObject() {
	  const date = new Date();
	  const day = date.getDate();
	  const month = date.getMonth(); // 0 = Janeiro
	  const year = date.getFullYear();
	  return { day, month, year };
	}
  
	// Converte a data em palavras
	get dateInWords() {
	  const { day, month, year } = this.dateAsObject;
  
	  // Dicionário de dias e meses em palavras
	  const days = {
		1: "primeiro", 2: "dois", 3: "três", 4: "quatro", 5: "cinco", 6: "seis",
		7: "sete", 8: "oito", 9: "nove", 10: "dez", 11: "onze", 12: "doze",
		13: "treze", 14: "quatorze", 15: "quinze", 16: "dezesseis", 17: "dezessete",
		18: "dezoito", 19: "dezenove", 20: "vinte", 21: "vinte e um",
		22: "vinte e dois", 23: "vinte e três", 24: "vinte e quatro", 25: "vinte e cinco",
		26: "vinte e seis", 27: "vinte e sete", 28: "vinte e oito", 29: "vinte e nove",
		30: "trinta", 31: "trinta e um"
	  };
  
	  const months = [
		"janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
		"agosto", "setembro", "outubro", "novembro", "dezembro"
	  ];
  
	  // Converte o ano em palavras
	  const yearInWords = `dois mil e ${year % 100 === 0 ? "cem" : this.convertYearToWords(year % 100)}`;
  
	  return `Hoje é dia ${days[day]} de ${months[month]} de ${yearInWords}`;
	}
  
	// Converte o ano em palavras
	convertYearToWords(year) {
	  const numbers = {
		1: "um", 2: "dois", 3: "três", 4: "quatro", 5: "cinco", 6: "seis",
		7: "sete", 8: "oito", 9: "nove", 10: "dez", 11: "onze", 12: "doze",
		13: "treze", 14: "quatorze", 15: "quinze", 16: "dezesseis", 17: "dezessete",
		18: "dezoito", 19: "dezenove", 20: "vinte"
	  };
  
	  if (year <= 20) return numbers[year];
	  if (year > 20 && year < 30) return "vinte e " + numbers[year - 20];
	  return "";
	}
  
	// Atualiza a data exibida
	dateUpdate() {
	  const flyInClass = "clock__word--fade-fly-in"; // Classe de animação para as palavras
	  const date = this.dateInWords.split(" "); // Divide a data em palavras
  
	  const dateWordEls = Array.from(this.el.querySelectorAll(".clock__word")); // Seleciona as palavras
  
	  // Atualiza cada palavra
	  for (let i = 0; i < dateWordEls.length; ++i) {
		const wordEl = dateWordEls[i];
		wordEl.innerText = date[i] || ""; // Atualiza o texto
		if (date[i] !== this.date[i]) wordEl.classList.add(flyInClass); // Adiciona animação
		else wordEl.classList.remove(flyInClass); // Remove animação se não houver alteração
	  }
  
	  this.date = date; // Armazena a data atual
	  clearTimeout(this.dateUpdateLoop); // Limpa qualquer atualização anterior
	  this.dateUpdateLoop = setTimeout(this.dateUpdate.bind(this), 1e4); // Atualiza a data a cada 10 segundos
	}
  }
  