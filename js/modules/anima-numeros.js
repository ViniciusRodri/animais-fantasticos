export default class AnimaNumeros { 
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget)
    this.observerClass = observerClass;

    // bindo o this do objeto ao callback da mutação
    this.handleMutation = this.handleMutation.bind(this);
  }

  // recebe um elemento do dom, com numero em seu texto. Incremente a partir de 0até o numero final.
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // Ativa incrementar número para cada número selecionado no dom.
  animaNumeros() {
    this.numeros.forEach(numero => this.constructor.incrementarNumero(numero))
  }

  // função ocorre quando a mutação ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // adiciona o MutationObserver para verificar quando a classe atio é adicionado no elemento Target
  addMutationObserve () {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserve();
    }
    return this;
  }
  
}
