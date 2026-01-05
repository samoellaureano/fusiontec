# 📋 Documentação de Regras do Processo de Lançamento de Medição no SIENGE

## 🧭 Visão Geral do Processo

O processo de medição está sujeito a validações lógicas baseadas no seu estado atual, pausas, processos de rescisão e ultima medição. Este documento descreve as regras de negócios envolvidas no lançamento de medições e o fluxo de atividades.

---

## 🔄 Fluxo de Atividades

1. **Registrar Medição no SIENGE** – Início do processo de medição.
2. **Conferir Pausa da Medição (Leader do Projeto)** – Segunda etapa, realizada quando há dúvidas ou necessidade de pausa.
3. **Analisar Pausa das Medições do Contrato (Gerente da Engenharia)** – Terceira pausa consecutiva ou superior, redireciona para o gerente.

    - Se **"Sanar Dúvida com o Leader"**: vai para `Justificativa de Pausa (Leader)`
    - Se **"Determinação para Seguir com Valor Baixo"**: segue para `Determinação para Seguir mesmo com Valor Baixo (ADM Projeto)`

4. **Justificativa de Pausa (Leader)** – Atividade respondida pelo líder e retorna para o gerente.
5. **Determinação para Seguir mesmo com Valor Baixo (ADM do Projeto)** – ADM define se é a última medição e segue o processo.
6. **Tomar Ciência de Determinação de Encerramento de Contrato (ADM do Projeto)** – Caso a determinação do gerente seja para rescisão, essa atividade abre o subprocesso de rescisão contratual.

---

## 🧠 Regras de Validação

### 1. Lançamento de Medição Incremental

- Enquanto **não houver pausa registrada**, é possível lançar novas medições incrementais (1 → 2 → 3...).
- Cada novo lançamento incrementa o número da medição.

### 2. Pausa da Medição

- Ao avançar para a **atividade de conferência de pausa**, é criado automaticamente um registro de pausa.
- Após a **criação da pausa**, não é mais possível lançar novas medições: retorna erro indicando "medição em andamento".

### 3. Liberação de Pausa

- Caso o processo siga pela opção de **Determinação para Seguir com Valor Baixo** ou pela atividade de **Registrar Medição no SIENGE**, a pausa é considerada **liberada** (script marca como executado).
- A partir disso, novas medições incrementais podem ser lançadas.

### 4. Rescisão de Contrato

- Caso o processo siga para **Determinação de Encerramento**, um processo de rescisão é aberto.
- **Nenhuma nova medição poderá ser aberta** enquanto existir uma rescisão em andamento.
- Se a rescisão for **cancelada**, o processo de medição relacionado também é cancelado.
    - O próximo lançamento de medição voltará para o **último número não concluído** (ex: se estava na 1 pausada, continua na 1).

### 5. Última Medição

- Se uma medição for marcada como **última medição** no preenchimento do ADM do projeto:
    - Nenhuma nova medição incremental poderá ser aberta.
    - Isso é validado antes da criação de um novo processo.

---

## ⚠️ Observações Finais

- Todo o controle de bloqueio e liberação de medição ocorre via **registro de pausa** e **status da última medição**.
- As transições entre atividades são determinantes para as ações do script de backend.
- As regras garantem que não existam múltiplas medições em andamento, pausas não tratadas ou rescisões paralelas conflitantes.

---

## 🏁 Exemplo de Caminho Completo

1. Registrar Medição no SIENGE → 
2. Conferir Pausa da Medição (Leader) →  
3. Analisar Pausa das Medições (Gerente) →  
  a. Sanar Dúvida → Justificativa de Pausa (Leader) → volta para Gerente  
  b. Determinação para Seguir com Valor Baixo → ADM define se é a última medição → Medição segue  
  c. Determinação de Encerramento → Tomar Ciência → Gera subprocesso de Rescisão

---

## ✅ Exemplos de Cenários

### Cenário 1: Medição contínua sem pausa
- Medição 1 lançada.
- Atividade "Registrar Medição no SIENGE" concluída.
- Nenhuma pausa registrada.
- Ultima medição do contrato "Não".
- Próxima medição (Medição 2) pode ser lançada normalmente.

### Cenário 2: Pausa registrada antes de nova medição
- Medição 2 lançada.
- Atividade "Conferir Pausa da Medição" com o Leader do Projeto.
- Registro de pausa criado.
- Nova medição registrada será a Medição 2, mas bloqueada para novas medições até a pausa ser resolvida.

### Cenário 3: Três pausas no contrato
- Pausa 1 e 2 avançadas normalmente.
- Na terceira pausa, atividade "Analisar Pausa das Medições do Contrato" com o Gerente da Engenharia é acionada.
- Caso a pausa seja mantida, o processo é bloqueado para novas medições.

### Cenário 4: Rescisão iniciada após pausa
- Pausa gerada e analisada pelo Gerente da Engenharia.
- Atividade "Tomar Ciência de Determinação de Encerramento de Contrato" com ADM do Projeto concluída.
- Script de backend libera qualquer pausa existente e redireciona o processo para o subprocesso de rescisão contratual.
- Processo de rescisão iniciado.
- O motivo da rescisão é registrado como **"Determinação da SCALLE"**.
- Novas medições são bloqueadas. Sistema retorna erro: "Rescisão em andamento para este contrato."

### Cenário 5: Liberação de pausa por valor baixo
- Medição 2 lançada.
- Durante a análise da pausa, gerente define "Determinação para Seguir com Valor Baixo".
- Atividade com ADM do Projeto executa a liberação da pausa.
- Medição 3 é registrada na atividade "Registrar Medição no SIENGE".

### Cenário 6: Rescisão Tardia
- A atividade "Registrar Medição no SIENGE" foi avançada sem ser ultima medição e como motivo de não registro da rescisão: Intervenção finalizada.
- Script de backend libera qualquer pausa existente e redireciona o processo para o subprocesso de rescisão contratual.
- O motivo da rescisão é marcado como **"Rescisão Tardia"**.
- Nenhuma nova medição poderá ser criada enquanto a rescisão estiver ativa.

---

