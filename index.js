const listaDePalavras = ["abacate", "abelha", "abobora", "abrigo", "absurdo", "academia", "acidente", "adega", "agenda",
                        "algodao", "alicate", "almofada", "amizade", "anagrama", "anelado", "animais", "antena", "apetite",
                        "apito", "areia", "armario", "arrozal", "avenida", "baleia", "banco", "barriga", "batata", "bebida",
                        "bichano", "bilhete", "boneca", "borracha", "botina", "brinco", "broto", "bruxa", "cabide",
                        "cachorro", "cadeado", "caixa", "camada", "camisa", "caneta", "canela", "canudo",
                        "capacho", "carreta", "cartoes", "carvao", "casaco", "casinha", "castelo", "celular", "cerveja",
                        "chave", "chicote", "chuveiro", "circulo", "clarao", "colher", "colina", "colmeia", "coluna", "comida",
                        "concha", "cordao", "corredor", "coruja", "costela", "crianca", "cristal", "cruzado", "cubismo",
                        "delicia", "dentista", "desenho", "deserto", "dinheiro", "disparo", "drama", "edificio", "embaixo",
                        "embargo", "emprego", "enxame", "escada", "escova", "espelho", "espuma", "estilo", "estrela", "estudo",
                        "faisca", "falcao", "familia", "fantasia", "fardas", "farmacia", "fatores", "feitio", "feijao", "feriado",
                        "ferida", "figura", "flores", "formiga", "fortuna", "fralda", "franque", "frasco", "fronte", "frutas",
                        "galaxia", "galinha", "garrafa", "garfo", "gelados", "girafa", "gramado", "grandes", "grito",
                        "guardas", "helice", "horizonte", "hospede", "igrejas", "impressa", "incenso", "insetos", "irmaos",
                        "janela", "jardim", "joias", "juventude", "lagosta", "lareira", "ladroes", "leite", "leque",
                        "livro", "lixeira", "lojinha", "lousa", "luzes", "maquinas", "madruga", "maletas", "mamifero",
                        "mangue", "manta", "marinho", "martelo", "matilha", "medalha", "memoria", "mentira",
                        "mercado", "mesadas", "milagre", "moeda", "montado", "morango", "motor", "museu", "nascente", "navio",
                        "neblina", "noivado", "numero", "nuvem", "objetos", "ocasiao", "oficina", "olhares", "ombro", "orelha",
                        "pacote", "palavra", "panela", "papelao", "parede", "parque", "patins", "pedido", "pedra", "pelagem",
                        "pincel", "pipoca", "placa", "planeta", "planta", "poemas", "pombais", "portao", "prancha", "prazer",
                        "prisao", "problema", "profeta", "prova", "pulmoes", "quadros", "quartel", "queijo", "ramalhe",
                        "raquete", "recanto", "relogio", "resenha", "retorno", "revista", "rodovia", "roleta", "sacola", "safira",
                        "salada", "sapatos", "saudade", "selvagem", "sementes", "senhora", "seringa", "silencio", "sinais", "sombra",
                        "sonhos", "soprano", "tartar", "tapete", "telefone", "tempero", "terreno", "tesoura", "tijolos", "torneio",
                        "tortas", "traves", "tromba", "truque", "turismo", "uniao", "universo", "urgente", "valores", "vasilha",
                        "veiculo", "velhice", "ventana", "vermelho", "versos", "viagem", "vidraria", "vinhedo", "visao", "vitoria",
                        "voador", "vontade", "xicara", "ziper"];

const listaDeCores = ["#F43D3D", "#F45A3D", "#F4783D", "#F4963D", "#F4A83D", "#F4BD3D",
                      "#F4D23D", "#99c759ff", "#29a537ff", "#3DD2F4", "#3D90F4", "#3D52F4",
                      "#853DF4", "#C03DF4", "#F43DF4", "#F43D9F"]

const containersLetras = document.querySelectorAll(".letra-flex-container"); // Armazena cada um dos containers de letras
const containerPalavra = document.querySelector("#palavra-flex-container");

