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
  
	  // Converte o ano em palavras (dois mil e 4)
	  const yearInWords = this.convertYearToWords(year);
  
	  return `Hoje é dia ${days[day]} de ${months[month]} de ${yearInWords}`;
	}
  
	// Função para converter o ano em palavras
	convertYearToWords(year) {
	  const thousands = Math.floor(year / 1000);
	  const hundreds = Math.floor((year % 1000) / 100);
	  const tens = Math.floor((year % 100) / 10);
	  const units = year % 10;
  
	  const words = [];
  
	  if (thousands === 2) words.push("dois mil");
	  // Para o ano 2024, adiciona "vinte e quatro" ao invés de "quatro"
	  if (hundreds === 0 && tens === 0 && units === 0) return "dois mil"; // para anos exatos como 2000
	  if (hundreds === 0 && tens === 0) words.push(units === 1 ? "um" : units === 2 ? "dois" : units === 3 ? "três" : units === 4 ? "quatro" : units === 5 ? "cinco" : units === 6 ? "seis" : units === 7 ? "sete" : units === 8 ? "oito" : units === 9 ? "nove" : "");
  
	  if (tens === 2) words.push("vinte");
	  else if (tens === 3) words.push("trinta");
  
	  if (tens > 1) {
		words.push(units === 0 ? "e" : "e " + (units === 1 ? "um" : units === 2 ? "dois" : units === 3 ? "três" : units === 4 ? "quatro" : units === 5 ? "cinco" : units === 6 ? "seis" : units === 7 ? "sete" : units === 8 ? "oito" : units === 9 ? "nove" : ""));
	  }
  
	  return words.join(" ");
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
  