import { model, Schema, Types } from 'mongoose';

//зберігання даних про споживання води в базі даних
const watersSchema = new Schema(
  {
    date: { type: Date, required: true }, // Дата споживання води
    volume: { type: Number, required: true }, // Кількість води в мл або літрах
    userId: { type: Types.ObjectId, ref: 'users', required: true }, //ID користувача, який спожив воду
    consumption: { type: Number }, // Спожита кількість води в цей день
  },
  { timestamps: true, versionKey: false },
);

export const WatersCollection = model('waters', watersSchema);
