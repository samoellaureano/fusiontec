# Changelog da Documentação FusionTec

## Data: 05/01/2026

### Resumo das Mudanças

Foi realizada uma integração completa da documentação técnica do FusionTec, expandindo significativamente o conteúdo disponível no repositório.

### Estatísticas

- **Total de arquivos modificados**: 606 arquivos
- **Total de arquivos Markdown**: 85 documentos
- **Linhas adicionadas**: 5.886 linhas de conteúdo

### Novas Seções Adicionadas

#### 1. **Training (Treinamento)**
Módulos completos de treinamento organizados em 7 níveis:
- **Módulo 1**: Adapter Interface, Entity Wrapper, Find Generic Value, FindField/SetValue, Pontos de Customização
- **Módulo 2**: Dump Tree, Entity Wrapper avançado, Neo Objects, Trabalhando com Listas
- **Módulo 3**: Criação de Novos Registros, Formulários e Banco de Dados, Obtenção de Objetos do Banco
- **Módulo 4**: EntityAdapter, Criação de Classes, Operações Importantes
- **Módulo 5**: Converters
- **Módulo 6**: Definições, Criação de Classes, Operações Importantes
- **Módulo 7**: Conteúdo avançado

#### 2. **Standardization (Padronização)**
Documentação de padrões e boas práticas:
- **Clean Code**: Princípios e práticas de código limpo
- **Frontend**: Padrões de desenvolvimento frontend
- **Git**: Convenções e fluxos de trabalho com Git
- **API Logs**: Padrões de logging para APIs

#### 3. **Integrations (Integrações)**
Documentação sobre integrações e APIs:
- **REST**: Especificações REST, RESTEasy, Annotations
- **Models**: Templates de email e outros modelos

#### 4. **iReport**
Documentação sobre criação e configuração de relatórios

#### 5. **Git**
Guias e tutoriais sobre uso do Git no contexto do projeto

#### 6. **Quick Guide**
Guias rápidos com GIFs e imagens para tarefas comuns

#### 7. **Projects**
Documentação sobre estrutura e organização de projetos

#### 8. **Knowledge Base**
Base de conhecimento com soluções e troubleshooting

#### 9. **Workshop Services**
Materiais e documentação de workshops

#### 10. **Content Links**
Links e recursos adicionais organizados

### Seções Atualizadas

#### **Adapters**
Reorganização e expansão da documentação de adapters:
- Checkpoint Adapter
- Custom Adapter Interface
- Entity Adapter

Todos com exemplos de aplicação, guias de início rápido e explicações detalhadas.

#### **Dev (Desenvolvimento)**
Expansão significativa dos guias de desenvolvimento:
- **Baixando Fusion**: Novo guia para download e setup
- **BDA**: Configuração e gerenciamento de banco de dados
- **Eclipse**: Guias completos para desenvolvimento com Eclipse
- **IntelliJ IDEA**: Guias completos para desenvolvimento com IntelliJ
- **Utils**: Classes e utilitários úteis

### Melhorias de Estrutura

- Padronização de nomenclatura (minúsculas para diretórios)
- Remoção de duplicações
- Organização hierárquica melhorada
- Adição de imagens e recursos visuais em todas as seções
- Backup da documentação anterior em `docs_backup/`

### Arquivos de Configuração

- `index.md`: Página inicial atualizada com boas-vindas
- `intro.md`: Introdução mantida do repositório original
- `utils.md`: Documentação de utilitários
- `css/extra.css`: Estilos customizados para a documentação

### Próximos Passos Recomendados

1. Revisar a estrutura de navegação no `sidebars.js` do Docusaurus
2. Testar a build da documentação localmente
3. Fazer push das mudanças para o repositório remoto
4. Configurar CI/CD para deploy automático da documentação
5. Adicionar busca e indexação de conteúdo

### Observações

- A documentação anterior foi preservada em `docs_backup/` para referência
- Todas as imagens e recursos foram mantidos nas respectivas pastas
- A estrutura é compatível com Docusaurus e geração automática de sidebar
