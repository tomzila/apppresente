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
- **Fotos**: array `FOTOS`. Coloque os arquivos em `assets/fotos/` e liste os caminhos, ex: `"assets/fotos/foto1.jpg"`.
- **Música**: salve o arquivo mp3 (que você já possua legalmente) como `assets/audio/eu-te-devoro.mp3`, ou troque o `src` da tag `<audio>` no `index.html` pelo nome do seu arquivo. Não incluí o áudio em si — direitos autorais não permitem eu baixar/gerar isso por você.

## Corações e folhas por tela

No `index.html`, cada `<section class="screen" ...>` tem um atributo `data-particles`. Exemplos:
```html
data-particles="hearts,leaves"   → mostra os dois
data-particles="hearts"          → só corações
data-particles=""                → nenhuma partícula nessa tela
```
Edite esse atributo em cada tela pra ligar/desligar como quiser.

## Adicionando/reordenando telas

Cada tela é um bloco `<section class="screen" id="...">` no `index.html`. Pra adicionar uma nova:
1. Copie um bloco existente, mude o `id`.
2. Se quiser avançar por botão, adicione `data-next` no botão dentro dela.
3. O JS detecta todas as `.screen` automaticamente pela ordem em que aparecem no HTML — não precisa mexer no script.js pra isso.

## Como testar localmente

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