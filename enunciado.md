Olá Dev! Tudo bem?

Estamos sempre em busca de profissionais capacitados e interessados, com boa capacidade de aprendizado, adaptação e principalmente bom senso.

Este teste tem como objetivo avaliar e desafiar você. Queremos apenas reconhecer seu esforço e potencial para aprender se adaptar e tomar decisões.

Vamos ao teste!

## Controlando competições.

Nessa parte do teste você deve construir um backend com uma intereface REST, que será responsável por controlar várias competições.

Existem 3 tipos de competição:

* Martelo de Thor:
  - Maior tempo segurando o martelo ganha.
  - Medida: Tempo (minutos, segundos)

* Lançamento de dardos:
  - Maior distância vence.
  - Cada atleta tem três chances.
  - Medida: Distancia (centímetro, metros)

* Beber Água:
  - Maior quantidade ganha.
  - Medida: Volume (millilitro, litros)

## API

A API deve fornecer opções para:

1. Criar uma competição.
2. Finalizar uma competição.
3. Listar todas as competições.
4. Listar todas as competições ativas.
5. Listar uma competição por id.
6. Adicionar atletas a competição.
7. Lista todos os atletas de uma competição
8. Computar o rank final e parcial com a posição de cada participante.

**Detalhes:**

* A API deve validar os dados de input.
* A API não deve aceitar novos cadastros caso a competição já tenha sido finalizada.
* O design da api e modelagem do banco fica ao seu critério, inclusive será usado para avaliação.
  - Dica: Tente modelar a estrutura de forma genérica, de uma maneira que novas formas de competições possam ser adicionadas facilmente.
* Para integrar mais facilmente com o front, você pode fazer um rota `get` `/contest/all`, não se preocupe com paginação.
* Crie um README.md explicando como rodar sua API e forneça exemplos e descrição das rotas.
  - Uma collection do postman ajuda muito.
* Atente-se para as unidades de medidas pois o rank deve considera-las.
* Utilize sqlite pra o banco, com **sequelize**.
* Use o nome do atleta como chave única para sua entrada em uma competição, ou seja, se um atleta de mesmo nome for inserido os dados são sobreescrevidos.
* Use esse repósitorio pra subir o projeto, renomeie esse arquivo pra `enunciado.md` e crie o seu próprio `README.md`.

### Exemplos
Exemplos são meramente ilustrativos a entrada pode ser da maneira mostrada abaixo, mas na reposta talvez você queira incluir dados da competição também.

1. Adicionar atleta
```json
{
  "athlete": "Jane Doe",
  "value": 10,
  "unit": "min"
}
```
```json
{
  "athlete": "John Doe",
  "value": 750,
  "unit": "sec"
}
```

2. Resultado
```json
[
  {
    "athlete": "John Doe",
    "total": 750
  },
  {
    "athlete": "Jane Doe",
    "total": 600
  }
] 
```
