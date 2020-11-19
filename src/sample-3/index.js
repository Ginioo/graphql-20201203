const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    type Query {
        """
        Return a list of customers' information
        """
        customers(name: String): [Customer]!
    }

    """
    RM supported products
    """
    enum Product {
        WFBS_SVC
        CAS
        EMS_ADV
        HES
    }

    type Customer {
        id: String!
        name: String
        contactPerson: String
        phone: String
        products: [Product]!
    }
`;

const resolvers = {
    Query: {
        customers:(parent, args, context, info) => {
            const { name } = args;

            const customers = [
                {
                    id: '92A86DA3-040F-4D48-8CF2-839EBFD82912',
                    name: 'TM',
                    contactPerson: 'John Doe',
                    phone: '909-864-8831',
                    products: ['EMS_ADV'],
                },
                {
                    id: '92A86DA3-040F-4D48-8CF2-839EBFD82933',
                    name: 'TMRM',
                    contactPerson: 'Mary Doe',
                    phone: '909-864-8832',
                    products: ['CAS', 'HES'],
                }
            ];

            if (!_isEmpty(name)) {
                return _filter(customers, customer => customer.name === name);
            }

            return customers;
        }
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
