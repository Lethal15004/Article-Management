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
    Mutation:{
        createArticle:async(_,args)=>{
            const {article}=args;
            const newArticle=new Article(article);
            await newArticle.save();
            return newArticle;
        },
        deleteArticle:async(_,args)=>{
            const {id} = args;
            try{    
                await Article.updateOne({
                    _id:id
                },{
                    deleted:true
                })
                return {
                    code:200,
                    message:"Delete article successfully"
                }
            }catch(e){
                return {
                    code:500,
                    message:"Delete article failed"
                }
            }
        },
        updateArticle:async(_,args)=>{
            const{id,article}=args;
            try{
                await Article.updateOne({
                    _id:id,
                    deleted:false
                },article);
                const articleNew = await Article.findOne({
                    _id:id,
                    deleted:false
                });
                return articleNew;
            }catch{ 
                return {};
            }
            
        }
    }
}
export default resolvers;