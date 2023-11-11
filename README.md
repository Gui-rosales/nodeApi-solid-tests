# App

Gympass Style App

## RFs (requisitos funcionais) -> funcionalidade em si

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-in realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível op usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio) -> Quais condições que são aplicadas a cada requisito funcional (não existe uma regra de negócio que não esteja atrelada a requisito funcional)

- [x] O usuário não pode se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário tem que estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco Postgresql;
- [ ] Todas as listas de dados devem ter uma paginação com vinte itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON WEB TOKEN)
