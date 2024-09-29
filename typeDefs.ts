import { gql } from "apollo-server-express";
const typeDefs = gql`
    type Article {
        id:String,
        title:String,
        avatar:String,
        description:String
    }
    type Query {
        getListArticle:[Article],
        getArticle(id:String):Article
    }
`;
export default typeDefs;