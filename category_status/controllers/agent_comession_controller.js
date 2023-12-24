const AgentSubCatComession = require("../models/agent_comession_models");
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
exports.getGameSubCatComessionAll = async (req, res) => {
  const agentId = req.body.id;

  const allGameSubCatStatus = await AgentSubCatComession.findOne({
    agent_id: agentId,
  }).populate({
    path: "agent_id",
    select:
      "-userId -email -role -downlineId -unit -promotionUnit -gameUnit -userLevel -status -loginTime -__v",
  });

  res.status(200).json({
    status: "Success",
    data: {
      allGameSubCatStatus,
    },
  });
};

// Update Game Sub Category Status
exports.updateGameSubCatComession = async (req, res) => {
  try {
    const masterId = req.body.masterId;
    const subCatIdToUpdate = req.body.subCatIdToUpdate;
    let update = {}
    if(req.body?.status !== null){
      update['subCatStatus.$.status']= req.body.status
    }
    if(req.body?.comession !== null){
      update["subCatStatus.$.comession"] = req.body.comession
    }


    const updatedDoc = await MasterSubCatStatus.findOneAndUpdate(
      {
        master_id: masterId,
        "subCatStatus.catName_id": subCatIdToUpdate,
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
