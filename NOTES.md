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

## JAMStack

O conceito de JAMStack é permitir criar uma aplicação front-end quase completa sem depender de desenvolver uma estrutura back-end para essa aplicação.

O significado de JAM é:

- Javascript
- API
- Markup

O **Javascript** é a linguagem que vamos utilizar para o desenvolvimento da aplicação, **API** são diversos serviços de terceiros como o FaunaDB para banco de dados, Stripe para meio de pagamento, Prismic CMS para o gerencimento do conteúdo, e por fim o **Markeup** seria o nosso HTML a estrutura das páginas da nossa aplicação, resumindo esses três conteúdos são a JAMStack para podermos utilizar esse conceito para construir aplicações completas sem necessáriamente precisar desenvolver o back-end.

> **IMPORTANTE**: isso não exclui completamente a necessidade de um back-end, não torna o front-end totalmente independente, mas sim faz com que possamos criar aplicações que dependam menos da necessidade de criar um back-end para elas.

#### CMS (Content Management System)

O CMS serve para fazermos o gerenciamento do conteúdo da nossa aplicação, são painéis de administração prontos para gerenciar o conteúdo, você já deve conhecer esse tipo de serviço, antigamente utilizavamos um dos mais populares CMS de todos os tempos **Wordpress**, assim como também temos o Drupal, Joomla, Magento e etc... com o tempo isso foi mudando e com a chegada do REST API apareceu também os **Headless CMS's**.

#### Headless CMS

Esses CMS's que tem o conceito de Headless são muito parecidos com os CMS's que citamos anteriormente porém digamos que, ele não tem a parte visual de consumo do conteúdo e sim a parte visual apenas de administração e todos os dados são servidos através de API que pode ser uma **API HTTP**, **GraphQL** ou alguma **SDK** servida pelo CMS escolhido.

Alguns exemplos de CMS:

**GRATUITOS**

- Strapi
- Ghost (ótima opção para blog)
- Keystone

**PAGOS**

- Prismic CMS (melhor custo beneficio $$)
- GraphCMS
- Contentful
- Dato CMS

**PARA E-COMMERCE (PAGOS)**

- Shopify (para e-commerce)
- Saleor (para e-commerce)