const buttonsLetras = document.querySelectorAll("#alfabeto-flex-container > button"); // Armazena os botões das letras
const buttonContinuar = document.querySelector("#button-continuar");

const textChances = document.querySelector("h2");

var palavraSorteada = ""
var acertosConsecutivos = 0
var numChances = 6;
var letrasDescobertas = 0;
var cor = ""

const gameScreen = document.querySelector("#in-play-flex-container");
gameScreen.remove(); // Armazena a área de jogo antes de removê-la

function sortearPalavra(lista) {
    // Ações de reset para uma próxima chamada
    numChances = 6;
    textChances.textContent = numChances + " chances";
    letrasDescobertas = 0;
    buttonContinuar.classList.toggle("invisible");
    buttonsLetras.forEach(button => {
        button.disabled = false;
        button.classList.remove("invisible");
    });
    containersLetras.forEach(container => {
        container.querySelector(".letra").textContent = ""
        container.remove()
    });

    // Coloca uma cor aleatória nos elementos coloridos
    cor = listaDeCores[Math.floor(Math.random() * listaDeCores.length)];
    document.querySelectorAll(".colorido").forEach(elemento => {
        elemento.style.backgroundColor = cor
    });

    // Ações de sorteio de palavra e setting dos containers que fazem o display
    let indexPalavra = Math.floor(Math.random() * lista.length);
    palavraSorteada = lista[indexPalavra].toUpperCase();
    lista.splice(indexPalavra, 1);
    // document.querySelector("#A").textContent = palavraSorteada; // Para DEBUG (a palavra sorteada aparece como texto do botão "A")
    palavraSorteada.split('').forEach((letra, i) => {
        containerPalavra.appendChild(containersLetras[i]);
        containersLetras[i].querySelector(".letra").textContent = letra;
        containersLetras[i].querySelector(".letra").classList.add("invisible");
    });
}

function iniciarJogo() {
    document.querySelector("#inicio-flex-container").remove();
    document.body.appendChild(gameScreen);
    gameScreen.classList.toggle("invisible"); // Começa invisible, ou seja, aqui fica visível
    sortearPalavra(listaDePalavras);
};

function checarLetra(button) {
    button.classList.toggle("invisible");
    let checksCorretos = 0;
    containersLetras.forEach(container => {
        let letraChecada = container.querySelector(".letra");
        if (letraChecada.textContent.toUpperCase() == button.id.toUpperCase()) {
            letraChecada.classList.toggle("invisible");
            letrasDescobertas++; // Saber quantas letras já foram descobertas
            checksCorretos++; // Saber se a letra existia dentro da palavra
        }
    });
    if (checksCorretos == 0) {
        numChances--;
        if (numChances == 0) {
            if (acertosConsecutivos == 1) {
                textChances.innerHTML = "Suas chances acabaram, a palavra era " + palavraSorteada.toUpperCase() +
                                            "<br/>Você obteve " + acertosConsecutivos + " acerto consecutivo";
            }
            else {
                textChances.innerHTML = "Suas chances acabaram, a palavra era " + palavraSorteada.toUpperCase() +
                                            "<br/>Você obteve " + acertosConsecutivos + " acertos consecutivos";
            }
            acertosConsecutivos = 0 // Reseta para a próxima "run"
            fimDeJogo()
        }
        else {
            if (numChances == 1) {
                textChances.innerHTML = numChances + " chance";
            }
            else {
                textChances.innerHTML = numChances + " chances";
            }
        }
    }
    else {
        if (letrasDescobertas == palavraSorteada.length) {
            textChances.innerHTML = "Você descobriu a palavra!";
            acertosConsecutivos++;
            fimDeJogo()
        }
    }
};

function fimDeJogo() {
    buttonsLetras.forEach(button => button.disabled = true);
    buttonContinuar.classList.toggle("invisible");
}

// Atribuição de funções para os botões:

buttonsLetras.forEach(button => {
    button.onclick = function() {
        checarLetra(button);
    };
});

buttonContinuar.onclick = () => sortearPalavra(listaDePalavras);

document.querySelector("#button-jogar").onclick = () => iniciarJogo();
