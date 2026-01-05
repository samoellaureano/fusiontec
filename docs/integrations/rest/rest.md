
# O que é REST?


Representational State Transfer (REST) é definido como um estilo de arquitetura, o que significa que não é uma arquitetura de sistemas concreta, mas sim um conjunto de especificações que são aplicadas ao projetar uma arquitetura de sistemas, ela foi apresentada pela primeira vez em 2000 na [dissertação](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) de PhD de Roy Fielding. 

As web-sevices APIs que aderem a arquitetura REST são chamadas de APIs RESTful. APIs RESTful baseadas em HTTP são definidas com os seguintes aspectos.

* Um URI de base, como http://api.example.com/collection/;
* Métodos HTTP padrão (por exemplo, GET, POST, PUT, PATCH e DELETE);
* Um tipo de mídia que define elementos de dados de transição de estado (por exemplo, Atom, microformatos, application / vnd.collection + json). A representação atual informa ao cliente como compor solicitações de transições para todos os próximos estados de aplicativo disponíveis. Isso pode ser tão simples quanto um URI ou complexo como um applet Java.

> **Recurso:** A abstração chave de informações no REST. Qualquer informação que possa ser nomeada pode ser um *recurso*: um documento ou imagem, um serviço, uma coleção de outros recursos ou um objeto não virtual (por exemplo, uma pessoa). O REST usa um identificador para reconhecer o recurso específico envolvido em uma interação entre componentes.


Seis restrições de orientação definem um sistema RESTful. Essas restrições definem as maneiras que o servidor pode processar e responder às solicitações do cliente para que, operando dentro dessas restrições, o sistema ganhe propriedades não funcionais desejáveis, como desempenho, escalabilidade, simplicidade, modificabilidade, visibilidade, portabilidade e confiabilidade. Se um sistema violar qualquer das restrições necessárias, ele não poderá ser considerado RESTful.

As restrições formais de REST são as seguintes:

