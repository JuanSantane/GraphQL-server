import bcrypt from 'bcrypt';
import { withFilter, PubSub } from 'graphql-subscriptions';
import { userSubject } from '../../mqttClient';
const uniqid = require('uniqid');
const SOMETHING_CHANGED_TOPIC = 'something_changed';
const pubsub = new PubSub();
const settings = require('../../settings');



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
function getQueryParams(args, info){
    if(JSON.stringify(args) ==  "{}" ){
        console.log("No hay parametros en el query");
        return "";
    }else{
        console.log("Si hay parametros en la query", args);
        let params = '';
        Object.keys(args).forEach(property => {
            params = params + `${property}: ${args[property]}` 
        });
        console.log(params);
        return `(${params})` ;
    }
}
function buildQuery(args, info) {
    return {
        id: uniqid(),
        body: `query { ${getQueryMethod(info)}${getQueryParams(args, info)} 
                { ${getProjection(info)} } }`,
        replyTo:`users/`
    }
}


export default{
    Query: {
        getAllUsers: (parent, args, context, info) => {
            const nn = `${args}`;
            const query = {
                body: buildQuery(args, info)
            }
            context.mqtt.publish(settings.mqttClient.topics.queryRqsts, JSON.stringify(context.rqst));
            const subscription =  userSubject.subscribe(res => {
                console.log("respuesta del mqtt");
                subscription.unsubscribe();
            });
        },
        getUser: (parent, args, context, info) => {
            console.log(args)
            const query = buildQuery(args, info);
            // return context.models.User.findOne(args);
            console.log(query);
        },
        getInfo:(parent, args, context, info) => {
            context.mqtt.publish(settings.mqttClient.topics.queryRqsts, JSON.stringify(context.rqst.query));
            const subscription = userSubject.subscribe(resp => {
                console.log("RESPUESTA DE MQTT");
                return resp;
            });
                        
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