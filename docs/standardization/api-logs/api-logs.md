# API de Logs

Em qualquer sistema, por mais bem desenvolvido que seja, sempre poderá haver o risco de alguma condição em específico
falhar, seja por erro na implementação ou por alguma exceção não prevista nas regras de negócio das especificações
iniciais. Rastrear uma condição não prevista é essencial para qualquer sistema, desde sistemas pequenos até
os de grande porte. Assim, o uso de logs ou registro de eventos se **torna uma prática quase que obrigatória**.

Por exemplo:

* O que fazer quando rodamos um teste e ele não passa? 
* Como saber o que deu errado para corrigir?
* Pior: Como saber o que deu errado quando acontece um erro em produção?

**Solução:**

A API de log nos auxilia na organização dos logs e na maneira como eles serão registrados. Dependendo das regras
definidas pelo programador, alguns eventos poderão acionar um aviso nos logs do sistema. Outros eventos, como por
exemplo, exceções (ou erros de sistema), podem ser salvas em um arquivo texto, pois neste caso pode
ser importante conhecer quais exceções e quando elas ocorreram.

Em se tratando de escrita em arquivos texto, a API tem parâmetros definidos para sobrescrevê-los, visando,
entre outras questões, não comprometer o espaço em disco do sistema, caso algum erro recorrente surja.

Os logs trabalham de maneira **hierárquica**. Portanto, cada *logger* criado sempre herdará as configurações do
*logger* pai. Essa hierarquia pode seguir a regra de como utilizamos os pacotes de classes. Desta forma
poderemos definir regras específicas para cada pacote, e ativação. 

Há várias bibliotecas de *logging* no mercado. Porém a nossa ferramenta **Fusion** já possui uma API de Logs
incluída no projeto, então basta utilizarmos.
 
 
## 1- Tabela de Implementação

Segue abaixo uma tabela das versões do Fusion e quais logs devemos usar:
 
  Fusion | API de Logs | Implementação |
 ---------------|-------------|---------------|
 3.2.3.x|Apache Log e LogFactory|private static final Log log = LogFactory.getLog(**NomeDaClasse**.class);
 3.3.x +|slf4j com Logger e LoggerFactory|private static final Logger log = LoggerFactory.getLogger(**NomeDaClasse**.class);

## 2- Começando a utilizar

Agora que sabemos que existe uma API de logs no sistema, devemos saber utiliza-la.
Para o correto funcionamento precisamos:
 
* Incluir os *imports* no nosso fonte;
* Definir uma váriavel para utilizar;
* Implementar.

Essa váriavel por sua vez é do tipo *private* para outras classes não utilizar, *static* para existir apenas
uma instância dela por classe e *final* pois não será alterada. Dessa forma ele vai nomear esse log
com o *full qualified name* da classe. 


### 2.1- Versão 3.2.3.x

Incluir os imports necessários:

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
```

Definir uma váriavel no fonte:

```java
private static final Log log = LogFactory.getLog(**NomeDaClasse**.class);
```

*Obs: Perceba que precisamos alterar o **NomeDaClasse.class** para o nome correto.

### 2.2- Versão 3.3.x +

Incluir os imports necessários:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
```

Definir uma váriavel no fonte:

```java
private static final Logger log = LoggerFactory.getLogger(**NomeDaClasse**.class);
```

*Obs: Perceba que precisamos alterar o **NomeDaClasse.class** para o nome correto.

### 2.3- Implementação

Na implementação é a mesma para as duas APIs de Logs, apenas devemos utiliza-las nos locais corretos.

Segue abaixo o exemplo de fonte: 

```java
package com.neomind.fusion.workflow.adapter;

import com.neomind.fusion.entity.EntityWrapper;
import com.neomind.fusion.workflow.Activity;
import com.neomind.fusion.workflow.Task;
import com.neomind.fusion.workflow.adapter.AdapterInterface;

/**
 * Adapter vazio para definir os pontos da modelagem que incluem adapter.
 */
public class AdapterVazio implements AdapterInterface
{
    
	@Override
	public void start(Task task, EntityWrapper wrapper, Activity activity)
	{
		String className = this.getClass().getSimpleName();
        log.info("Finalizando Adapter " + className);
	}
	
	@Override
    public void back(EntityWrapper wrapper, Activity activity)
    {
    }
}

```

