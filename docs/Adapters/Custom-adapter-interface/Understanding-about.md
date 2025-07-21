# O que é um AdapterInterface?
O AdapterInterface nada mais é que uma atividade de sistema (um script) que pode ser executada logo 
após uma atividade no fluxo.

Ele pode estar localizado logo após uma atividade de usuário ou até mesmo antes de uma atividade.
 Vejamos um exemplo abaixo:

![Screenshot](imgs/AdapterInterfaceFluxo.png)

O AdapterInterface possui várias funções, na verdade podemos fazer qualquer coisa com ele. Temos alguns exemplos:
   
- Validar informações de aprovação em uma lista
- Realizar cálculos
- Enviar email de aprovação

Entre outras funções, algumas até mais complexas:

- Realizar integrações com outros sistemas
- Gerar relatórios e documentações

## Como ele é disparado?

O AdapterInterface pode ser disparado em dois momentos:

- `start()` Este é o método que vai executar o adapter quando o fluxo passar passar por essa atividade.
- `back()` E este executa a atividade quando o usuario recusar uma atividade, que no caso a atividade retorna para a anterior.