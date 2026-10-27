# Gerenciador de Despesas — Aula 09

Projeto de referência em React Native + Expo com Context API, useReducer, AsyncStorage, navegação com parâmetros, formulário validado, busca com debounce, temas e desafios extras.

## Requisitos
- Node.js LTS compatível com a versão do Expo instalada.
- npm.
- Expo Go no celular ou emulador Android/iOS; para testar no navegador, instalar as dependências web do Expo.

## Instalação
Na pasta do projeto:

```bash
npm install
npx expo install --fix
npx expo install @react-native-async-storage/async-storage @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-community/datetimepicker
npx expo install @expo/vector-icons
```

Para web:
```bash
npx expo install react-dom react-native-web
```

## Executar
```bash
npx expo start
```
Depois escaneie o QR Code com o Expo Go ou use:
- `a`: Android
- `w`: navegador (com dependências web instaladas)

## Recursos
- Estado global com Context API e reducer (ADD, UPDATE, DELETE, SET).
- Persistência no AsyncStorage usando a chave `@expenses`.
- Criar, editar e excluir com confirmação.
- Validação manual de descrição, valor, data e categoria.
- Busca com debounce e total atualizado.
- Filtro por categoria.
- Limpar todas as despesas com confirmação.
- Tema baseado no tema do sistema.
- Duas colunas em telas com largura superior a 600 px.
- Sombra nos cards adaptada à plataforma.

## Antes de entregar
1. Rode o aplicativo e teste todos os itens do roteiro do professor.
2. Faça prints do tema claro, tema escuro e formulário com mensagens de erro.
3. Não envie `node_modules`.
4. Crie um branch, faça commit e abra um Pull Request para a branch exigida pelo professor.
