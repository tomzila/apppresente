# Presente virtual — guia rápido

## Estrutura
```
index.html   → as 6 telas (estrutura)
style.css    → visual (cores, tipografia, animações)
script.js    → toda a lógica (senha, navegação, mensagens, contador, galeria, partículas)
assets/fotos/  → coloque aqui as fotos do casal
assets/audio/  → coloque aqui o mp3 da música
```

## Como personalizar (tudo no topo do `script.js`)

- **Senha**: variável `SENHA_CORRETA`.
- **Mensagens progressivas**: array `MENSAGENS` — adicione, remova ou reordene livremente.
- **Início do namoro**: `INICIO_NAMORO` — formato `new Date(ano, mês-1, dia, hora, minuto)`. Atenção: mês começa em 0 (janeiro = 0).
- **Fotos**: array `FOTOS` no topo do `script.js`. Veja a seção "Como adicionar as fotos" logo abaixo, com o passo a passo completo.
- **Música**: salve o arquivo mp3 (que você já possua legalmente) como `assets/audio/eu-te-devoro.mp3`, ou troque o `src` da tag `<audio>` no `index.html` pelo nome do seu arquivo. Não incluí o áudio em si — direitos autorais não permitem eu baixar/gerar isso por você.
- **Quiz "adivinhe o presente"**: array `QUIZ_OPCOES`. Cada opção tem um `texto` e `correta: true/false` — só uma pode ser `true`. Pode mudar os textos, a ordem, ou até adicionar/remover opções (o site atualiza as letras A, B, C... sozinho). A imagem de dica é o arquivo `assets/fotos/dica-presente.jpg` — troque por uma foto sua (mesma lógica da seção "Como adicionar as fotos", só que essa é só uma imagem, não um array).

## Corações por tela

No `index.html`, cada `<section class="screen" ...>` tem um atributo `data-particles`. Exemplos:
```html
data-particles="hearts"   → mostra os corações flutuando nessa tela
data-particles=""         → nenhuma partícula nessa tela
```
Edite esse atributo em cada tela pra ligar/desligar como quiser.

## Adicionando/reordenando telas

Cada tela é um bloco `<section class="screen" id="...">` no `index.html`. Pra adicionar uma nova:
1. Copie um bloco existente, mude o `id`.
2. Se quiser avançar por botão, adicione `data-next` no botão dentro dela.
3. O JS detecta todas as `.screen` automaticamente pela ordem em que aparecem no HTML — não precisa mexer no script.js pra isso.

## Como adicionar as fotos

