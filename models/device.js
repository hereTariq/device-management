import { Schema, model } from 'mongoose';

const deviceSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
            trim: true,
        },
        type: {
            type: String,
            required: [true, 'tyep is required'],
        },
        status: {
            type: String,
            required: true,
        },
        owner_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        last_active_at: {
            type: Date
        },
        is_deleted: {
            type: Boolean,
            default: false,
            select: false
        }, 
        deleted_at: {
            type: Date
        }
    },
    { timestamps: true }
);

deviceSchema.pre('find', function(next) {
    this.where({ is_deleted: false });
    next();
})

const deviceModel = model('Device', deviceSchema);

export default deviceModel;