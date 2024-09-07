import { model, Schema } from 'mongoose';

const getNameFromEmail = (email) => {
  const [name] = email.split('@');
  return name;
};

const usersSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true },
    name: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
      default: function () {
        return this.email ? this.email.split('@')[0] : '';
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['woman', 'man'],
      required: true,
      default: 'woman',
    },
    photo: {
      type: String,
    },
    dailyNorma: { type: Number, default: 2000, required: true },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.pre('save', function (next) {
  if (this.isNew && !this.name) {
    this.name = getNameFromEmail(this.email);
  }
  next();
});

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
