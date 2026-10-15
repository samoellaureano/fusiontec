## Validação de arquivos de anexo

Através do EntityWrapper este adapter procura a lista de Anexos, e faz algumas validações:

- Valida se a lista está vazia ou `null`
- Verifica se na lista possui alguma documento com o tipo de codigo 1.

E se não possui uma nota fiscal ele não deixa a atividade avançar.

```java
public class ValidaArquivoAnexo implements AdapterInterface {

	@Override
	public void back(EntityWrapper wrapper, Activity activity) {
	}

	@Override
	public void start(Task task, EntityWrapper processEntity, Activity activity) {
	
		List\<NeoObject\> listaAnexos = processEntity.findGenericValue("docsAnexos");
		boolean semNota = true;
		boolean necesarioDoc = true;
		
		if (NeoUtils.safeIsNull(listaAnexos) || listaAnexos.size() == 0) {
			throw new WorkflowException("É necessário informar pelo menos uma nota fiscal para avançar!");
		}
		
		for (NeoObject o : listaAnexos) {
			
			EntityWrapper ewAnexo = new EntityWrapper(o);

			//1 = NF (Nota Fiscal)
			Long tipo = ewAnexo.findGenericValue("TipoDocumento.CodDocumento");
			
			if (tipo == 1L) {
				necesarioDoc = false;
				semNota = false;
			}
		}
		
		if (semNota || necesarioDoc) {
			throw new WorkflowException("É necessário informar pelo menos uma nota fiscal para avançar!");
		}
	}
}
```

## Expedição de  Documentos

Este exemplo inicia uma expedição de documento, para uma lista de Destinatarios selecionados.

```java
public class AdapterIniciaExpedicao implements AdapterInterface
{
	@Override
	public void start(Task task, EntityWrapper wrapper, Activity activity)
	{
		wrapper.setValue("autorExped", PortalUtil.getCurrentUser());
		
		List\<NeoObject\> selecDestinatarios = wrapper.findGenericValue("selecDestinatarios");

		List\<NeoObject\> listaDestinatarios = wrapper.findGenericValue("listaDestinatarios");

		for (NeoObject uDestinatario : selecDestinatarios)
		{
			NeoObject oNovoDest = AdapterUtils.createNewEntityInstance("listaDestinatarios");

			EntityWrapper wNovoDest = new EntityWrapper(oNovoDest);

			wNovoDest.findField("destinatario").setValue(uDestinatario);

			PersistEngine.persist(oNovoDest);

			listaDestinatarios.add(oNovoDest);
		}

		wrapper.findField("listaDestinatarios").setValue(listaDestinatarios);

		NeoObject tramitarCorrespondenciaInterna = wrapper.findGenericValue("tramitarCorrespondenciaInterna");

		if (tramitarCorrespondenciaInterna != null)
		{
			String titulo = wrapper.findGenericValue("tramitarCorrespondenciaInterna.titulo");
			String resAssunto = wrapper.findGenericValue("tramitarCorrespondenciaInterna.resAssunot");
			NeoObject classificacao = wrapper.findGenericValue("tramitarCorrespondenciaInterna.categProgAtiv");

			wrapper.findField("tituloBreve").setValue(titulo);
			wrapper.findField("resumoAssunto").setValue(resAssunto);
			wrapper.findField("categorias").setValue(classificacao);
		}
	}

	@Override
	public void back(EntityWrapper wrapper, Activity activity)
	{
		
	}

}
```

## Enviar E-mail Customizado com Anexo

Este exemplo procura informações no formulário e anexa um arquivo no e-mail.

```java
public class AdapterEnviaEmailComAnexos implements AdapterInterface {

	@Override
	public void start(Task task, EntityWrapper wrapper, Activity task) {

		String title = Orcamento.ASSUNTO;
		String texto = wrapper.findGenericValue("resposta");
		
		NeoUser solicitante = wrapper.findGenericValue("solicitante");
		
		List<NeoUser> listUsuarios = new ArrayList<NeoUser>();
		listUsuarios.add(solicitante);
		
		String anexos = "anexos";
		String anexo = "anexo";
		
		CustomSendMailUtils.SendMail(wrapper, listUsuarios, title, texto, anexos, anexo);
	}

	@Override
	public void back(EntityWrapper wrapper, Activity task) {
		
	}

}
```

## Retorna Negociação via Procedure

Adapter que retorna o status de negociação (liberada ou recusada) passando retorno para uma procedure com as seguintes informações:

