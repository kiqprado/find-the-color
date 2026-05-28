import { Link } from "react-router-dom"

export function About() {
  return(
    <div
      className="h-svh flex"
    >
      <div className="m-auto w-[80%]">
        <p className="text-justify">
        Bem-vindo ao Guess the Color (Advinhe a Cor), um jogo educativo, dinâmico e visualmente estimulante feito sob medida para crianças em fase de desenvolvimento! Nosso objetivo é transformar o aprendizado sobre o mundo e a geografia em uma grande brincadeira inspirada no clima contagiante da Copa do Mundo.

Focado nos países das Américas que marcam presença no maior espetáculo de futebol do planeta, o desafio é simples e intuitivo: a criança visualiza o nome do país (ou sua bandeira) e precisa adivinhar se uma cor específica faz parte daquela bandeira oficial. Com apenas dois botões como opção — um com uma cor correta e outro com uma cor intrusa —, a gameplay é direta, rápida e livre de frustrações.
      </p>

      <h3>🧠 Como essa atividade auxilia no desenvolvimento infantil?</h3>

      <ul className="flex flex-col gap-2">
        <span>Muito além da diversão, cada rodada estimula habilidades cognitivas essenciais para os pequenos:</span>
        <li>Reconhecimento Visual e Percepção de Cores: Ajuda a criança a identificar, diferenciar e categorizar tonalidades e saturações de forma ativa.</li>
        <li>Associação Lógica e Memória: Estimula o cérebro a conectar o nome de um país à sua identidade visual e seus símbolos nacionais, fortalecendo a memória de longo prazo.</li>
        <li>Tomada de Decisão Rápida: O sistema de escolha binária (Sim ou Não / Cor Certa ou Incorreta) exercita a autonomia e o raciocínio rápido sem sobrecarregar a atenção da criança.</li>
        <li>Introdução à Geopolítica e Cultura: Utiliza o engajamento natural do futebol e da Copa do Mundo para despertar a curiosidade sobre a geografia das Américas, estimulando o respeito e o interesse por outras culturas desde cedo.</li>
        <li>Coordenação Motora Fina: A interação com botões animados e responsivos ajuda a refinar o controle do clique e do toque em interfaces digitais.</li>
      </ul>

      <Link to='/'>Início</Link>

      </div>
    </div>
  )
}