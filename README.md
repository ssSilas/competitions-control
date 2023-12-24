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
      "name": "Ficar de pé",
      "type": "resistance"
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

  ```json
  {
    "name": "Competidor",
    "results": [
    {
    "value": 5,
    "unit": "min"
    }
    ]
  }

    ```

## Athletes by Competition

- **Descrição:** Busca competidores presentes em uma determinada competição.
- **Método:** PUT
- **URL:** `{{API_URL}}/contest/athletes-by-competition?id=1`
