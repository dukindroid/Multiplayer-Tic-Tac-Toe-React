import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://dukintosh:8Swr2EZGfpZ0lhGZ@cluster0.stx4zgo.mongodb.net/test')
import User from './User.js'

// console.log(leaderboard())

export async function updateUser(which) {
  try {
    // const user = await User.create({
    //   name: "NotOtroJavo",
    //   qty: 12
    // })
    const user = await User.findOneAndUpdate({
      name: which
    }, {
      $inc: { 
        qty: 1
      }
    }, {
      new: true,
      upsert: true
    }).exec()
    await user.save()
    console.log(user)
    return `updated ${which} to ${user.qty} games won.`
  } catch (error) {
    console.log(error)
  }
}

export async function leaderboard() {
  try {
    const topPlayers = await User.find().sort({ qty: -1 }).limit(10).select(["name","qty"])
    console.log(`This happpened: ${topPlayers}`)
    return topPlayers
  } catch (error) {
    return error
  }
}