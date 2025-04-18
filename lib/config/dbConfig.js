import mongoose from "mongoose"

export const Connect = async () => {
    await mongoose.connect(process.env.MONGO_DATABASE_URL)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err.message)
    })
}