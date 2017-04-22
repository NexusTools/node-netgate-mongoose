import * as mongoose from "mongoose";
import {} from "node";

declare module "mongoose" {
    export function createConnection(uri: string, options?: ConnectionOptions, cb?: (err: Error) => void): mongoose.Connection;
    interface Model<T extends Document> extends NodeJS.EventEmitter, ModelProperties {
        copy(source, target): any;
    }
}

declare namespace NexusForkMongoose {
    interface Model {
        [index: string]: mongoose.Model<mongoose.Document>;
    }
    interface Schema {
        [index: string]: mongoose.Schema;
    }
    interface Database {
        readonly Models: Model;
        readonly Schemas: Schema;
        readonly Connection: mongoose.Connection;
        readonly ObjectId: mongoose.Types.ObjectId;
    }
}

declare namespace NodeJS {
    interface EventEmitter {}
    interface Domain {
        readonly db?: NexusForkMongoose.Database;
    }
}