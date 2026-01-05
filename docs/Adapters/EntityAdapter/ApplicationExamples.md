# Exemplos reais de aplicação

## 1. Validando alteração de texto

Verifica se o texto do "trechoModeloTR" é diferente do texto do campo "clausula", podendo saber se em algum momento foi alterado seu conteúdo do cmapo. Com isso o adapter seta um
valor (true/false) no campo "clausulaAltera" conforme a lógica.

```java
package com.neomind.fusion.custom.sebrae.entityAdapter;

import java.util.Map;

import com.neomind.fusion.common.NeoObject;
import com.neomind.fusion.eform.EForm;
import com.neomind.fusion.entity.EntityAdapter;
import com.neomind.fusion.entity.EntityWrapper;
import org.jsoup.Jsoup;

public class SebraeValidarTrechoTR implements EntityAdapter
{

	@Override
	public void run(Map<String, Object> arg0)
	{
		EForm eform = (EForm) arg0.get(EntityAdapter.EFORM);

		NeoObject tr = eform.getObject();
		EntityWrapper wTR = new EntityWrapper(tr);

		String trechoModeloTR = wTR.findGenericValue("modelo.trecho");

		String clausula = wTR.findGenericValue("clausula");

		if (trechoModeloTR == null || !Jsoup.parse(trechoModeloTR).text().equalsIgnoreCase(Jsoup.parse(clausula).text()))
		{
			wTR.setValue("clausulaAlterada", true);
		}
		else
		{
			wTR.setValue("clausulaAlterada", false);
		}
	}
}
```

## 2. Valida se deve permitir edição do campo

Nesse adapter é verificado se o campo *"itemView"* (view de entidade externa) do formulário possui descrição. Se possui descrição é inserido o valor *true* no campo "permite".

```java
package com.neomind.fusion.custom.sebrae.entityAdapter;

import java.util.Map;

import com.neomind.fusion.common.NeoObject;
import com.neomind.fusion.eform.EForm;
import com.neomind.fusion.entity.EntityAdapter;
import com.neomind.fusion.entity.EntityWrapper;
import com.neomind.fusion.persist.PersistEngine;

public class SebraeGravarDescricaoItem implements EntityAdapter
{

	@Override
	public void run(Map<String, Object> arg0)
	{
		EForm eform = (EForm) arg0.get(EntityAdapter.EFORM);

		NeoObject item = (NeoObject) eform.findField("itemView").getValue();
		EntityWrapper wItem = new EntityWrapper(item);

		String descricao = wItem.findGenericValue("descricao");

		NeoObject obj = eform.getObject();
		EntityWrapper wObj = new EntityWrapper(obj);

		if (descricao != null && descricao.trim() != null && descricao.trim().length() > 0)
		{
			wObj.setValue("objeto", descricao);
			wObj.setValue("permiteAlterar", false);
			PersistEngine.persist(obj);
		}
		else
		{
			wObj.setValue("permiteAlterar", true);
		}
	}
}
```

## 3. Salva lote caso não esteja salvo

Neste exemplo é utilizado para verificar se o NeoObject (lote) do formulário está persistido.

Para saber se o objeto está persistido no banco, é verificado se o neoId é > 0.

Se o neoId for maior que 0 retorna sem executar nenhuma ação:

```java
    if(lote.getNeoId() > 0)
	return;
```

Se o neoId não for maior que 0, o objeto lote é persistido:

```java
    PersistEngine.persist(lote);
```

Obtem o "formulario pai" (formulario superior dele):

```java
    NeoObject item = eform.getCaller().getObject();
    EntityWrapper witem = new EntityWrapper(item);
```

Adiciona o objeto salvo no campo correspondente no objeto pai:

```java
            List<NeoObject> lotesItem = witem.findGenericValue("lotes");
    		lotesItem.add(lote);
    		witem.setValue("lotes",lotesItem);
```

Codigo fonte completo da classe:

```java
package com.neomind.fusion.custom.sebrae.entityAdapter;

import java.util.List;
import java.util.Map;

import com.neomind.fusion.common.NeoObject;
import com.neomind.fusion.eform.EForm;
import com.neomind.fusion.entity.EntityAdapter;
import com.neomind.fusion.entity.EntityWrapper;
import com.neomind.fusion.persist.PersistEngine;

public class SebraeSalvarLoteItem implements EntityAdapter
{

	@Override
	public void run(Map<String, Object> arg0)
	{
		EForm eform = (EForm) arg0.get(EntityAdapter.EFORM);

		NeoObject lote = eform.getObject();
		if (lote.getNeoId() > 0) return;

		PersistEngine.persist(lote);

		NeoObject item = eform.getCaller().getObject();
		EntityWrapper witem = new EntityWrapper(item);

		List<NeoObject> lotesItem = witem.findGenericValue("lotes");
		lotesItem.add(lote);

		witem.setValue("lotes", lotesItem);

		PersistEngine.persist(item);
	}
}
```