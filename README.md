# Documentação Postman - Competitions Control

Esta documentação descreve os endpoints disponíveis na coleção "Competitions Control" no Postman. A collection Postman se encontra na raiz do projeto.

## Iniciar o Projeto

Para iniciar o projeto, siga as instruções abaixo:

1. **Instale as Dependências:**
   - Utilizando Yarn:

     ```bash
     yarn install
     ```

   - Utilizando npm:

     ```bash
     npm install
     ```

2. **Inicie o Servidor de Desenvolvimento:**
   - Utilizando Yarn:

     ```bash
     yarn dev
     ```

   - Utilizando npm:

     ```bash
     npm run dev
     ```

   Isso iniciará o servidor de desenvolvimento e o projeto estará acessível em [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Banco de dados

Subi o banco de dados que utilizei, contendo alguns dados previamente inseridos, com o intuito de otimizar a compreensão e agilizar as validações de forma mais fluída.

## Padrão de Retorno de Erros

O padrão de retorno de erros é um objeto JSON com as seguintes propriedades:

```json
{
  "message": "Mensagem de erro específica ou padrão",
  "status": "Código de status HTTP",
  "error": "Tipo específico de erro ou padrão"
}
 ```

## Endpoints

### Contest

#### Create

- **Descrição:** Cria uma nova competição.
- **Método:** POST
- **URL:** `{{API_URL}}/contest`
- **Corpo da Requisição (Raw JSON):**

  ```json
  {
      "name": "Martelo de Thor",
      "type": "resistance"
  }

    ```

  ```json
  {
      "name": "Lançamento de dardos",
      "type": "distance"
  }

    ```

  ```json
  {
      "name": "Beber Água",
      "type": "amount"
  }

    ```

## GetAll

- **Descrição:** Obtém todas as competições.
- **Método:** GET
- **URL:** `{{API_URL}}/contest`

## Active

- **Descrição:** Obtém a competição ativa.
- **Método:** GET
- **URL:** `{{API_URL}}/contest/active`

## By Id

- **Descrição:** Obtém uma competição pelo ID.
- **Método:** GET
- **URL:** `{{API_URL}}/contest/by-id?id=1`

## Finish

- **Descrição:** Finaliza uma competição pelo ID.
- **Método:** PUT
- **URL:** `{{API_URL}}/contest/finish?id=1`

## Add Athlete in Contest

- **Descrição:** Adiciona um atleta a uma competição.
- **Método:** POST
- **URL:** `{{API_URL}}/contest/add-athlete?contestId=3`
- **Corpo da Requisição (Raw JSON):**

### Exemplos por tipo de competição

As unidades são convertidas para a menor unidade presente. Por exemplo:
Caso o competidor realize 5 minutos das competiçoes de resistência, os minutos serão convertidos para segundos. Isso vale para as demais competições.

#### Martelo de Thor - resistance

Minutos:

  ```json
  {
    "name": "Competidor 1",
    "cpf": 25670709071,
    "results": [
      {
        "value": 5,
        "unit": "min"
      }
    ]
  }

  ```

Segundos:

  ```json
  {
    "name": "Competidor 2",
    "cpf": 54020101027,
    "results": [
      {
        "value": 400,
        "unit": "sec"
      }
    ]
  }

  ```

#### Lançamento de dardos - distance

  ```json
  {
    "name": "Competidor",
    "cpf": 93037963069,
    "results": [
      {
        "value": 55,
        "unit": "met"
      },
      {
        "value": 150,
        "unit": "cen"
      },
      {
        "value": 12,
        "unit": "met"
      },
    ]
  }

  ```

#### Beber Água - amount

Litro:

  ```json
  {
    "name": "Competidor 3",
    "cpf": 31646472047,
    "results": [
      {
        "value": 5,
        "unit": "lit"
      }
    ]
  }

  ```

Mililitro:

  ```json
  {
    "name": "Competidor 4",
    "cpf": 22958982009,
    "results": [
      {
        "value": 700,
        "unit": "mil"
      }
    ]
  }

  ```

## Athletes by Competition

- **Descrição:** Busca competidores presentes em uma determinada competição.
- **Método:** PUT
- **URL:** `{{API_URL}}/contest/athletes-by-competition?id=1`

## Final Result

- **Descrição:** Faz o calculo para rank parcial ou final.
- **Método:** GET
- **URL:** `{{API_URL}}/contest/final-result?contestId=1`
