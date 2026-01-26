import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    // Public addresses (stored in clear)
    btcAddress: { type: String },
    ethAddress: { type: String },
    usdtAddress: { type: String },

    // Encrypted sensitive blobs (AES-GCM JSON strings)
    btcMnemonicEncrypted: { type: String },
    ethMnemonicEncrypted: { type: String },
    ethPrivateKeyEncrypted: { type: String },
  },
  { timestamps: true },
);

export const User = models.User || mongoose.model('User', userSchema);
