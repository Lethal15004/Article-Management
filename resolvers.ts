import Article from "./model/article.model";

const resolvers={
    Query: {
        getListArticle: async () => {
            const articles= await Article.find({
                deleted:false
            })
            return articles;
        },
        getArticle:async(_,args)=>{
            const id : string =`${args.id}`;
            try {
                const article= await Article.findOne({
                    _id:id,
                    deleted:false
                })
                return article;
            } catch (error) {
                return {};
            }
        }
    },
}
export default resolvers;