**1. Prepare os arquivos no seu computador**
- Formato: `.jpg` (ou `.jpeg`) é o mais indicado — arquivo menor, carrega mais rápido. `.png` também funciona, mas o arquivo fica bem mais pesado (só use se precisar de fundo transparente, o que não é o caso aqui).
- Tamanho: fotos de celular já vêm grandes demais (4000px+ de largura). Se puder, redimensione pra no máximo **1200px** no lado maior antes de usar — o site vai carregar bem mais rápido pra ela. Pode redimensionar em qualquer app tipo Preview (Mac), Paint (Windows), ou sites como [squoosh.app](https://squoosh.app) (gratuito, arrasta a foto e já comprime).
- Nome do arquivo: sem espaço, sem acento, sem caractere especial. Use algo tipo `foto1.jpg`, `foto2.jpg`, `praia.jpg`, `aniversario-2024.jpg`.

**2. Coloque os arquivos na pasta certa**
Dentro da pasta do projeto, existe `assets/fotos/` — arraste as fotos pra lá (pelo explorador de arquivos do Windows/Mac, ou arrastando direto pro painel de arquivos do VSCode).

**3. Liste as fotos no código**
Abre o `script.js`, lá no topo tem:
```js
const FOTOS = [
  // "assets/fotos/foto1.jpg",
  // "assets/fotos/foto2.jpg",
];
```
Tire o `//` do início de cada linha que já existe (isso "descomenta" a linha) e ajuste o nome do arquivo pro nome real que você usou. Pra cada foto nova, adiciona uma linha no mesmo formato, sempre terminando com vírgula. Exemplo com 4 fotos:
```js
const FOTOS = [
  "assets/fotos/foto1.jpg",
  "assets/fotos/foto2.jpg",
  "assets/fotos/praia.jpg",
  "assets/fotos/aniversario-2024.jpg",
];
```

**4. Salve, teste local e suba**
Salva o `script.js`, abre o `index.html` no navegador (ou dá refresh se já estava aberto) pra conferir se as fotos aparecem certinho na galeria. Depois:
```bash
git add .
git commit -m "adiciona fotos do casal"
git push
```



Abra o `index.html` direto no navegador (duplo clique) — já funciona, é tudo estático.

## Como hospedar (pra gerar o link pra ela)

**GitHub Pages (grátis):**
1. Crie um repositório no GitHub e suba esses arquivos.
2. Vá em Settings → Pages → Source → escolha a branch `main` e a pasta raiz.
3. O link fica algo como `https://seuusuario.github.io/nome-do-repo/`.

**Vercel/Netlify (grátis, mais simples):**
1. Crie conta, arraste a pasta do projeto pra dashboard (Netlify tem drag-and-drop direto).
2. Recebe um link pronto na hora.

## Sobre acessibilidade
- As animações de partículas respeitam `prefers-reduced-motion` (se a pessoa tiver essa preferência ativada no sistema, elas somem).
- Botões e input têm foco visível pra navegação por teclado.

---

# Guia de personalização visual

Tudo que é visual mora no `style.css`. Você não precisa entender CSS a fundo pra mexer aqui — é achar a linha certa e trocar o valor.

## 1. Cores

Lá no **topo do `style.css`**, primeiras linhas, tem isso:

```css
:root {
  --wine-950: #1a0a15;   /* fundo mais escuro (cantos) */
  --wine-900: #33122a;   /* fundo principal (vinho/roxo) */
  --wine-800: #4a1936;   /* variação de fundo */
  --leaf-900: #1c3324;   /* verde escuro (moldura) */
  --leaf-700: #2f9c56;   /* verde vivo (moldura) */
  --gold: #eab04e;       /* dourado — botões, detalhes */
  --cream: #f9ecda;      /* cor do texto principal */
  --rose: #f2668a;       /* rosa — destaques, corações */
}
```

Essas são **variáveis**: o nome depois de `--` é usado em todo o resto do arquivo (procure por `var(--gold)`, por exemplo). Ou seja, **muda a cor uma vez aqui em cima e ela muda no site inteiro**, em vez de precisar caçar cada lugar que usa aquela cor.

Pra trocar uma cor: troca só o valor hexadecimal (o `#xxxxxx`) por outro. Sugestão de ferramenta pra escolher/gerar códigos de cor: [coolors.co](https://coolors.co) ou o seletor de cor do Google (busque "color picker" no Google).

> Atenção: em alguns lugares específicos do CSS (bordas de card, sombra) usei a mesma cor mas no formato `rgba(242,102,138,0.4)` em vez de `var(--rose)`, porque precisava controlar a transparência. Se quiser trocar essas também, procure por `rgba(` no arquivo e ajusta os três primeiros números (que são a versão em RGB da cor).

## 2. Fontes

As fontes são carregadas lá no **`index.html`**, dentro do `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

E usadas no `style.css` (bem no topo, dentro do `:root`):

```css
--font-display: 'Cormorant Garamond', serif;   /* títulos elegantes */
--font-body: 'Jost', sans-serif;               /* textos, botões, UI */
```

**Pra trocar uma fonte:**
1. Vá em [fonts.google.com](https://fonts.google.com) — é grátis e tem milhares de opções.
2. Escolha uma fonte, clique nela, e clique em **"Get font"** → **"Get embed code"**.
3. Ele te dá um link parecido com o que já está no seu `index.html` — copia e substitui a linha `<link href="https://fonts.googleapis.com/css2?family=...">` pela nova.
4. Troca o nome da fonte dentro das aspas em `--font-display` ou `--font-body` no `style.css` pelo nome exato que aparece no Google Fonts (tem que bater certinho, incluindo maiúsculas).

Fontes parecidas com o estilo atual (elegante/romântico), se quiser trocar por algo parecido: *Playfair Display*, *Marcellus*, *EB Garamond* (pro `--font-display`); *Poppins*, *Manrope*, *Nunito Sans* (pro `--font-body`).

## 3. Fundo (background)

O fundo geral do site está no `style.css`, dentro de `html, body`:

```css
background:
  radial-gradient(ellipse at 15% 0%, rgba(242,102,138,0.16), transparent 55%),
  radial-gradient(ellipse at 85% 100%, rgba(47,156,86,0.12), transparent 55%),
  radial-gradient(ellipse at top, var(--wine-900), var(--wine-950) 70%);
```

São 3 camadas de gradiente sobrepostas (os brilhos coloridos nos cantos + o fundo base). Pra deixar mais simples, pode apagar as duas primeiras linhas e deixar só a última. Pra mudar a cor de algum brilho, troca o `rgba(...)` daquela linha.

O fundo do **card do enigma** (com os corações espalhados) está na regra `.gate-card` e `.gate-card::before` — procure por esses nomes no arquivo. Lá dentro, `background-position` controla onde cada coração fica (em % da largura/altura do card) e `background-size` controla o tamanho de cada um.

## 4. Efeitos (animações, corações flutuando)

- **Velocidade dos corações flutuando (fundo geral)**: no `script.js`, procure por `const duration = 16 + Math.random() * 10;` — esse `16` é a duração mínima em segundos e o `10` é a variação extra aleatória. Aumenta os números pra ficar mais lento, diminui pra ficar mais rápido.
- **Velocidade dos corações do card do enigma**: no `style.css`, procure pelas 6 linhas `.card-heart.h1` até `.card-heart.h6`. Cada uma tem um `animation-duration` (em segundos) — esse é o tempo que o coração leva pra fazer um ciclo completo de subir e descer. **Número menor = mais rápido. Número maior = mais lento.** Deixei todos entre 2.6s e 3.7s agora (mais animado que antes). Pra ajustar de novo, é só mudar esses valores.
- **Quantidade de corações na tela**: procure por `setInterval(spawnParticle, 900)` — esse `900` é o intervalo em milissegundos entre um coração e outro. Número menor = mais corações; maior = menos.
- **Animação de virar página**: no `style.css`, procure por `@keyframes pageOut` e `@keyframes pageIn` — controlam o efeito de transição entre telas.
- **Velocidade da galeria de fotos**: no `style.css`, procure por `.gallery-track` e o `animation: galleryScroll 26s linear infinite;` — o `26s` é o tempo pra faixa completar uma volta inteira. Número menor = mais rápido. Se colocar muitas fotos, pode valer aumentar esse tempo pra não ficar corrido demais. Passar o mouse por cima da galeria pausa a rolagem automaticamente.

## 5. Moldura do card (borda)

A borda em gradiente do card do enigma está em `.gate-card`, na linha:

```css
background:
  linear-gradient(rgba(26,10,21,0.86), rgba(26,10,21,0.86)) padding-box,
  linear-gradient(135deg, var(--rose), var(--gold) 55%, var(--leaf-700)) border-box;
```

A segunda linha (`linear-gradient(135deg, ...)`) é a moldura — troca as cores ali (pode usar as variáveis `var(--rose)`, `var(--gold)`, etc, ou hexadecimais direto) ou muda o ângulo (`135deg`) pra girar a direção do gradiente. O `border-radius: 22px;` logo abaixo controla o quão arredondado é o canto do card — número maior = mais arredondado.