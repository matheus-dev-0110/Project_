# PulseSphere — Plataforma Imersiva Futurista

Este projeto é um site completo, moderno e responsivo construído com **FastAPI**, **HTML**, **CSS** e **JavaScript**. O objetivo é apresentar a visão da PulseSphere, uma plataforma de experiências digitais imersivas que conecta pessoas, dados e sensações.

## Pré-requisitos

- Python 3.10+
- Pipenv ou pip

## Configuração do ambiente

```bash
python -m venv .venv
source .venv/bin/activate  # No Windows use: .venv\Scripts\activate
pip install -r requirements.txt
```

## Executando o servidor

```bash
uvicorn app.main:app --reload
```

O site ficará disponível em `http://127.0.0.1:8000/`.

## Estrutura de pastas

```
app/
├── main.py           # Aplicação FastAPI e rotas
├── templates/        # Páginas HTML com Jinja2
│   ├── base.html
│   ├── index.html
│   └── vision.html
└── static/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## Rotas disponíveis

- `/` — Página inicial com hero animado, visão geral do ecossistema e formulário de contato.
- `/vision` — Página complementar com manifesto e linha do tempo de evolução.
- `/api/pulse` — Endpoint JSON com dados fictícios utilizados para alimentar o painel dinâmico.

## Empacotando em .zip

Para gerar um arquivo `.zip` com todos os arquivos do projeto, execute:

```bash
zip -r PulseSphere.zip app requirements.txt README.md
```

O arquivo compactado conterá tudo o que é necessário para executar o site localmente.

## Licença

Este projeto é disponibilizado sob a licença MIT.
