import { Schema, model } from 'mongoose';

const logSchema = new Schema(
    {
        event: {
            type: String,
            required: [true, 'name is required'],
            trim: true,
        },
        value: {
            type: Number,
            required: [true, 'value is required'],
        },
        device_id: {
            type: Schema.Types.ObjectId,
            ref: 'Device'
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
);

const logModel = model('Log', logSchema);

export default logModel;