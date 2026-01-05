### Criação de histórico de atividade.

## Criar um histórico de atividades no processo de solicitação de viagem. Para Isso: 

- Criar um formulário com os campos: 1- Usuário, 2- Data, 3- Atividade (campo texto).
- Criar um campo do tipo *EForm* **Lista Sim Selecionável Não** no formulário principal do processo de solicitação de viagem e vincular o formulário criado.

Após isso:

- Vincular o *Adapter* com todas as execuções de **Usuário** criando um histórico que identifique a **Atividade**, o **Usuário** que a executou e em qual **Data**.
Ou seja, cada vez que o *Adapter* executar é preciso criar um registro, atribuindo usuário, data e qual a atividade que foi executada.