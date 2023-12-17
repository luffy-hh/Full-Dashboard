const ShanPlayRing = require("./models");
const ShanRoll = require("../shan_role/models");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const {all} = require("express/lib/application");

// Create Shan Play Ring From Admin
exports.createShanRingFromAdmin = catchAsync(async (req, res) => {
  try {
    const { userId, ring_name, shan_roll, description } = {
      ...req.body,
    };

    // Find the player by userId
    const playerObj = await User.findOne({ userId: userId });

    // Check if the player with the given userId exists
    if (!playerObj) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Extract relevant player data
    const playerGameUnit = playerObj.gameUnit;
    const shanRollObj = await ShanRoll.findById(shan_roll);

    if (shanRollObj.banker_amount > playerGameUnit) {
      return res.status(404).json({
        status: "fail",
        message: "Not Enough Game Unit For Banker Level",
      });
    }
    if (shanRollObj.max_amount < playerGameUnit) {
      return res.status(404).json({
        status: "fail",
        message:
          "Your Game Unit Has exceed the Max Amount. Please Play in higher role! (OR) Reduce Your Game Unit and Try Again",
      });
    }

    const user_id = playerObj._id.toString();

    // Create a new ShanPlayRing document
    const newPlayRing = new ShanPlayRing({
      ring_name,banker_amount:shanRollObj.banker_amount,
      shan_roll,
      description,
      players: [{ userId: user_id, game_unit: playerGameUnit }],
    });

    // Save the new ShanPlayRing document
    await newPlayRing.save();

    // Fetch the complete ShanPlayRing document with populated players' and shan_roll data
    const completePlayRing = await ShanPlayRing.findById(newPlayRing._id)
      .populate(
        "players.userId",
        "name userId email role gameUnit profileImage"
      )
      .populate("shan_roll", "banker_amount");

    // Respond with the complete data, including ring details, player details, and shan_roll details
    res.status(201).json({
      status: "success",
      data: {
        newPlayRing: completePlayRing,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
});

// get all ring
exports.getAllRing = catchAsync(async (req,res,next)=>{
  try {
    const allRings = await ShanPlayRing.find({}).populate('players.userId', 'name')
    res.status(200).json({
      status:'succeed',
      data:allRings
    })
  }catch (e) {
    res.status(500).json({
      status:'failed',
      message:'Error While getting all rings'
    })
  }
})

// Read Shan Ring By Shan Roll
exports.getShingRingByShanRoll = catchAsync(async (req, res) => {
  try {
    const shanRollId = req.params.id;
    const query = ShanPlayRing.find({ shan_roll: shanRollId });
    const allShanRing = await query;

    res.status(200).json({
      status: "Success",
      length: allShanRing.length,
      data: {
        allShanRing,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Enter Shan Ring
exports.enterShanRing = catchAsync(async (req,res,next)=>{
  try {
      const currentUser = await User.findById( req.user.id)
      const userSelectedRing = await ShanPlayRing.findById(req.body.ringId)
      const roleOfCurrentRing = await ShanRoll.findById(userSelectedRing.shan_roll)
      if(!userSelectedRing){
        res.status(400).json({
          status:'failed',
          message:'The Ring You selected doesn\'t exist.'
        })
      }
    if(currentUser.gameUnit < userSelectedRing.banker_amount && currentUser.gameUnit > roleOfCurrentRing.max_amount ) {
      res.status(400).json({
        status: 'failed',
        message: 'You can\'t join this ring . You don\'t have sufficient game unit (or) You have more game unit than the ring max amount.'
      })
    }
    if (userSelectedRing.players.length === 6) {
      res.status(400).json({
        status: 'failed',
        message: "The ring you selected has been full."
      });
    } else {
      const newPlayerObject = {
        userId: currentUser._id,
        player_roll: "player",
        game_unit: currentUser.gameUnit
      };

      if (userSelectedRing.players.length < 6) {
        userSelectedRing.players.push(newPlayerObject); // Add the new player to the players array
        await userSelectedRing.save(); // Save the updated ring with the new player
        res.status(200).json({
          status: 'succeed',
          data: userSelectedRing
        });
      } else {
        res.status(400).json({
          status: 'failed',
          message: "The ring you selected has been full."
        });
      }
    }
  }catch (e) {
    res.json({
      status:'failed',
      message:`Error joining the Ring.`
    })
  }
})

// Exit from the ring
exports.exitFromShanRing = catchAsync(async (req,res,next)=>{
  try {
    const updatedRing = await ShanPlayRing.findByIdAndUpdate(req.body.ringId,{
      $pull:{players:{userId: req.user.id}}
    },{new:true})
    res.status(200).json({
      status:'succeed',
      data:updatedRing
    })
  }catch (e) {
    res.status(500).json({
      status:'failed',
      message:'Something went wrong while exiting the ring.'
    })
  }
})

// Start playing cards
exports.startPlayingCards = catchAsync( async (req,res)=>{
  try {
    
  }catch (e) {
    res.status(500).json({
      status:'failed',
      message:e.message
    })
  }
})

// // Read Bank Account Me
// exports.getBankAccMe = catchAsync(async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//     const currentUserId = decoded.id;
//     console.log(currentUserId);

//     // Select the 'img' field in the query
//     const query = BankAcc.find({ ownderData: currentUserId })
//       .populate("bankNameData")
//       .populate("ownderData");

//     const allBankAcc = await query;
//     console.log(allBankAcc);

//     // Construct image links for each result
//     const bankAccWithImageLinks = allBankAcc.map((bankAcc) => {
//       return {
//         ...bankAcc._doc,
//         imgLink: `${req.protocol}://${req.get("host")}/images/bank_name/${
//           bankAcc.img
//         }`,
//       };
//     });

//     res.status(200).json({
//       status: "Success",
//       length: allBankAcc.length,
//       data: {
//         allBankAcc: bankAccWithImageLinks, // Include image links in the response
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err,
//     });
//   }
// });

// // Read Bank Account Upline
// exports.getBankAccUpline = catchAsync(async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//     const currentUserId = decoded.id;
//     const currentUserObj = await User.findById(currentUserId);
//     const currentUserUplineId = currentUserObj.uplineId;
//     const uplineObj = await User.findOne({ userId: currentUserUplineId });
//     const uplineUserObjId = uplineObj._id.toString();

//     // Select the 'img' field in the query
//     const query = BankAcc.find({ ownderData: uplineUserObjId })
//       .populate("bankNameData")
//       .populate("ownderData");

//     const allBankAcc = await query;
//     console.log(allBankAcc);

//     // Construct image links for each result
//     const bankAccWithImageLinks = allBankAcc.map((bankAcc) => {
//       return {
//         ...bankAcc._doc,
//         imgLink: `${req.protocol}://${req.get("host")}/images/bank_name/${
//           bankAcc.img
//         }`,
//       };
//     });

//     res.status(200).json({
//       status: "Success",
//       length: allBankAcc.length,
//       data: {
//         allBankAcc: bankAccWithImageLinks, // Include image links in the response
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err,
//     });
//   }
// });

// // Update Bank Account name
// exports.updateBankAcc = catchAsync(async (req, res) => {
//   try {
//     const bankAccId = req.params.id; // Assuming you have the bank name's ID in the route parameter
//     const updateObj = {};

//     if (req.body.bankNameId) {
//       updateObj.bankNameId = req.body.bankNameId;
//     }

//     if (req.body.name) {
//       updateObj.name = req.body.name;
//     }

//     if (req.body.account) {
//       updateObj.account = req.body.account;
//     }

//     if (req.body.status) {
//       updateObj.status = req.body.status;
//     }

//     if (req.file) {
//       updateObj.img = req.file.filename;
//       updateObj.imgLink = `${req.protocol}://${req.get(
//         "host"
//       )}/images/bank_name/${req.file.filename}`;
//     }

//     const updatedBankAcc = await BankAcc.findByIdAndUpdate(
//       bankAccId,
//       updateObj,
//       {
//         new: true,
//       }
//     );

//     res.status(200).json({
//       status: "Success",
//       data: {
//         updatedBankAcc,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err,
//     });
//   }
// });
