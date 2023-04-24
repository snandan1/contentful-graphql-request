// const name = 'Happy Coding!'

import { GraphQLClient, gql } from 'graphql-request'

async function main() {
  const endpoint = 
    'https://graphql.contentful.com/content/v1/spaces/space_id/environments/master'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer XXXX',
    },
  })

  const query = gql`
    query postEntryQuery {
        post(id: "4CYBcZ1rya6dlE67EIzyrP") {
        title
        slug
        coverImage {
            title
            url
        }
        content {
            links {
            entries {
                block {
                ... on Author {
                    name
                    picture {
                    url
                    }
                }
                ... on ProductSection {
                    productsCollection (limit: 10) {
                    items {
                        title
                        slug
                        categoriesCollection (limit: 5) {
                        items {
                            title
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        }
        }
    }
  `

  const data = await graphQLClient.request(query)
  console.log('title = ' + data.post.title);
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))

// module.exports = name
