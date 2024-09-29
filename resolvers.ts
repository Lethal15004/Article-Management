import Article from "./model/article.model";

const resolvers={
    Query: {
        getListArticle: async () => {
            const articles= await Article.find({
                deleted:false
            })
            return articles;
        },
    },
}
export default resolvers;