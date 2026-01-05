![RestEast](../../images/resteasy_logo_600x.png)

API Java para serviços Web RESTful, fornece APIs portáteis para desenvolver, expor e acessar aplicativos da Web desenvolvidos e implementados em conformidade com os princípios do estilo arquitetural REST.


### Web resources

O JAX-RS permite que os desenvolvedores criem aplicativos Web em Java de forma rápida. A API traz suporte para projetar e implementar recursos Web e aplicações que seguem os princípios do estilo de arquitetura REST (Representational State Transfer) para a plataforma Java.

Com JAX-RS, POJOs podem ser expostos como recursos RESTful, independentemente da tecnologia subjacente, usando uma API baseada em anotação declarativa de fácil uso e de alto nível. Por exemplo:

```java
@Path("customer/{customerId}")
@Consumes("application/json")
@Produces("application/json")
public class WidgetResource {

    @GET
    public String getCustomer(@PathParam("customerId") String id) {
        return service.getCustomer(id);
    }

    @PUT
    public void updateCustomer(@PathParam("customerId") String id, 
                                                    Source update) {
       service.updateCustomer(id, update);
    }
    ...
}
```

### Web resource clients

A API client JAX-RS é uma API baseada em Java usada para acessar recursos na Web. Não está restrito a recursos implementados usando o JAX-RS. Ele fornece uma abstração de nível superior em comparação a uma API de comunicação HTTP simples, bem como integração com os provedores de extensão JAX-RS, para permitir a implementação concisa e eficiente de soluções reutilizáveis do lado do cliente, que aproveitam implementações existentes e bem estabelecidas de comunicação baseada em HTTP.

A API Client também encapsula a restrição de Interface Uniforme - uma restrição importante do estilo arquitetural REST - e os elementos de dados associados como artefatos Java do lado do cliente e suporta uma arquitetura conectável definindo vários pontos de extensão.

O exemplo a seguir demonstra um cenário simples de uso da API do cliente JAX-RS:

```java
    Client client = ClientBuilder.newClient();

    client.property("MyProperty", "MyValue")
          .register(MyProvider.class)
          .enable(MyFeature.class);

    Response res = client.target("http://example.org/hello")
                         .request("application/json").get();
    String message = res.readEntity(String.class);
```

### Packages

| Package               | Descrição                                                                           | 
| -------------         |:-------------:                                                                      | 
| javax.ws.rs           | Interfaces e anotações de alto nível usadas para criar recursos de serviço RESTful  | 
| javax.ws.rs.client    | A API do cliente JAX-RS                                                             | 
| javax.ws.rs.container | API JAX-RS específica do contêiner                                                  | 
| javax.ws.rs.core      | Interfaces e anotações de baixo nível usadas para criar recursos de serviço RESTful |
| javax.ws.rs.ext       | APIs que fornecem extensões para os tipos suportados pela API do JAX-RS             |  


### Maven repo

```xml
<!-- https://mvnrepository.com/artifact/org.jboss.resteasy/resteasy-jaxrs -->
<dependency>
    <groupId>org.jboss.resteasy</groupId>
    <artifactId>resteasy-jaxrs</artifactId>
    <version>version</version>
</dependency>

```

[Doc Reference](https://jax-rs.github.io/apidocs/2.0/)

