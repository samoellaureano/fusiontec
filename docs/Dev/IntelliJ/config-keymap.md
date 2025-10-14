# 3. Configurando Keymap e Indentação no IntelliJ IDEA

A seguir veremos como padronizar o **mapeamento de atalhos (Keymap)** e a **indentação de código** utilizados pela **Neomind**.  
Essas configurações ajudam a manter consistência entre os desenvolvedores e facilitam a colaboração.

---

## 🎹 Keymap

O primeiro passo é ajustar o **mapeamento de teclas** (atalhos) para o padrão utilizado pela equipe.

1. Com qualquer projeto aberto, vá até o menu **File → Settings**.

   ![settings](images/ImagemSettingsIntellij.png)

2. Na janela que se abrir, localize no canto superior esquerdo o campo de busca com uma **lupa** e digite **Keymap**.  
   Selecione a opção exibida.

   ![search-settings-keymap](images/keyMapSearchSettings.png)

3. Verifique qual **Keymap** está sendo utilizado (ex: Windows, NetBeans, Visual Studio, etc).  
   Caso **não seja o Eclipse**, clique na caixa de seleção, escolha **Eclipse**, e depois clique em **Apply**.

   ![select-option-keymap-eclipse](images/keyMapSetEclipseOption.png)

⚠️ **Atenção:**  
A escolha do **Keymap Eclipse** é recomendada, pois a maioria dos desenvolvedores da Neomind utiliza esse padrão.  
Assim, os atalhos permanecem consistentes e o suporte entre colegas é facilitado.

---

## 🧩 Indentação (Code Style)

Agora, vamos configurar o **padrão de formatação de código** da Neomind.

1. Baixe o arquivo XML de configuração clicando [aqui](https://drive.google.com/u/0/uc?id=1FgbLfEhGRtTdXplkEwt58V5gVuMOHAgH&export=download).

2. No IntelliJ, acesse novamente **File → Settings** e pesquise por **Code Style**.

   ![field-search-codestyle](images/codeStyleNeoMind.png)

3. Na tela de configurações de **Code Style**, ao lado de *Schema*, clique nos **três pontinhos (...)** e siga o caminho:

   **Import Scheme → IntelliJ IDEA code style XML**

   ![select-import-schema-codestyle](images/importSchemaCodeStyle.png)

4. Localize e selecione o arquivo XML que você baixou anteriormente.

   ![archive-import-schema](images/selectSchemaOnUploading.png)

5. Uma janela de confirmação será exibida — clique em **OK**.

   ![confirm-import](images/importSchema-confirm.png)

ℹ️ **Informação:**  
Antes de sair, **verifique se o Schema selecionado é o que você acabou de importar!**  

   ![confirm-selected](images/confirm-scheme-selected.png)

6. Por fim, clique em **Apply** e depois em **OK** para salvar as alterações.

---

✅ **Pronto!**  
Seu IntelliJ agora está configurado com o **Keymap Eclipse** e a **indentação padrão Neomind**, garantindo maior produtividade e padronização entre os projetos.