# Como Usar os Adapters de Formulário

Os *Entity Adapters* são feitos com classes Java que implementam a interface EntityAdapter. 

## 1. Onde encontrar o caminho da classe Java

- No Eclipse seleciona o nome da classe, clique com o botao direito e vá em **Copy Qualified Name**.

![Como obter caminho Java no Eclipse](./imgs/caminhoJavaEclipse.png "Como obter caminho Java no Eclipse")

*Como obter caminho Java no Eclipse.*

- No IntelliJ seleciona o nome da classe, clique com o botao direito e vá em **Copy reference**.

![Como obter caminho Java no IntelliJ](./imgs/caminhoJavaIntelliJ.png "Como obter caminho Java no IntelliJ")
*Como obter caminho Java no IntelliJ.*

## 2. Parâmetros do Adapter

EntityAdapter é uma interface e por isso devemos implementar seu métodos. Nesse caso a interface possui apenas um, o método **run()**. 

Este método tem como parâmetro um objeto **Map**. Esse objeto mapeia valores para chaves, ou seja, através da chave consegue ser acessado o valor.

Para obter esse formulário do *Map* pode ser feito de duas maneiras, ambas retornam um objeto do tipo **EForm** (com.neomind.fusion.eform.EForm).

- Utilizando a variável da própria classe:
```java
package com.neomind.fusion.workflow.adapter;

import com.neomind.fusion.eform.EForm;
import com.neomind.fusion.entity.EntityAdapter;
import java.util.Map;

public class ExemploEntityAdapter implements EntityAdapter
{
	@Override
	public void run(Map<String, Object> map)
	{
		EForm formulario = (EForm) map.get(EFORM);
	}
}
```

- Escrevendo a chave do formulário:
```java
package com.neomind.fusion.workflow.adapter;

import com.neomind.fusion.eform.EForm;
import com.neomind.fusion.entity.EntityAdapter;
import java.util.Map;

public class ExemploEntityAdapter implements EntityAdapter
{
	@Override
	public void run(Map<String, Object> map)
	{
		EForm formulario = (EForm) map.get("eform");
	}
}
```
## 3. Implementação Simples

Para uma implementação simples, basta apenas saber em qual formulário deseja criar o Adapter, criar uma classe java no diretório desejado e implementar a interface **EntityAdapter**, conforme abaixo.

```java
package com.neomind.fusion.workflow.adapter;

import com.neomind.fusion.common.NeoObject;
import com.neomind.fusion.eform.EForm;
import com.neomind.fusion.entity.EntityAdapter;
import com.neomind.fusion.entity.EntityWrapper;
import java.util.Map;

public class ExeploEntityAdapter implements EntityAdapter
{
	@Override
	public void run(Map<String, Object> map)
	{
		EForm formulario = (EForm) map.get("eform");

		NeoObject noFormulario = formulario.getObject();

		EntityWrapper ewFormulario = new EntityWrapper(noFormulario);

		ewFormulario.findField("implementacaoSimples").setValue(true);
	}
}
```

No adapter criado acima temos um exemplo de uma implementação simples, onde foi pego o EForm do map *((EForm) map.get("eform"))*, o NeoObject do formulario *(formulario.getObject();)* e criado um Entity Wrapper do objeto *(new EntityWrapper(noFormulario);)*.

Com o *wrapper* foi possível acessar o campo *(ewFormulario.findField("implementacaoSimples"))* e inserir um valor *(.setValue(true);)*.
