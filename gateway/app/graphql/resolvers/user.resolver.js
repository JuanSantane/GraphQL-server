import bcrypt from 'bcrypt';
import { withFilter, PubSub } from 'graphql-subscriptions';
import { userGetAllsubject } from '../../mqttClient';
const uniqid = require('uniqid');
const SOMETHING_CHANGED_TOPIC = 'something_changed';
const pubsub = new PubSub();
const settings = require('../../settings');
const inboxTopics = settings.mqttClient.topics.inbox;
const outboxTopics = settings.mqttClient.topics.outbox;

function getProjection(InfoFromQuery) {
    let selectionSet = '';
    InfoFromQuery.fieldNodes[0].selectionSet.selections.forEach((selection) => {
        selectionSet =  selectionSet + " " + selection.name.value;
    }); 
    return selectionSet.replace("__typename", "");
   }
function getQueryMethod(InfoFromQuery){
    return InfoFromQuery.fieldName;
}
function getQueryParams(info){
    return "";
}
function buildQuery(info) {
    return `query { ${getQueryMethod(info)}${getQueryParams(info)} { ${getProjection(info)} } }`
}

export default{
    Query: {
        getAllUsers: (parent, args, context, info) => {
            const nn = `${args}`;
            console.log("PARAMS ==> ", args);            
            const query = {
                id: uniqid(),
                body: buildQuery(info)
            }
            console.log(query);
            context.mqtt.publish(outboxTopics.getAllUserRqst, JSON.stringify(query));
            const subscription =  userGetAllsubject.subscribe(res => {
                console.log("respuesta del mqtt");
                subscription.unsubscribe();
            });
        },
        getUser: (parent, args, context) => context.models.User.findOne(args)
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