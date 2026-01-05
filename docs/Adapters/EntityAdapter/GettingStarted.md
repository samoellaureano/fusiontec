# Criando a classe java de customização
 - Package:
     - Antes de criar uma classe Java deve-se ter em mente em qual *package* será melhor por questões de organização.
     - Os Adapters geralmente são criados dentro do diretório "com.neomind.fusion.workflow.adapter".
     - Por questão de boas práticas seria interessante criar um novo *package* dentro desse diretório que seja relacionado ao Entity Adapter desenvolvido.

## 1. Onde configurar um EntityAdapter no Fusion

Para configurar um EntityAdapter no Fusion, abra as configurações do formulário em **Formulários - Configurar -  Dinâmicos** selecione o formulário que deseja colocar o adapter de customização.

Com o formulário aberto, insira o caminho da classe Java criada no campo **Adapter de Customização**.

![alt text](./imgs/adapter-custom.png "Campo de inserção do caminho da classe Java")

*Retângulo em vermelho identificando onde deve ser inserido o caminho da classe java.*

Para inserir uma classe java de customização precisa saber o *package* e o nome da classe, por exemplo **com.neomind.fusion.workflow.adapter.entityAdapter.nomeClasseJava**. 

- Para obter o nome do *package* e o nome completo da classe: 
    - No Eclipse seleciona o nome da classe, clique com o botao direito e vá em **Copy Qualified Name**.

        ![alt text](./imgs/copy-qualified-name.png "Como obter caminho java no Eclipse")

        *Como obter caminho java no Eclipse.*
        
    - No IntelliJ seleciona o nome da classe, clique com o botao direito e vá em **Copy reference**.

        ![alt text](./imgs/copy-reference.png "Como obter caminho java no IntelliJ")

        *Como obter caminho java no IntelliJ.*
        
## 2. Parâmetros do Adapter

Ao implementar uma interface EntityAdapter temos somente o método **run()** que possui apenas um parâmetro, um **map** que é do tipo **Map<String, Object>**.

Nesse **map** contem o formulário que é utilizado para fazer a customização necessária.

Para obter esse formulário do *map* pode ser feito de duas maneiras, ambas retornam um objeto do tipo **EForm** (com.neomind.fusion.eform.EForm).

- Utilizando a variável da própria classe:
```java
package com.neomind.fusion.workflow.adapter;

import com.neomind.fusion.eform.EForm;
import com.neomind.fusion.entity.EntityAdapter;
import java.util.Map;

public class ExeploEntityAdapter implements EntityAdapter
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

public class ExeploEntityAdapter implements EntityAdapter
{
	@Override
	public void run(Map<String, Object> map)
	{
		EForm formulario = (EForm) map.get("eform");
	}
}
```

## 3. Implementação simples

Para uma implementação simples, basta apenas saber em qual formulário deseja criar o Adapter, criar uma classe java no diretório desejado e implementar a interface **EntityAdapter**, dar **@Override** no método **run()** conforme o fonte abaixo.

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

No adapter criado a cima temos um exemplo de uma implementação simples, onde foi pego o EForm do map *((EForm) map.get("eform"))*, o NeoObject do formulario *(formulario.getObject();)* e criado um Entity Wrapper do objeto *(new EntityWrapper(noFormulario);)*.
Com o *wrapper* foi possível acessar o campo *(ewFormulario.findField("implementacaoSimples"))* e inserir um valor *(.setValue(true);)*.