
## 1. Configurando o SQL Server Configuration Manager

Para começar a configuração basta abrir o aplicativo **SQL Server Configuration Manager**, basta procurar esse nome na aba de pesquisa que irá aparecer esse:

![img](IMG/manager/open-manager.png)

Quando você abrir, essa será a tela inicial dele:

![img](IMG/manager/initial-screen.png)

### 1.1 Verificando se está tudo habilitado

#### 1.1.1 Configuração do SQL Native Client

Procure pelo primeiro **Configuração do SQL Native Client**.

Em seguida expanda ele e clique em **Protocolos de cliente**

![img](IMG/failed-login-sa/sql-native-cliente-client-protocols.png)

Verifique se essas 3 opções estão marcadas como **Habilitada(Enabled)**, caso não esteja, clique duas vezes e habilite!

#### 1.1.2 Configuração de Rede do SQL Server

Procure por **Configuração de rede do SQL Server**.

Logo após clique em **Protocolos para SQLSERVER**

![img](IMG/failed-login-sa/protocol-for-sqlexpress-enable.png)

Verifique se essas 3 opções estão marcadas como **Habilitada(Enabled)**, caso não esteja, clique duas vezes e habilite!

#### 1.1.3 Configuração do proximo SQL Native Client

Procure pelo próximo **Configuração do SQL Native Client**. E sim tem dois desse, porém um está mais a cima(Já configuramos) e por fim temos que configurar este também.

Em seguida expanda ele e clique em **Protocolos de cliente**

![img](IMG/failed-login-sa/sql-native-client-11-configuration-client-protocols.png)

Verifique se essas 3 opções estão marcadas como **Habilitada(Enabled)**, caso não esteja, clique duas vezes e habilite!

## 2. Configurando as portas

Precisamos também habilitar e definir algumas portas para o nosso banco funcionar corretamente.

Procure por **Configuração de rede do SQL Server**.

Logo após clique em **Protocolos para SQLSERVER**

E em seguida dê dois cliques em **TCP/IP**, irá abrir um menu para configurarmos.

![img](IMG/failed-login-sa/find-port-properties.png)

Vá até a aba **IP Addresses**.

Veja que temos *IP1, IP2, IP3 e etc...* Cada um desses IP tem o campo **Enabled e TCP Port** que é onde iremos configurar.

Todos que não estiverem Habilitados, habilitem!

E aqueles que estão sem o TCP Port, adicione a porta **1433** que é do Microsoft Sql Server.

![img](IMG/failed-login-sa/ip-adress-enable-ip-port.png)

E bem no fim, teremos um **IPAll**, nesse basta adicionarmos a mesma TCP Port: 1433.

![img](IMG/failed-login-sa/ippal-tcp-port.png)

Clique em **OK** e nosso manager estará configurado corretamente!

### 2.1 Reiniciando o serviço do banco de dados

!!! warning
    Esse passo é fundamental para os próximos passos.

Aperta a tecla do **Windows** e pesquisa por *"Serviços"* no campo de pesquisa, em seguida clique nele.

![img](IMG/servicos.png)

Irá abrir uma tela com diversos serviços, porém precisamos pesquisar pelo serviço do **SQL Server**.

Achando esse serviço clique nele e veja que irá abrir ao lado esquerdo um menu onde tem algumas opções.

Precisamos clicar na opção **Reiniciar**.

![img](IMG/restar-service.png)

Em seguida ele irá reiniciar o serviço e aguarde a inicialização do mesmo para darmos continuidade

[Habilitando o usuário SA](config-bda.md)