Perceba que foi incluído apenas um **log.info()**, implementação semelhante ao *System.out.println*.
Porém temos níveis de logs, que será explicado a seguir.

## 3- Níveis de logs - Tabela

Há diversos níveis de log disponíveis, inclusive a possibilidade de se criar os próprios níveis
(o que não é muito recomendado). Os que vem por padrão são:

Nível | Descrição | 
------|-----------|
TRACE|Informações de rastreio apresentando o progresso do *software*
DEBUG|Evento significativo que pode afetar o estado do servidor ou recursos
INFO|Informações significativas
WARN|Erro potencial ou erro iminente
ERROR|Tarefa não pode continuar, mas o componente ainda pode funcionar
FATAL|Tarefa não pode continuar e o componente não pode funcionar
ALL|Todos os eventos são registrados. Se você criar níveis customizados, serão todos inclusos e pode fornecer um rastreio mais detalhado.

A ideia é representar mensagens de log da menor gravidade para a maior gravidade.
Há métodos de *logging* para cada um desses níveis.

### 3.1- Exemplo de Níveis

Agora que sabemos usar os logs em seus vários níveis. Segue um exemplo prático:

```java
package com.neomind.fusion.workflow.adapter;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.neomind.fusion.persist.PersistEngine;
import com.neomind.fusion.persist.QLRawFilter;
import com.neomind.fusion.common.NeoObject;
import com.neomind.fusion.security.NeoUser;
import com.neomind.fusion.security.SecurityEntity;
import com.neomind.fusion.entity.EntityWrapper;
import com.neomind.fusion.workflow.Activity;
import com.neomind.fusion.workflow.Task;
import com.neomind.fusion.workflow.adapter.AdapterInterface;
import com.neomind.fusion.workflow.exception.WorkflowException;
import com.neomind.util.NeoUtils;

/**
 * Adiciona assinatura do usuário no documento
 *
 * @author christian.tusset
 */
public class AssinaturaAdapter implements AdapterInterface
{

	private static final Logger log = LoggerFactory.getLogger(AssinaturaAdapter.class);

	@Override
	public void start(Task task, EntityWrapper processEntity, Activity activity)
	{
	    String className = this.getClass().getSimpleName();
		log.info("Iniciando Adapter " + className);
		
		try
        {
            String textoPrincipal = processEntity.findGenericValue("documentoPrinc");
            gerarPDFsAssinados(processEntity, textoPrincipal);
    
            List<SecurityEntity> leitores = new ArrayList<SecurityEntity>();
            SecurityEntity papelAdm = PersistEngine.getNeoObject(SecurityEntity.class, new QLRawFilter(
                    "code like 'papelAdm'"));
            
            log.debug("papelAdm = " + papelAdm);
            
            SecurityEntity setorDocumentacaoAutor = processEntity.findGenericValue("setorDocumentacaoAutor");
            log.debug("setorDocumentacaoAutor = " + setorDocumentacaoAutor);
            
            if (papelAdm != null && !leitores.contains(papelAdm))
                leitores.add(papelAdm);
            
            if (setorDocumentacaoAutor != null && !leitores.contains(setorDocumentacaoAutor))
                leitores.add(setorDocumentacaoAutor);
        }
        catch (Exception ex)
        {
            log.error(ex.getMessage(), ex);
            throw new WorkflowException("Erro na execução do adapter: "  + className);
        }

		log.info("Finalizando Adapter " + className);
	}
}
```

Notamos que: Temos um **log.info()** para demonstrar uma informação andamento, um **log.debug()** gerando um log
relevante para execução do nosso *software* e um **log.error()** implementado junto com um bloco try-catch para 
melhor uso da API.

## 4- Logs padrão

No Fusion, pelo fato dos logs usarem níveis hierarquicos, alguns logs por padrão **sempre exibem**:

Estes logs por sua vez são:

* INFO
* ERROR 

Caso se trate de um log diferente é necessário habilita-lo, explicado no tópico a seguir.

## 5- Habilitar logs

Quando temos níveis de logs diferentes dos habilitados por padrão na ferramenta, precisamos habilita-los para que sejam
exibidos nos logs do sistema.

Para habilita-los no Fusion basta acessar a URL: **adm/log.jsp**

Exemplo: [http://localhost:8080/fusion/adm/log.jsp](http://localhost:8080/fusion/adm/log.jsp)

Será exibido diversar configurações sobre os logs que poderão ser habilitadas ou desabilitadas.
