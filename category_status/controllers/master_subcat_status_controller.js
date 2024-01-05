const MasterSubCatStatus = require("../models/master_subCat_status_models");

// Create Game Category
// exports.createGameCat = async (req, res) => {
//   try {
//     const newGameCat = await GameCategory.create(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         newGameCat,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err,
//     });
//   }
// };

// Read All Categoires Stattus With Master
exports.getGameSubCatStatusAll = async (req, res) => {
  const masterId = req.params.id;

  const allGameSubCatStatus = await MasterSubCatStatus.findOne({
    master_id: masterId,
  }).populate({
    path: "master_id",
    select:
      "-userId -email -role -uplineId -downlineId -unit -promotionUnit -gameUnit -userLevel -status -loginTime -__v",
  });

  res.status(200).json({
    status: "Success",
    data: {
      allGameSubCatStatus,
    },
  });
};

// Update Game Sub Category Status
exports.updateGameSubCatStatus = async (req, res) => {
  try {
    const masterId = req.params.id;
    const subCatIdToUpdate = req.body.subCatIdToUpdate;
    console.log(req.body)
    let update= {}
    // check if status in request is not null and add it to update object
    if(req.body?.status !== null){
      update['subCatStatus.$.status']= req.body.status
    }
    // check if otherCompensation in request is not null and add it to update object
    if(req.body?.otherCompensation !== null){
      update['subCatStatus.$.otherCompensation'] = req.body.otherCompensation
    }
    // Check if mainCompensation is not null and add it to the update object
    if (req.body?.mainCompensation !== null) {
      update["subCatStatus.$.mainCompensation"] = req.body.mainCompensation;
    }
    // Check if comession is not null and add it to the update object
    if (req.body?.comession !== null) {
      update["subCatStatus.$.comession"] = req.body.comession;
    }
    const updatedDoc = await MasterSubCatStatus.findOneAndUpdate(
      {
        master_id: masterId,
        "subCatStatus._id": subCatIdToUpdate,
      },
      {
        $set: update,
      },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      data: {
        updatedDoc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
