# arquivo: news-service.ts
- redundância ao usar o AlterNewsData que é cópia exata de CreateNewsData;
- verificação do id repetidas vezes em funções distintas;
- complexidade de lógica booleana na validação do Id;

# arquivo: news-service.ts
- redundância ao usar o AlterNewsData que é cópia exata de CreateNewsData;
- erros lançados poderiam estar em arquivo separado;
- variável newsWithTitle dentro de validate() tem nome pouco semântico;
- complexidade de lógica booleana em alterNews na função de validação não é clara;
- função alterNews() com complexidade da lógica booleana na checagem de validate();
- complexidade da lógica booleana na checagem de validação da data está confusa;
- função validate() tem nome pouco semântico;
- função validate() está muito longa, possui muitas responsabilidades;

# arquivo: news-repository.ts
- redundância ao usar o AlterNewsData que é cópia exata de CreateNewsData;
- nomes das funções diferente das demais camadas, inclusive mesclando português e inglês;
