import mongoose from 'mongoose';

const uri =
  'mongodb+srv://fybit:jobinson%2433@cluster0.77d2dvs.mongodb.net/fybitdb?retryWrites=true&w=majority';

mongoose
  .connect(uri)
  .then(() => {
    console.log('✅ Mongo connected successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err);
    process.exit(1);
  });
