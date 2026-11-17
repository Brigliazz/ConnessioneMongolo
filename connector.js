import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://filippobrigliadoristud_db_user:XRMo6IMpXHKaNGs6@cluster0.vdsgguf.mongodb.net/clinica_veterinaria';

export async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('You successfully connected to MongoDB with Mongoose!');
    return mongoose;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export async function connectToMongoose() {
  return connectToMongoDB();
}

export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
}