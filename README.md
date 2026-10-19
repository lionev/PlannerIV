# PlannerIV

Protótipo web para comparar um item do Diablo 4 com a build importada: lê o tooltip linha a linha e marca o que bate e o que falta.

Ainda **não** é overlay no jogo. A Fase 0 valida o planner + OCR no browser. Um futuro Ctrl+D no D4 usaria o mesmo caminho: imagem → OCR → linhas → comparar com a build.

## Como rodar

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

| Comando        | O que faz              |
| -------------- | ---------------------- |
| `npm run dev`  | Servidor de desenvolvimento (Vite, porta 5173) |
| `npm run build`| Typecheck + build de produção |
| `npm run preview` | Preview do build |

Requer Node.js e um navegador. O OCR baixa o worker do Tesseract na primeira execução.

## O que existe hoje

### Build

- Afixos alvo por slot (elmo, peitoral, luvas, calças, botas, amuleto, anéis, arma, offhand)
- Busca em inglês/português e com alias de OCR (`critica` → Critical Strike Damage)
- Import/export em texto
- Exemplo pronto: Heartseeker Rogue
- Persistência no `localStorage`

Formato de import:

```
# PlannerIV build
name: Heartseeker Rogue
class: Rogue

[gloves]
Dexterity
Vulnerable Damage
Critical Strike Damage
Maximum Life

[helm]
Cooldown Reduction
Maximum Life
Lucky Hit Chance
Intelligence
```

Headers aceitos: id do slot (`gloves`), nome EN (`Gloves`) ou PT (`Luvas`). `ring1` e `ring2` precisam do número; `ring` sozinho não distingue os anéis.

### Laboratório OCR

- 10 tooltips sintéticos (perfeito, faltando linhas, slot errado, PT-BR, Greater Affix, números, contraste baixo, texto sujo)
- Upload de print real do tooltip
- Resultado por linha:
  - **verde** — a build pedia e o item tem
  - **vermelho** — a build pedia e o item não tem
  - **amarelo** — o item tem, a build não usa

Na validação interna, os 10 casos sintéticos fecharam **10/10** contra o slot Luvas da build de exemplo.

## Como a comparação funciona

1. A build guarda IDs de afixo por slot (`dexterity`, `crit-damage`, …).
2. O OCR (Tesseract.js) lê a imagem depois de upscale, inverter fundo escuro e esticar contraste.
3. O parser corta poder do item, raridade, tempering e aspecto; fica com as linhas de stat.
4. Cada linha é normalizada (sem números, `%`, acentos) e casada no dicionário por alias + similaridade.
5. O matcher pinta hit / miss / extra contra o slot selecionado.

O Diablo 4 não tem “copiar item” como o PoE. Por isso a leitura é visual (print), não memória do jogo.

## Estrutura

```
src/
  App.tsx                 Abas Build e Laboratório OCR
  types.ts
  data/
    affixes.ts            Dicionário EN/PT + aliases
    slots.ts
    sampleBuild.ts
  lib/
    build.ts              Import/export e localStorage
    identify.ts           Identifica afixo numa linha
    match.ts              Compara tooltip × build
    normalize.ts
    ocr.ts                Tesseract + pré-processamento
    parseTooltip.ts
    synthetic.ts          10 tooltips de teste
  components/
    BuildStudio.tsx
    OcrLab.tsx
    MatchBoard.tsx
```

Stack: Vite, React 19, TypeScript, Tesseract.js.

## Fora desta fase

- Overlay no D4 / hotkey Ctrl+D
- Import por URL Maxroll, D4Builds ou Mobalytics
- Leitura de memória do processo do jogo (não entra no plano)

## Próximos passos

1. Testar com 2–3 prints reais de tooltip do D4.
2. Importar planner Maxroll (ex.: `https://maxroll.gg/d4/planner/<id>#n`) para preencher os slots.
3. Companion desktop: hotkey, captura do tooltip, mesmos quadrados verde/vermelho por cima do jogo.

## Licença

Projeto privado / em desenvolvimento. Nomes de afixos e itens são do Diablo 4 (Blizzard).
