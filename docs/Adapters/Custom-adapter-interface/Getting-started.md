# Como utilizar?

Para utilizar o Adapter de interface, primeiro deverá ser criada uma classe cujo o nome referencie 
o que ela fará e tambem adicionar Adapter no nome da classe afins de padronização, como por exemplo:

Validar documentos ficaria: ValidarDocumentosAdapter

Agora será necessário implementar a interface com a tag implements logo após o nome da classe:

```java
package com.neomind.fusion.workflow.adapter;

public class ValidarDocumentosAdapter implements AdapterInterface
{
}
```

E agora realizar o `@Override` nos métodos:

```java
package com.neomind.fusion.workflow.adapter;

import com.neomind.fusion.entity.EntityWrapper;
import com.neomind.fusion.workflow.Activity;
import com.neomind.fusion.workflow.Task;
import com.neomind.fusion.workflow.adapter.AdapterInterface;

public class ValidarDocumentosAdapter implements AdapterInterface
{

	@Override
	public void start(Task task, EntityWrapper entityWrapper, Activity activity)
	{
		
	}

	@Override
	public void back(EntityWrapper entityWrapper, Activity activity)
	{

	}
}
```


