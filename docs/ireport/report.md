# Gerando Relatório

Para criar um relatório através de um adapter. Você irá precisar de um VO (*Value Object*) e de uma função responsável por gerar o relatório com as informações.
 
## Objeto de dados (VO)
 
O VO consistem em uma classe java com os atributos privados e métodos getters e setters que representa todas as informações contidas no relatório. O nome dos atributos no VO devem ser os mesmos nomes dos atributos P e F cadastrados no IReport. 
 Um exemplo de VO seria:
  ```
  public class NotaFiscalCompartilhadaVO
  {
   	private String CNPJ = "";
  	private List<ItensNotaFiscalCompartilhadaVO> itens = new ArrayList<>();
  	
  	public List<ItensNotaFiscalCompartilhadaVO> getItens()
  	{
  		return itens;
  	}
   	public void setItens(List<ItensNotaFiscalCompartilhadaVO> itens)
  	{
  		this.itens = itens;
  	}
   	public String getCNPJ()
  	{
  		return CNPJ;
  	}
   	public void setCNPJ(String CNPJ)
  	{
  		this.CNPJ = CNPJ;
  	}
  }
  ```
  
  Se seu relatório tiver lista de itens dinâmicos o VO principal deverá ter uma lista de um outro VO com as informações de cada item da lista dinâmica. 
  Assim como o exemplo do código acima. 
  
## Criando função que gera o relatório  

  No adapter você irá criar o objeto VO, pegar as informações do processo e seta-las dentro do objeto para depois chamar a função que irá gerar o relatório  e armazenar em um NeoFile. 
  
  A função responsável por gerar o VO realiza as etapas de: 
  
  1. Cria um NeoFile pra salvar o relatório;
  2. A biblioteca  JRBeanCollectionDataSource é utilizada para criar a collection de itens que será a lista de itens do ireport que possuem atributo F. 
  
!!! warning 
    Se o seu relatório não possui lista de itens, o JRBeanCollectionDataSource NÃO pode ser removido. Se o JRBeanCollectionDataSource for removido o relatório é gerado em branco. Adicione uma lista com um elemento qualquer ao invés da lista de itens nesse caso.  
  
  ```
  List<ItensNotaFiscalCompartilhadaVO> itens = VO.getItens();
  JRDataSource jrds = new JRBeanCollectionDataSource(itens);
  ```
  3. O HashMap é utilizado para passar as informações dos parâmetros criados no relatório que possuem atributo P. 
  ```
  HashMap<String, Object> params = new HashMap<String, Object>();
  
  params.put("CNPJ", VO.getCNPJ());
  params.put("data", VO.getData());
  params.put("hora", VO.getHora());
  
  params.put("path", PortalUtil.getCurrentSession().getServletContext().getRealPath("custom/imagens/") + "logo.png");
  ```
  4. Importa o relatório compilado (.jasper) para o código
  ```
  InputStream is = new BufferedInputStream(new FileInputStream((pathNovo + "NFcompartillhada.jasper")));
  ```
  5. Cria o relatório passando o HashMap (params) e a lista de itens (jrds), e exporta para o NeoFile criado anteriormente
  ```
  impressao = JasperFillManager.fillReport(is, params, jrds);
  JasperExportManager.exportReportToPdfFile(impressao, arquivoPDF.getAbsolutePath());
  ```

O código completo para consulta você encontra [aqui](https://gitlab.neomind.com.br/neomind-servicos/utils/ireport/lista-de-itens).