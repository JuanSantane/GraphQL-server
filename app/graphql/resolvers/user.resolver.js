import bcrypt from 'bcrypt';

export default{
    Query: {
        getAllUsers: (parent, args, context) => context.models.User.find(),
        getUser: (parent, args, context) => context.models.User.findOne(args)
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            try{
                const hashPass = await bcrypt.hash(args.password, 10 );
                const user = await context.models.User.create({...args, password: hashPass});
                console.log(hashPass);
                return user && user._id;
            }catch(error){
                console.log(error);
                return false;
            }
           
        }
    }
}