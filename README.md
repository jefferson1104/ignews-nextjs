## O que foi ensinado?

- Aprender o uso do BFF (Back-end For Front-end) do Next.js, quais recursos utilizar, Client side, Server side ou API Routes.
- Entender as diferenças do GetServerSideProps (SSR) e GetStaticProps (SSG), e qual a situação correta para usar cada um.
- Configurar autenticação utilizando NextAuth e o provider Github.
- Implementar e configurar o FaunaDB, um banco de dados com conceito serverless.
- Implementar e configurar o serviço de pagamento Stripe.
- Consumir dados via Static Site Generation, no caso consumi a api da minha conta do stripe para pegar o valor de um serviço.
- Entender o que são WebHooks, e utilizar a comunicação do Stripe com o projeto ,configurando esse webhook, ouvindo eventos, salvando dados do evento, por exemplo para informar quando um usuario teve problemas com pagamento seja por um cartão de crédito sem saldo ou outro motivo, assim como saber quando um pagamento foi concluido e etc...

## Sobre o webhook do stripe

Para executar em ambiente de desenvolvimento, instale em seu computador o Stripe CLI e em seguida execute o comando a seguir para que ele funcione com seu projeto:
`stripe listen --forward-to localhost:3000/api/webhooks`

> **OBSERVAÇÃO**: Necessário tambem configurar o endpoint la na sua dashboard do stripe, utilizar sua webhook secret na .env.local
