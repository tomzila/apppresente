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
- **Vídeo final**: salve o arquivo de vídeo (formato `.mp4`, que costuma ser o mais compatível) como `assets/video/final.mp4`. Se quiser usar outro nome, troque o `src="assets/video/final.mp4"` no `index.html` (procure por `<video class="final-video"`). Vídeos pesam bastante — se o seu tiver mais de uns 30-50MB, considere comprimir antes (o [HandBrake](https://handbrake.fr) é gratuito e faz isso bem) pra não demorar muito pra carregar.

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

# Guia de cores — como mudar tudo que aparece na tela

Tudo que é cor mora no `style.css`. A imensa maioria é controlada por **variáveis** — nomes que começam com `--`, definidos uma vez no topo do arquivo e reaproveitados em todo o resto. Então, na maior parte das vezes, você muda a cor **uma única vez** lá em cima, e ela atualiza em todo o site sozinha.

## 1. As variáveis principais (onde 90% das cores vêm daqui)

Bem no **topo do `style.css`**, primeiras linhas:

```css
:root {
  --bg-1: #fdf1f6;       /* fundo — tom mais claro (bordas do gradiente) */
  --bg-2: #f9d7e7;       /* fundo — tom principal, rosa suave */
  --rose: #ec4899;       /* rosa vivo — bordas, botões, corações, detalhes */
  --rose-deep: #c2185b;  /* rosa escuro — usado em texto, pra garantir leitura */
  --gold: #b3792f;       /* dourado (rosé gold) — acento secundário */
  --text-main: #4a1030;  /* cor principal do texto */
  --leaf-700: #2f9c56;   /* verde — só aparece na resposta certa do quiz */
}
```

O que cada uma controla, na prática:

| Variável | Onde aparece |
|---|---|
| `--bg-1` / `--bg-2` | Fundo geral de todas as telas (gradiente claro) |
| `--rose` | Bordas dos cards, corações (fundo e do card), moldura, foco do teclado, opção errada do quiz |
| `--rose-deep` | Textos em rosa: "um enigma antes de entrar", a dica, a mensagem de erro da senha |
| `--gold` | Botões ("continuar", "abrir"), números do contador, pontinhos de navegação, ícone de música, letrinhas A/B/C/D do quiz |
| `--text-main` | Cor do texto principal (títulos, mensagens, parágrafos) |
| `--leaf-700` | Só a opção certa do quiz (verde = acertou) |

**Pra trocar:** troca só o valor hexadecimal (o `#xxxxxx`) por outro. Ferramentas pra escolher cores: [coolors.co](https://coolors.co) (gera paletas prontas) ou busque "color picker" no Google.

Como sua namorada gosta de rosa, deixei o site inteiro girando em torno do `--rose`/`--rose-deep` (rosa vivo e rosa escuro) com `--gold` como segundo tom (um "rosé gold", combina bem). Se quiser um rosa diferente (mais lilás, mais pêssego, mais vermelho...), troca só o `--rose` e o `--rose-deep` — o site inteiro acompanha.

## 2. Cores que NÃO estão nas variáveis (usam `rgba` direto)

Algumas bordas, sombras e fundos translúcidos precisam de controle de transparência, então usam `rgba(R,G,B,A)` direto em vez da variável — os três primeiros números são a cor (em RGB) e o último é a transparência (0 = invisível, 1 = opaco). Se quiser mudar essas também, é só trocar os 3 primeiros números. Pra te ajudar a achar cada uma no arquivo, aqui está o mapa (todas em `style.css`):

- `rgba(236,72,153, ...)` → é o `--rose` em formato RGB. Aparece no fundo/borda da dica da senha, brilho de canto do fundo geral, opção errada do quiz.
- `rgba(179,121,47, ...)` → é o `--gold` em RGB. Aparece nas bordas do contador, galeria, botão de música, setas de navegação, opções do quiz.
- `rgba(74,16,48, ...)` → é o `--text-main` em RGB. Aparece na borda do campo de senha, no fundo do popup do quiz, na sombra por trás dos cards.
- `rgba(194,24,91, ...)` → é o `--rose-deep` em RGB. Aparece nos pontinhos de navegação (inativos) e na sombra do card do enigma.
- `rgba(47,156,86, ...)` → é o `--leaf-700` (verde) em RGB. Só aparece na opção certa do quiz.
- `rgba(255,248,251, ...)` e `rgba(255,255,255, ...)` → são tons de branco/quase-branco, usados como fundo dos cards, inputs e botões translúcidos (pra ficarem "flutuando" sobre o fundo rosa).

Se você mudar `--rose` no topo do arquivo, essas versões em `rgba(236,72,153...)` **não mudam sozinhas** (são números fixos, não variáveis) — só editando manualmente cada uma. É mais trabalho, mas te dá controle fino sobre a transparência de cada elemento.

## 3. Cores "escondidas" fora do `:root` (SVG dos corações e fundo)

Duas coisas de cor não usam variável porque são desenhos (SVG) embutidos direto no código:

- **Coração que flutua no fundo**: no `script.js`, procure por `const HEART_SVG` — tem um `fill="#ec4899"` dentro do código do desenho. Troque esse hexadecimal.
- **Corações dentro do card do enigma**: no `style.css`, procure por `.card-heart` — tem dois desenhos parecidos, um com `fill='%23ec4899'` (rosa) e outro com `fill='%23b3792f'` (dourado) — repare que aqui o `#` vira `%23` (é assim que se escreve dentro de uma URL). Troque os hexadecimais do mesmo jeito, só lembrando de manter o `%23` no lugar do `#`.

## 4. Fundo (background)

O fundo geral do site está no `style.css`, dentro de `html, body`:

```css
background:
  radial-gradient(ellipse at 15% 0%, rgba(236,72,153,0.14), transparent 55%),
  radial-gradient(ellipse at 85% 100%, rgba(179,121,47,0.12), transparent 55%),
  radial-gradient(ellipse at top, var(--bg-2), var(--bg-1) 70%);
```

São 3 camadas: dois brilhos suaves nos cantos (rosa e dourado) por cima de um gradiente base claro (`--bg-2` no meio, `--bg-1` nas bordas). Pra deixar mais simples, pode apagar as duas primeiras linhas e deixar só a última. Pra deixar ainda mais claro, aumenta os valores de `--bg-1`/`--bg-2` (aproxima de `#ffffff`); pra deixar mais forte, escurece um pouco.

O fundo do **card do enigma** (com os corações flutuando por cima) está na regra `.gate-card` — o `background:` dele tem duas partes: a primeira (`rgba(255,248,251,0.88)`) é o preenchimento claro de dentro do card, e a segunda (`linear-gradient(135deg, var(--rose), var(--gold) 55%, var(--leaf-700))`) é a moldura colorida em volta — veja a seção 6.

## 5. Fontes

As fontes são carregadas no **`index.html`**, dentro do `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

E usadas no `style.css` (dentro do `:root`):

```css
--font-display: 'Cormorant Garamond', serif;   /* títulos elegantes */
--font-body: 'Jost', sans-serif;               /* textos, botões, UI */
```

**Pra trocar uma fonte:**
1. Vá em [fonts.google.com](https://fonts.google.com) — grátis, milhares de opções.
2. Escolha uma fonte, clique nela, depois em **"Get font"** → **"Get embed code"**.
3. Copia o link que ele te dá e substitui a linha `<link href="https://fonts.googleapis.com/css2?family=...">` no `index.html`.
4. Troca o nome da fonte dentro das aspas em `--font-display` ou `--font-body`, no `style.css`, pelo nome exato do Google Fonts (maiúsculas incluídas).

Sugestões parecidas com o estilo atual: *Playfair Display*, *Marcellus*, *EB Garamond* (pro `--font-display`); *Poppins*, *Manrope*, *Nunito Sans* (pro `--font-body`).

## 6. Molduras (bordas dos cards)

A borda em gradiente do card do enigma e do popup do quiz usa a mesma lógica, por exemplo em `.gate-card`:

```css
background:
  linear-gradient(rgba(255,248,251,0.88), rgba(255,248,251,0.88)) padding-box,
  linear-gradient(135deg, var(--rose), var(--gold) 55%, var(--leaf-700)) border-box;
```

A segunda linha é a moldura em si — troca as cores (`var(--rose)`, `var(--gold)`, `var(--leaf-700)`, ou hexadecimais direto) ou o ângulo (`135deg`) pra girar a direção do gradiente. `border-radius: 22px;` logo abaixo controla o quão arredondado é o canto — número maior = mais arredondado.

## 7. Efeitos e animações

- **Velocidade dos corações flutuando no fundo geral**: no `script.js`, procure por `const duration = 16 + Math.random() * 10;`. O `16` é a duração mínima (segundos), o `10` é a variação aleatória extra. Aumenta pra mais lento, diminui pra mais rápido.
- **Velocidade dos corações do card do enigma**: no `style.css`, procure pelas linhas `.card-heart.h1` até `.card-heart.h6` — cada uma tem um `animation-duration`. Número menor = mais rápido.
- **Quantidade de corações no fundo**: `setInterval(spawnParticle, 900)` no `script.js` — `900` é o intervalo em milissegundos entre um coração e outro.
- **Animação de virar página** (troca de tela): `@keyframes pageOut` e `@keyframes pageIn` no `style.css`.
- **Velocidade do slideshow de fotos**: no `script.js`, procure por `TEMPO_PAUSA_FOTO` (quanto tempo cada foto fica parada) e `DURACAO_TRANSICAO_FOTO` (duração da entrada/saída).

## Resumo rápido: "quero mudar só UMA cor"

- **Rosa do site inteiro** → troca `--rose` e `--rose-deep` no topo do `style.css` (e, se quiser ser bem minucioso, os `rgba(236,72,153...)` espalhados pelo arquivo).
- **Dourado** → troca `--gold` (e os `rgba(179,121,47...)`).
- **Fundo geral** → `--bg-1` e `--bg-2`.
- **Cor do texto** → `--text-main`.