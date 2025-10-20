# SecondNature

<p align="center">
  <img src="" width="150">
</p>

<p align="center">
  <strong>Uma ferramenta inteligente e empática para apoiar usuários no controle da compulsão por apostas.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" alt="Status do Projeto">
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?logo=react&logoColor=black" alt="React Native">
  <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black" alt="Firebase">
</p>

---

## 🎯 Sobre o Projeto

O **SecondNature** foi desenvolvido para atuar como uma ferramenta inteligente, empática e acessível para enfrentar o crescente problema da compulsão por apostas no Brasil.

> Nosso principal objetivo é oferecer aos usuários um apoio real e eficaz antes mesmo que o vício se consolide, ajudando-os a reconhecer padrões de comportamento de risco, promovendo a conscientização sobre seus próprios hábitos e oferecendo intervenções suaves, porém impactantes, no momento certo. A meta não é proibir ou punir, mas sim educar, proteger e orientar o usuário para caminhos mais saudáveis e conscientes.

Em um cenário onde casas de apostas utilizam táticas de manipulação psicológica para explorar vulnerabilidades humanas, o SecondNature oferece o contraponto ético e protetor, funcionando como um **escudo cognitivo** para treinar o cérebro a resistir a estímulos viciantes.

Recentemente, a solução passou a contar com **tecnologia de reconhecimento facial com Dlib**, implementada para fins acadêmicos e para aumentar a praticidade e segurança no login do usuário.

## ✨ Principais Funcionalidades

-   🧠 **Monitoramento de Hábitos:** Análise de padrões de comportamento de risco para promover autoconsciência.
-   🔔 **Intervenções Inteligentes:** Notificações e alertas baseados em gatilhos de risco para oferecer suporte no momento certo.
-   📊 **Relatórios e Insights:** Dashboards visuais sobre gastos e frequência, com sugestões de atividades alternativas.
-   🤝 **Rede de Apoio:** Conexão facilitada com familiares, amigos e profissionais.
-   👤 **Login com Reconhecimento Facial:** Autenticação prática e segura utilizando biometria.

## 🛠️ Tecnologias Utilizadas

A solução é construída com uma arquitetura moderna dividida entre o aplicativo mobile e um servidor de inteligência artificial.

| Camada | Tecnologias |
| :--- | :--- |
| 📱 **Frontend (Mobile)** | `React Native`, `TypeScript`, `Expo`, `Axios`, `React Navigation` |
| 🤖 **Backend (IA)** | `Python`, `Flask`, `Dlib`, `OpenCV` |
| ☁️ **Banco de Dados & Serviços** | `Firebase Authentication`, `Cloud Firestore`, `Cloud Storage` |

---

## 🚀 Começando

Para rodar o projeto em seu ambiente de desenvolvimento local, siga os passos abaixo.

### Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados:
* [Node.js (LTS)](https://nodejs.org/en/) com npm
* [Python 3.8+](https://www.python.org/downloads/) com pip
* [Git](https://git-scm.com/)
* O aplicativo **Expo Go** em seu smartphone (Android ou iOS)

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/second-nature.git](https://github.com/seu-usuario/second-nature.git)
    cd second-nature
    ```

2.  **Configure o Firebase:**
    * Acesse o [console do Firebase](https://console.firebase.google.com/) e crie um novo projeto.
    * Ative os serviços de **Authentication** (com provedor E-mail/Senha), **Firestore Database** e **Cloud Storage**.
    * Registre um novo aplicativo da Web e copie as credenciais de configuração para usar no passo 4.

3.  **Configure o Backend (Python):**
    * Navegue até a pasta do servidor:
        ```bash
        cd python
        ```
    * Crie e ative um ambiente virtual:
        ```bash
        # Windows
        python -m venv venv
        .\venv\Scripts\activate
        # macOS / Linux
        python3 -m venv venv
        source venv/bin/activate
        ```
    * Instale as dependências:
        ```bash
       python -m pip install cmake Flask dlib-bin opencv-python numpy Pillow firebase-admin
        ```
    * No console do Firebase, vá em **Configurações do Projeto > Contas de serviço** e clique em **"Gerar nova chave privada"**.
    * Renomeie o arquivo `.json` baixado para `serviceAccountKey.json` e mova-o para dentro desta pasta (`python/`).

4.  **Configure o Frontend (Mobile):**
    * Navegue até a pasta do aplicativo:
        ```bash
        cd mobile_app 
        ```
        *(Se você estiver na pasta `python`, use `cd ../mobile_app`)*
    * Instale as dependências do Node.js:
        ```bash
        npm install
        ```
    * Crie um arquivo de configuração do Firebase chamado `firebaseConfig.js` (ou `.ts`) e preencha com as credenciais que você copiou no passo 2.
    * **IMPORTANTE:** Encontre seu endereço IP local na sua rede Wi-Fi.
        ```bash
        # Windows
        ipconfig
        # macOS / Linux
        ifconfig | grep inet
        ```
        Procure pelo endereço IPv4 (ex: `192.168.1.10`).
    * Abra os arquivos de tela (`LoginScreen.tsx`, `CadastroScreen.tsx`, etc.) e substitua o valor da variável `API_URL` pelo seu IP:
        ```javascript
        const API_URL = 'http://SEU_IP_AQUI:5000';
        ```

### Rodando o Projeto

Para que a aplicação funcione, **o backend e o frontend precisam estar rodando simultaneamente**. Abra dois terminais separados.

**➡️ No Terminal 1 (Backend):**
```bash
cd python
# Ative o ambiente virtual se ainda não estiver ativo
# venv\Scripts\activate (Windows) ou source venv/bin/activate (macOS/Linux)
flask run --host=0.0.0.0
# ou
python reconhecimento_facial.py
```
*O servidor Python estará rodando e acessível na sua rede local na porta 5000.*

**➡️ No Terminal 2 (Frontend):**
```bash
cd mobile_app
npm start
```
*Um QR Code será exibido no terminal. Escaneie-o com o aplicativo Expo Go no seu celular para abrir o SecondNature.*

**Pronto!** Agora você pode testar o cadastro, o login facial e as outras funcionalidades.

---

## 👥 Integrantes

| Nome | RM | Turma |
| :--- | :--- | :--- |
| Arthur Baldissera Claumann Marcos | 550219 | 3ESPF |
| Gabriel Genaro Dalaqua | 551986 | 3ESPF |
| Paloma Mirela dos Santos Rodrigues | 551321 | 3ESPF |
| Ricardo Ramos Vergani | 550166 | 3ESPF |
| Victor Kenzo Toma | 551649 | 3ESPF |

<br>

Parabéns pelo excelente projeto!