* **Client-server architecture**  [![RestEast](../../images/new-tab.svg)](https://en.wikipedia.org/wiki/Client%E2%80%93server_model)
  Separar as preocupações da interface do usuário das preocupações de armazenamento de dados melhora a portabilidade das interfaces do usuário. Também melhora a escalabilidade simplificando os componentes do servidor. Talvez o mais significativo para a Web, no entanto, é que a separação permite que os componentes evoluam de forma independente, suportando assim o requisito de escala de Internet de múltiplos domínios organizacionais.
* **Stateless** [![RestEast](../../images/new-tab.svg)](https://en.wikipedia.org/wiki/Stateless_protocol)
  Cada solicitação do cliente para o servidor deve conter todas as informações necessárias para entender a solicitação e não pode aproveitar qualquer contexto armazenado no servidor. O estado da sessão é, portanto, mantido inteiramente no cliente.
* **Cacheability** [![RestEast](../../images/new-tab.svg)](https://en.wikipedia.org/wiki/Web_cache)
 Clientes e intermediários podem armazenar respostas em cache. As respostas devem, portanto, implícita ou explicitamente, definir-se como armazenáveis ou não, para evitar que os clientes obtenham dados obsoletos ou inadequados em resposta a outras solicitações. O armazenamento em cache bem gerenciado elimina parcialmente ou completamente algumas interações cliente-servidor, melhorando ainda mais a escalabilidade e o desempenho.
* **Layered system** [![RestEast](../../images/new-tab.svg)](https://en.wikipedia.org/wiki/Layered_system)
 Um cliente normalmente não pode dizer se está conectado diretamente ao servidor final ou a um intermediário ao longo do caminho. Servidores intermediários podem melhorar a escalabilidade do sistema, ativando o balanceamento de carga e fornecendo caches compartilhados. Eles também podem impor políticas de segurança.
 * **Code on demand (opcional)** [![RestEast](../../images/new-tab.svg)](https://en.wikipedia.org/wiki/Client-side_scripting)
 Os servidores podem estender ou personalizar temporariamente a funcionalidade de um cliente, transferindo código executável: por exemplo, componentes compilados, como  Java [applets](https://en.wikipedia.org/wiki/Java_applet) ou scripts do lado do cliente, como JavaScript.
 * **Uniform interface**
  A restrição de interface uniforme é fundamental para o design de qualquer sistema RESTful. Ele simplifica e desacopla a arquitetura, o que permite que cada parte evolua de forma independente. As quatro restrições para essa interface uniforme são:

    * **Identificação de recursos em solicitações**
        Recursos individuais são identificados em solicitações. Os recursos em si são conceitualmente separados das representações retornadas ao cliente. Por exemplo, o servidor poderia enviar dados de seu banco de dados como HTML, XML ou como JSON - nenhum deles é a representação interna do servidor.
    * **Manipulação de recursos através de representações**
        Quando um cliente mantém uma representação de um recurso, incluindo quaisquer metadados anexados, ele possui informações suficientes para modificar ou excluir o recurso.
    * **Mensagens auto-descritivas**
        Cada mensagem inclui informações suficientes para descrever como processar a mensagem. Por exemplo, qual analisador invocar pode ser especificado por um tipo de mídia.
    * **Hipermídia como o mecanismo do estado de aplicativo ([HATEOAS](https://en.wikipedia.org/wiki/HATEOAS))**
        Tendo acessado um URI inicial para o aplicativo REST, um cliente deve poder usar links fornecidos pelo servidor dinamicamente para descobrir todas as ações e recursos disponíveis de que precisa. Conforme o acesso prossegue, o servidor responde com um texto que inclui hiperlinks para outras ações atualmente disponíveis. Não há necessidade de o cliente ser codificado com informações sobre a estrutura ou a dinâmica da aplicação. 

Outra coisa importante associada ao REST são os métodos de recurso a serem usados para realizar a transição desejada. Um grande número de pessoas relaciona erroneamente os métodos de recursos aos métodos HTTP GET / PUT / POST / DELETE.

#### Resumo dos métodos HTTP mais utilizados para APIs RESTful

A tabela a seguir mostra como os métodos HTTP são normalmente usados em uma API RESTful:

| Método  HTTP |          CRUD         | Coleção itens, ex: api.example.com/users/         | item do recurso, ex: api.example.com/users/001     |
|------------- | :-------------------: | ------------------------------------------------- | --------------------------------------------------|
| GET          |        Read           | 200 (OK) retorna uma lista de usuários, use paginação, ordenação e filtros para navegar listar grandes. | 200 (OK) retorna um item. 404 (Not Found) se Id for inválido ou não for encontrado. |
| POST         |        Create         | 201 (Created) "Location" header com link "/users/{id}" contendo novo Id.| Evite usar POST para um unico item. |
| PUT          |     Update/Replace    | 404 (Not Found) a não ser que você queira modificar todos os itens na coleção. | 200 (OK) ou 204 (No Content). Use 404 (Not Found) se o Id não for encontrado ou for inválido. |
| PATCH        | Parcial Update/Modify | 404 (Not Found) a não ser que você queira modificar a própria coleção. | 200 (OK) ou 204 (No Content) use 404 (Not Found) se o Id não for encontrado ou for inválido. |
| DELETE       |        Delete         | 404 (Not Found) a não ser que você queira remover a coleção inteira — ***CUIDADO***. | 200 (OK) ou 404 (Not Found) se o Id não for encontrado ou for inválido. |


### HTTP GET

Use as requisições GET para recuperar apenas informações / representação de recursos - e não modificá-las de nenhuma maneira. Como as solicitações GET não alteram o estado do recurso, esses são considerados métodos **seguro**. Além disso, as APIs GET devem ser **idempotente**, o que significa que fazer várias solicitações idênticas deve produzir o mesmo resultado até que outra API (POST ou PUT) alterar o estado do recurso no servidor.

Se o Request-URI se refere a um processo de produção de dados, são os dados produzidos que devem ser retornados como a entidade na resposta.

Para qualquer API HTTP GET, se o recurso for encontrado no servidor, ele deverá retornar o código de resposta HTTP 200 (OK) - juntamente com o corpo da resposta, que geralmente é XML ou JSON (devido à natureza independente da plataforma).

Caso o recurso NÃO seja encontrado no servidor, ele deve retornar o código de resposta HTTP 404 (NOT FOUND). Da mesma forma, se for determinado que a solicitação GET em si não está formatada corretamente, o servidor retornará o código de resposta HTTP 400 (BAD REQUEST).

### HTTP POST

Use APIs POST para criar novos recursos, por exemplo, um arquivo é subordinado a um diretório que o contém ou uma linha é subordinada a uma tabela de banco de dados. Falando estritamente em termos de REST, os métodos POST são usados ​​para criar um novo recurso na coleção de recursos.

Idealmente, se um recurso tiver sido criado no servidor de origem, a resposta DEVE ser o código de resposta HTTP 201 (Criado) e conter uma entidade que descreva o status da solicitação e faça referência ao novo recurso e um header de [Localização](https://en.wikipedia.org/wiki/HTTP_location).

Muitas vezes, a ação executada pelo método POST pode não resultar em um recurso que possa ser identificado por uma URI. Nesse caso, o código de resposta HTTP 200 (OK) ou 204 (No Content) pode ser utilizado.

Observe que o POST não é **seguro** nem **idempotente** e invocar duas solicitações POST idênticas resultará em dois recursos diferentes contendo as mesmas informações (exceto IDs de recurso).

### HTTP PUT

Use APIs PUT principalmente para atualizar o recurso existente (se o recurso não existir, a API pode decidir criar um novo recurso ou não). Se um novo recurso tiver sido criado pela API PUT, o servidor de origem DEVE retornar uma resposta HTTP 201 (Criado) e, se um recurso existente for modificado, 200 (OK) ou 204 (Sem conteúdo). Os códigos de resposta devem ser enviados para indicar a conclusão bem sucedida do pedido.

> "A diferença entre as APIs POST e PUT pode ser observada nas URIs de requisição. As solicitações POST são feitas nas coleções de recursos, enquanto as solicitações PUT são feitas em um recurso individual."

### HTTP DELETE

As APIs DELETE são usadas para excluir recursos (identificados pelo Request-URI).

Uma resposta bem-sucedida das solicitações DELETE DEVE ser código HTTP 200 (OK) se a resposta incluir uma entidade descrevendo o status, 202 (Aceito) se a ação tiver sido enfileirada ou 204 (Sem conteúdo) se a ação tiver sido executada, mas o resposta não inclui uma entidade.

As operações DELETE são **idempotentes**. Se você EXCLUIR um recurso, ele será removido da coleção de recursos. Chamar repetidamente DELETE API nesse recurso não irá alterar o resultado - no entanto, chamar DELETE em um recurso uma segunda vez retornará um 404 (não encontrado) desde que ele já foi removido. Alguns podem argumentar que isso torna o método DELETE não idempotente. É uma questão de discussão e opinião pessoal.

### HTTP PATCH

As requisições HTTP PATCH devem fazer atualizações parciais em um recurso. Note que requisições PUT também modificam uma entidade de recursos, porém o método PATCH é a opção correta para atualizar parcialmente um recurso existente, e o PUT só deve ser usado se você estiver substituindo um recurso na sua totalidade.