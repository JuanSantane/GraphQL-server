import bcrypt from 'bcrypt';
import { withFilter, PubSub } from 'graphql-subscriptions';
const SOMETHING_CHANGED_TOPIC = 'something_changed';
export const pubsub = new PubSub();

export default{
    Query: {
        getAllUsers: (parent, args, context) => context.models.User.find(),
        getUser: (parent, args, context) => context.models.User.findOne(args),
        getInfo: (parent, args, context, info) => {
            return "Hello this is a fake answer"
        }
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            try{
                const hashPass = await bcrypt.hash(args.password, 10 );
                const user = await context.models.User.create({...args, password: hashPass});
                console.log(hashPass);
                pubsub.publish(SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: "123" }});
                return user && user._id;
            }catch(error){
                console.log(error);
                return false;
            }
           
        }
    },
    Subscription: {
        somethingChanged: {
        resolve: (payload, args, context, info) => {
                // Manipulate and return the new value
                console.log("meddleware ==== >>>")
                return payload;
              },
          subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
        },
      }
}