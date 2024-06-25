import { catchAsync } from "./catchAsync.utils.js";
import { apiError } from "./apiError.utils.js";
import { APIFeatures } from "./apiFeature.utils.js";

export const deleteOne = (Model, restrictKey) =>
  catchAsync(async (req, res, next) => {
    // this block of code will ensure that user who created the doc can modify it
    if (restrictKey) {
      const filters = { _id: req.params.id };
      const userId = req?.user?.id;
      filters[restrictKey] = userId;

      const checkDoc = await Model.findOne(filters);

      if (!checkDoc)
        return next(
          new apiError(`You're not allowed to perform this action.`, 401)
        );
    }

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new apiError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export const updateOne = (Model, restrictKey) =>
  catchAsync(async (req, res, next) => {
    // this block of code will ensure that user who created the doc can modify it
    if (restrictKey) {
      const filters = { _id: req.params.id };
      const userId = req?.user?.id;
      filters[restrictKey] = userId;

      const checkDoc = await Model.findOne(filters);

      if (!checkDoc)
        return next(
          new apiError(`You're not allowed to perform this action.`, 401)
        );
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new apiError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

export const getOne = ({ Model, popOptions, findby }) =>
  catchAsync(async (req, res, next) => {
    let query;

    if (findby) {
      const findByObj = {};
      findByObj[findby] = req.params.id;
      query = Model.findOne(findByObj);
    } else query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new apiError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const getAll = (Model, findFilter, popOptions) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)

    let filter = findFilter || {};
    // if (req.params.id) filter = { id: req.params.id };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query.populate(popOptions);

    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
