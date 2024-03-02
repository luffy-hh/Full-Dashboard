const catchAsync = require("../utils/catchAsync");
exports.queryModification = async (queryObj, Model, req) => {
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  function convertKeysAndValues(obj) {
    let newObj = {};
    for (let [key, value] of Object.entries(obj)) {
      //check if the value obj is object if not else work
      if (typeof value === "object" && value !== null) {
        // loop the value of Obj
        for (let [innerKey, innerValue] of Object.entries(value)) {
          let newKey = `$${innerKey}`;
          let newValue;
          if (newKey === "$in") {
            // Check if innerValue has multiple values
            newValue = innerValue.includes(",")
              ? innerValue.split(",")
              : [innerValue];
          } else if (
            newKey === "$gt" ||
            newKey === "$lt" ||
            newKey === "$gte" ||
            newKey === "$lte"
          ) {
            //for > < >= <= this will work both for number and date string
            // Check if value is a number or a date string
            newValue = isNaN(innerValue)
              ? new Date(innerValue)
              : Number(innerValue);
          }
          // after changing assign in newObj
          newObj[key] = { ...newObj[key], [newKey]: newValue };
        }
      } else {
        newObj[key] = value;
      }
    }
    return newObj;
  }

  // Convert original object
  let convertedObj = convertKeysAndValues(queryObj);

  // Convert to string and replace keys
  let queryStr = JSON.stringify(convertedObj);
  let query = Model.find(JSON.parse(queryStr));

  // Get the total count of all records
  const totalCount = await Model.countDocuments(query);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // limiting the fields

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // pagination

  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const modelLength = await Model.countDocuments();
    if (skip >= modelLength)
      next(new AppError("This Page does not exists", 404));
  }
  return query;
};
