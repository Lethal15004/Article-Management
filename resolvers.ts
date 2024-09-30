import Article from "./model/article.model";
import Category from "./model/category.model";
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
        },
        getListCategory: async () => {
            const categories= await Category.find({
                deleted:false
            })
            return categories;
        },
        getCategory:async(_,args)=>{
            const {id}=args;
            try {
                const category= await Category.findOne({
                    _id:id,
                    deleted:false
                })
                return category;
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
        },
        createCategory:async(_,args)=>{
            const {category}=args;
            const newCategory=new Category(category);
            await newCategory.save();
            return newCategory;
        },
        deleteCategory:async(_,args)=>{
            const {id} = args;
            try{    
                await Category.updateOne({
                    _id:id
                },{
                    deleted:true
                })
                return {
                    code:200,
                    message:"Delete category successfully"
                }
            }catch(e){
                return {
                    code:500,
                    message:"Delete category failed"
                }
            }
        },
        updateCategory:async(_,args)=>{
            const {id,category}=args;
            try {
                await Category.updateOne({
                    _id:id,
                    deleted:false
                },category);
                const newCategory = await Category.findOne({
                    _id:id,
                    deleted:false
                });
                return newCategory;
            } catch (error) {
                return {};
            }
        }
    }
}
export default resolvers;