RETORNO_WORKFLOW(COD_FILIAL, COD_VENDEDOR, CTRL_NEG, 'L' OU 'R')


```java
/**
 * @author christian.tusset
 */
public class RetornaNegociacaoAdapter implements AdapterInterface
{

	private static final Logger log = LoggerFactory.getLogger(RetornaNegociacaoAdapter.class);


	@Override
	public void start(Task task, EntityWrapper wrapper, Activity activity)
	{
		String className = this.getClass().getSimpleName();
		log.info("Iniciando Adapter " + className);

		BigDecimal ctrlNeg = wrapper.findGenericValue("ctrlneg");
		BigDecimal codFilial = wrapper.findGenericValue("codfilial");
		BigDecimal codVendedor = wrapper.findGenericValue("codvendedor");

		if (log.isDebugEnabled())
		{
			log.debug("Controle da Negociação (ctrlneg): " + ctrlNeg);
			log.debug("Código da Filial (codfilial): " + codFilial);
			log.debug("Código do Vendedor (codVendedor) : " + codVendedor);
		}

		if (ctrlNeg == null || codFilial == null || codVendedor == null)
		{
			String msg = "Erro ao executar adapter " + className + ".\nCódigo da Filial"
				+ " (<b>codfilial</b>), Controle da Negociação (<b>ctrlneg</b>) ou"
				+ " Código do Vendedor (<b>codvendedor</b>) esta(ão) vazio(s)."
				+ "\nFavor entrar em contato com o Administrador do Processo.";
			log.error(msg);
			throw new WorkflowException(msg);
		}

		String aprovado = null;

		Boolean aprovadoGerente = wrapper.findGenericValue("aprovadogerente");
		Boolean aprovadoRegional = wrapper.findGenericValue("aprovadoregional");
		Boolean aprovadoDiretor = wrapper.findGenericValue("aprovadodiretor");
		Boolean aprovadoComite = wrapper.findGenericValue("aprovadocomite");

		BigDecimal desconto = wrapper.findGenericValue("desconto");
		BigDecimal valorFinalvendedor = wrapper.findGenericValue("valorfinalvendedor");

		if (desconto.compareTo(valorFinalvendedor) >= 0 && aprovadoGerente == null)
		{
			aprovado = "L";
		}
		else if (aprovadoGerente != null && aprovadoGerente && aprovadoRegional == null)
		{
			aprovado = "L";
		}
		else if (aprovadoGerente != null && !aprovadoGerente && aprovadoRegional == null)
		{
			aprovado = "R";
		}
		else if (aprovadoRegional != null && aprovadoRegional && aprovadoDiretor == null)
		{
			aprovado = "L";
		}
		else if (aprovadoRegional != null && !aprovadoRegional && aprovadoDiretor == null)
		{
			aprovado = "R";
		}
		else if (aprovadoDiretor != null && aprovadoDiretor && aprovadoComite == null)
		{
			aprovado = "L";
		}
		else if (aprovadoDiretor != null && !aprovadoDiretor && aprovadoComite == null)
		{
			aprovado = "R";
		}
		else if (aprovadoComite != null && aprovadoComite)
		{
			aprovado = "L";
		}
		else if (aprovadoComite != null && !aprovadoComite)
		{
			aprovado = "R";
		}

		if (log.isDebugEnabled())
		{
			log.debug("Desconto: " + desconto);
			log.debug("Valor Final Vendedor: " + valorFinalvendedor);
			log.debug("Aprovado Gerente? " + aprovadoGerente);
			log.debug("Aprovado Regional? " + aprovadoRegional);
			log.debug("Aprovado Diretor? " + aprovadoDiretor);
			log.debug("Aprovado Comitê? " + aprovadoComite);
		}

		EntityManagerImpl impl = (EntityManagerImpl) PersistEngine.getEntityManager("Siagri BASE1");
		SessionImpl session = (SessionImpl) impl.getSession();
		Connection conn = session.connection();

		CallableStatement cs;
		try
		{
			cs = conn.prepareCall("{call retorno_workflow(?,?,?,?)}");

			cs.setInt(1, codFilial.intValue());
			cs.setInt(2, ctrlNeg.intValue());
			cs.setInt(3, codVendedor.intValue());
			cs.setString(4, aprovado);

			cs.execute();

			cs.close();
		}
		catch (SQLException e)
		{
			log.error("Erro na execução da procedure Oracle. " + e.getMessage(), e);
		}

		log.info("Finalizando Adapter " + className);
	}

	@Override
	public void back(EntityWrapper entityWrapper, Activity activity)
	{
	}

}
```



