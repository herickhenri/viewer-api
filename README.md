# API APLICATIVO LOCALIZA AI

### Iniciando a aplicação
```node
  npm install
```
```node
  docker compose up
```
Para inicar a aplicação
```node
  npm run build
```
```node
  npm run start
```
Para inicar no modo desenvolvedor
```node
  npm run dev
```

### Teste
Para executar os testes unitários
```node
  npm run test
```
Para executar os testes e2e
```node
  npm run test:e2e
```

### RFs (Requisitos funcionais)
- [x] Deve ser possível criar um equipamento
- [x] Deve ser possível buscar um equipamento pelo id 
- [x] Deve ser possível buscar todos os equipamentos
- [x] Deve ser possível editar um equipamento
- [x] Deve ser possível deletar um equipamento
- [x] Deve ser possível criar um panorama
- [x] Deve ser possível buscar um panorama pelo id
- [x] Deve ser possível buscar todos os panoramas
- [x] Deve ser possível editar um panorama
- [x] Deve ser possível excluir um panorama

### RNs (Regras de negócio)
- [x] Dois equipamentos não podem possuir a mesma tag

### RNFs (Requisitos não funcionais)
- [x] A tag deve possuir um formato específico
