const responseHandler = (res, statusCode, message, status, data) => {
  res.status(statusCode).json({
    message,
    status,
    data,
  });
};

const isObject = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

//basic controllers go on here
exports.indexCtrl = (req, res) => {
  const data = {
    name: "Jimoh Rildwan Adekunle",
    github: "@neymarjimoh",
    email: "jemohkunle2007@gmail.com",
    mobile: "09070822819",
    twitter: "@JnrJimoh",
  };
  return responseHandler(res, 200, "My Rule-Validation API", "success", data);
};

exports.valRule = (req, res) => {
  const { rule, data } = req.body;
  let first_rule;
  let second_rule;

  if (!rule)
    return responseHandler(res, 400, "rule is required.", "error", null);

  if (!data)
    return responseHandler(res, 400, "data is required.", "error", null);

  if (!isObject(rule))
    return responseHandler(
      res,
      400,
      "rule should be an object.",
      "error",
      null
    );

  const { field, condition, condition_value } = rule;

  if (!field || !condition || !condition_value)
    return responseHandler(
      res,
      400,
      "Invalid JSON payload passed.",
      "error",
      null
    );

  const isContainDot = field.indexOf(".") !== -1;
  if (!isContainDot) {
    if (data[`${field}`] == "undefined") {
      return responseHandler(
        res,
        400,
        `field ${field} is missing from data.`,
        "error",
        null
      );
    }
    if (
      condition !== "eq" ||
      condition !== "neq" ||
      condition !== "gt" ||
      condition !== "gte" ||
      condition !== "contains"
    )
      return responseHandler(
        res,
        400,
        "Invalid JSON payload passed.",
        "error",
        null
      );
    if (condition === "eq") {
      if (condition_value !== data[`${field}`]) {
        return responseHandler(
          res,
          400,
          `field ${field} failed validation.`,
          "error",
          {
            validation: {
              error: true,
              field: `${field}`,
              data_value: `${data[`${field}`]}`,
              condition: condition,
              condition_value: condition_value,
            },
          }
        );
      }
    }

    if (condition === "neq") {
      if (data[`${field}`] === condition_value) {
        return responseHandler(
          res,
          400,
          `field ${field} failed validation.`,
          "error",
          {
            validation: {
              error: true,
              field: `${field}`,
              data_value: `${data[`${field}`]}`,
              condition: condition,
              condition_value: condition_value,
            },
          }
        );
      }
    }

    if (condition === "gt") {
      if (data[`${field}`] < condition_value) {
        return responseHandler(
          res,
          400,
          `field ${field} failed validation.`,
          "error",
          {
            validation: {
              error: true,
              field: `${field}`,
              data_value: `${data[`${field}`]}`,
              condition: condition,
              condition_value: condition_value,
            },
          }
        );
      }
    }

    if (condition === "gte") {
      if (data[`${field}`] <= condition_value) {
        return responseHandler(
          res,
          400,
          `field ${field} failed validation.`,
          "error",
          {
            validation: {
              error: true,
              field: `${field}`,
              data_value: `${data[`${field}`]}`,
              condition: condition,
              condition_value: condition_value,
            },
          }
        );
      }
    }

    if (condition === "contains") {
      if (!data[`${field}`].includes(`${condition_value}`)) {
        return responseHandler(
          res,
          400,
          `field ${field} failed validation.`,
          "error",
          {
            validation: {
              error: true,
              field: `${field}`,
              data_value: `${data[`${field}`]}`,
              condition: condition,
              condition_value: condition_value,
            },
          }
        );
      }
    }
    return res.status(200).json({
      message: `field ${field} is validated successfully.`,
      status: "success",
      data: {
        validation: {
          error: false,
          field: `${field}`,
          data_value: `${data[`${field}`]}`,
          condition: condition,
          condition_value: condition_value,
        },
      },
    });
  } else {
    if (field.split(".").length >= 1) {
      first_rule = field.split(".")[0];
      second_rule = field.split(".")[1];

      if (first_rule && second_rule) {
        if (`${data[`${first_rule}`][`${second_rule}`]}` == "undefined") {
          return res.status(400).json({
            message: `field ${field} is missing from data.`,
            status: "error",
            data: null,
          });
        }
        if (condition === "eq") {
          if (data[`${first_rule}`][`${second_rule}`] !== condition_value) {
            return res.status(200).json({
              message: `field ${field} failed validation.`,
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: `${field}`,
                  data_value: `${data[`${first_rule}`][`${second_rule}`]}`,
                  condition: condition,
                  condition_value: condition_value,
                },
              },
            });
          }
        }

        if (condition === "neq") {
          if (data[`${first_rule}`][`${second_rule}`] === condition_value) {
            return res.status(200).json({
              message: `field ${field} failed validation.`,
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: `${field}`,
                  data_value: `${data[`${first_rule}`][`${second_rule}`]}`,
                  condition: condition,
                  condition_value: condition_value,
                },
              },
            });
          }
        }

        if (condition === "gt") {
          if (data[`${first_rule}`][`${second_rule}`] < condition_value) {
            return res.status(200).json({
              message: `field ${field} failed validation.`,
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: `${field}`,
                  data_value: `${data[`${first_rule}`][`${second_rule}`]}`,
                  condition: condition,
                  condition_value: condition_value,
                },
              },
            });
          }
        }

        if (condition === "gte") {
          if (data[`${first_rule}`][`${second_rule}`] <= condition_value) {
            return res.status(200).json({
              message: `field ${field} failed validation.`,
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: `${field}`,
                  data_value: `${data[`${first_rule}`][`${second_rule}`]}`,
                  condition: condition,
                  condition_value: condition_value,
                },
              },
            });
          }
        }

        if (condition === "contains") {
          if (
            !data[`${first_rule}`][`${second_rule}`].includes(
              `${condition_value}`
            )
          ) {
            return res.status(200).json({
              message: `field ${field} failed validation.`,
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: `${field}`,
                  data_value: `${data[`${first_rule}`][`${second_rule}`]}`,
                  condition: condition,
                  condition_value: condition_value,
                },
              },
            });
          }
        }

        return res.status(200).json({
          message: `field ${field} is validated successfully.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: `${field}`,
              data_value: `${data[`${first_rule}`][`${second_rule}`]}`,
              condition: condition,
              condition_value: condition_value,
            },
          },
        });
      }
    }
  }
};
