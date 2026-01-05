
As APIs RESTful permitem que você desenvolva qualquer tipo de aplicativo da web com todas as operações possíveis de CRUD (criar, recuperar, atualizar, excluir). As diretrizes do REST sugerem o uso de um método HTTP específico em um tipo específico de chamada feita para o servidor (embora tecnicamente seja possível violar esta diretriz, mas é altamente desencorajado).


# JAX-RS

Definem um conjunto de APIs Java para o desenvolvimento de serviços da Web construídos de acordo
com a arquitetuta REST. Foi introduzido no Java SE 5, para simplificar o desenvolvimento e a implementação web service clients e endpoints.

Os objetivos da API são:

* **POJO-BASED.** A API deve fornecer um conjunto de anotações e classes / interfaces associadas que podem ser usadas
com POJOs para expô-los como recursos da Web. A especificação definirá o ciclo de vida do objeto e escopo.

* **HTTP-centric.** A especificação assume que HTTP é o protocolo de rede e fornecerá 
um mapeamento claro entre os elementos HTTP e URI e as classes API correspondentes e
anotações. A API fornecerá suporte de alto nível para padrões de uso HTTP e será
suficientemente flexível para suportar uma variedade de aplicações HTTP.

* **Independência de formato.** A API é aplicável a uma ampla variedade de tipos de conteúdo de entidades HTTP. isto
fornecere a capacidade necessária para permitir que tipos adicionais sejam adicionados por uma maneira padrão.

* **Independência do contêiner.** Os artefatos que usam a API serão implantáveis em diversas da camadas da Web.
As especificações definem como os artefatos são implementados em um contêiner Servlet ou em um provedor JAX-WS.

# RESTEasy

RESTEasy é umabiblioteca que fornece várias estruturas para ajudá-lo a construir RESTful Web Services e RESTful Java applications. 
É uma implementação portátil da especificação JAX-RS.

### Características
* Portátil para o Tomcat e muitos outros server-applications.
* Implementações incorporáveis ao servidor para testes JUnit.
* Framework do cliente aprimorado.
* Cache de "Browser" do cliente. Suporta semântica de cache HTTP 1.1, incluindo revalidação de cache.
* Cache de memória do servidor. Cache de resposta local. Automaticamente lida com a geração de ETag e revalidação de cache
* Rico conjunto de provedores para: XML, JSON, YAML, Fastinfoset, Multipart, XOP, Atom, etc.
* JAXB organizando em XML, JSON, Jackson, Fastinfoset e Atom, bem como wrappers para mapas, matrizes, listas e conjuntos de objetos JAXB.
* Codificação de conteúdo GZIP.
* Abstrações de HTTP assíncrono (Comet) para o JBoss Web, Tomcat 6 e Servlet 3.0
* Serviço de job assíncrono.
* Modelo Rich interceptor.
* OAuth2 e SSO distribuído com o JBoss AS7
* Assinatura digital e suporte a criptografia com S / MIME e DOSETA
* Integração EJB, Seam, Guice, Spring, Spring MVC e Spring Boot