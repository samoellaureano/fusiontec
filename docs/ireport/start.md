# Iniciando com IReport

A equipe de serviços utiliza o IReport para criar relatórios dinâmicos solicitados pelo cliente com informações do processo. 
Atualmente já existem modelos de código prontos que podem ser reaproveitados para criar seu relatório, você encontra um exemplo [aqui](https://gitlab.neomind.com.br/neomind-servicos/utils/ireport/lista-de-itens). 

## O que é o IReport?
O IReport é um IDE desenvolvida pela JasperSoft. Os arquivos do modelo possuem extensão .jrxml e os arquivos compilados são .jasper. 

## Como saber qual versão do IReport posso utilizar no meu projeto? 
Você precisa saber qual a versão do Fusion e acessar o gitlab do Fusion padrão, na branch da versão, para verificar no pom.xml a versão do IReport. 
Essa informação NÃO está no pom.xml do projeto do cliente, pois o projeto do cliente utiliza o Fusion como *dependência* e a compatibilidade do Fusion com o IReport é definida pelo produto padrão.

O pom.xml terá um informação semelhante a:
```
<dependency>
    <groupId>net.sf.jasperreports</groupId>
    <artifactId>jasperreports</artifactId>
    <version>6.13.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.olap4j</groupId>
            <artifactId>olap4j</artifactId>
        </exclusion>
    </exclusions>
</dependency>

``` 
Ou seja, o IReport compatível é a versão 6+. 