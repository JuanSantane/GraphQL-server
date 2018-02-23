export default{
    Query: {
        getPost: (parent, args, context) => context.models.Post.findOne(args)
    },

    Mutation: {
        createPost: (parent, args, context) => {
            console.log("Args ==> " + JSON.stringify(args) );
            return context.models.Post.create({...args.post, by: context.user});
        }
        
    }
}