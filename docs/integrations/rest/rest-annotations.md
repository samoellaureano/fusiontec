
As Anotações API do JAX-RS são usadas para fornecer metadados referetes recurso vindo web. Um exemplo típico é usar a anotação @GET com a anotação @Path para identificar o método que deve manipular uma solicitação GET para o URI especificado na anotação @Path.

O que se segue é uma visão geral das anotações disponíveis para marcar métodos e classes usados para construir recursos. Existem mais algumas anotações no arsenal do JAR-RS não mensionadas, no entanto, como a maioria do trabalho do JAX-RS está nas configuração e manipulação de recursos, aqui que você encontrará a maioria das anotações da API colocadas em uso.

> É importante salientar que as classes rest não devem conter métodos referentes a busca / alteração de recursos de dados ou lógica de negócia, estas classes devem conter apenas métoods para receber as solicitações REST e retornar as devidas respostas. 

### @ApplicationPath Annotation

```
@ApplicationPath("/api")
public class RESTConfig extends Application {}
```

É aqui você começa a definir o URI para seus recursos. Aqui estamos dizendo que todos os nossos recursos devem ser encontrados na raiz /api. A URL deve ser algo como: 
http://localhost:8080/webcontext/api/ onde webcontext é o nome da sua aplicação.


### @Path Annotation

```
@Path("/books")
public class BookResource {}
```

Agora, o URI para o recurso livro é /api/books e a URL seria http://localhost:8080/webcontext/api/books. Esta é a convenção para nomear um recurso como um substantivo e no plural.
Uma vez que o caminho para o nosso recurso foi definido, o método de recurso individual é configurado para o método HTTP e o tipo de contexto. Isto é onde a diversão começa    ( ͡° ͜ʖ ͡°))  ＼(^ω^＼)

> Há uma anotação para cada um dos [métodos HTTP!!!](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html).


### @GET HTTP Method Annotation

Métodos com a anotação @GET respondem às solicitações HTTP GET.

```
@GET
@Produces(MediaType.APPLICATION_JSON)
public Response getAllBooks() {
    List<Book> books = BookRepository.getAllBooks();
    GenericEntity<List<Book>> list = new GenericEntity<List<Book>>(books) {};
    return Response.ok(list).build();
}
```

> Observe que o wrapper [GenericEntity](https://readlearncode.com/java-ee/jax-rs-list-generic-type-erasure-solution-genericentity/) é usado para manter o tipo genérico da 'books' como book.

### @POST HTTP Method Annotation

Métodos com a anotação @POST respondem as solicitações HTTP POST.

```
@POST
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Response saveBook(Book book) {
    book = bookRepository.saveBook(book);
    return Response.ok(book).build();
}
```
O método HTTP POST é comumente usado para criar um recurso. Este código de exemplo persiste o novo objeto book no banco de dados.


### @PUT HTTP Method Annotation

Métodos com a anotação @PUT é usada para atualizar um registro e o método anotado dessa maneira responde a uma solicitação HTTP PUT.

```
@PUT
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Response updateBook(Book book) {
    book = bookRepository.updateBook(book);
    return Response.ok(book).build();
}
```

### @DELETE HTTP Method Annotation

Métodos com a anotação @DELETE devem excluir um recurso.

```
@DELETE
@Path("{isbn}")
@Produces(MediaType.APPLICATION_JSON)
public Response deleteBook(@PathParam("isbn") String isbn) {
    Book book = bookRepository.deleteBookByIsbn(isbn);
    return Response.ok(book).build();
}
```

Geralmente, o recurso ou seu id é passado para o parâmetro do método pela URI, como você pode ver neste exemplo.


### The @OPTIONS HTTP Method Annotation


Métodos anotados com a anotação @OPTIONS respondem às solicitações HTTP Option .

```
@OPTIONS
public Response preflight() {
    return Response.ok().header("Allow", true).build();
}
```
The options method is used as a request when the client wishes to make a complex HTTP request to a different domain. It is done in order to determine if the client is allowed to make the request or not.

O método de options é usado como uma solicitação quando o cliente deseja fazer uma solicitação HTTP complexa para um domínio diferente. Isso é feito para determinar se o cliente tem permissão para fazer a solicitação ou não.


### @HEAD HTTP Method Annotation

O método HTTP HEAD é idêntico ao método HTTP GET, exceto pelo fato de que o servidor não pode enviar um "body" na resposta, enviando apenas o "header".

```

@HEAD
public Response headsUp() {
    return Response.ok().build();
}
```
Esse método deve ser utilizado obter metadados referentes à entidade sem enviar de volta o próprio corpo da mesma.


### @Path Annotation (de novo?) e @PathParam

Certamente você percebeu que a anotação @Path pode ser usada no método para refinar ainda mais a localização de um recurso. No exemplo abaixo, o caminho foi especificado como @Path (“isbn”). Isso chama-se "path variable", o que significa que quando uma solicitação é feita para o URI /api/books/1234, a "path variable" 1234 é recuperada e atribuída ao parâmetro do método marcado com a anotação @PathParam. Portanto, no código, o valor 1234 é atribuído à variável isbn.

```
@Path("{isbn}") 
public Response aMethod(@PathParam("isbn") String isbn)
```

#### @QueryParamter Annotation

Um "query parameter" (ou parâmetro de consulta) é o valor associado ao par chave/valor anexado a um URL após símbolo **?**. Portanto, por exemplo, na URL http://localhost: 8080/api/books/search?Keyword=Java&limit=10, os parâmetros de consulta são "keyword" e "limit" e os valores da consulta são Java e 10. Para recuperar esses valores, use anotação @QueryParam e passe o nome do parâmetro de consulta como valor e, em seguida, anote um parâmetro no método que responda a uma solicitação da URI recurso /books/search.

```
@GET
@Produces(MediaType.APPLICATION_JSON)
@Path("search")
public Response searchBook(@QueryParam("keyword") String keyword, @QueryParam("limit") int limit) {
    List<Book> books = bookRepository.searchBook(keyword, limit);
    return Response.ok(new GenericEntity<List<Book>>(books) {}).build();
}
```

No código acima, o valor do parâmetro de consulta **keyword** é atribuído ao parâmetro **keyword** do método e o valor do parâmetro de consulta de **limit** é atribuído ao parâmetro **limit** do método.

#### @Produces Annotation

As anotações @Produces especificam o tipo ou tipos de mídia que o método retorna para a reqisição.

```
@GET
@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public Response getAllNewBooks() {
    return Response.ok(
            new GenericEntity<List<Book>>(
                    bookRepository.getAllNewBooks()
            ) {}).build();
}
```

O método getAllNewBooks é capaz de retornar uma lista de todos os livros no formato JSON ou XML. Alternativamente, o tipo de mídia pode ser expresso como uma String: "application/json” e "application/xml".

```
@Produces({"application/json", "application/xml"})
```

#### @Consumes Annotation

As anotações  @Consumes especificam o tipo de mídia que o método é capaz de consumir.

```
@Consumes ({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
```

O tipo também pode ser especificado como valores String: "application/json" e "application/xml"


[Doc Reference](https://dzone.com/articles/an-introduction-to-jax-rs-annotations-part-1)

