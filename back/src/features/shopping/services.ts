import { QueryHandle } from "../../types/general";
import {
  getPostNotFoundResponse,
  getUserNotFoundResponse,
} from "../../utils/server-response";
import { FilterQuery, UpdateQuery } from "mongoose";
import { UpdateOptions } from "mongodb";
import { ShoppingModel } from "../../schemas/shopping";
import { Shopping } from "../../types/shopping";
import { Post } from "../../types/post";
import { isEqualIds } from "../../utils/general";

const updateOrAddOne: QueryHandle<
  {
    amountToAdd?: Number;
  },
  void
> = async ({ amountToAdd = 1, req, res }) => {
  const { user, post } = req;

  if (!user) {
    return getUserNotFoundResponse({ res });
  }

  if (!post) {
    return getPostNotFoundResponse({ res });
  }

  const { _id: postId, routeName } = post;

  const existInConstruction = await ShoppingModel.findOne({
    purchaserId: user._id,
    state: "CONSTRUCTION",
    routeName: routeName,
  });

  if (existInConstruction) {
    const existePost = existInConstruction.posts.find((e) => {
      return isEqualIds(e.post._id, postId);
    });

    if (existePost) {
      await ShoppingModel.updateOne(
        {
          _id: existInConstruction._id,
        },
        {
          $set: {
            "posts.$[p].lastUpdatedDate": new Date(),
          },
          $inc: {
            "posts.$[p].count": amountToAdd,
          },
        },
        {
          arrayFilters: [
            {
              "p.post._id": postId,
            },
          ],
        }
      );
    } else {
      await ShoppingModel.updateOne(
        {
          _id: existInConstruction._id,
        },
        {
          $push: {
            posts: {
              post,
              count: amountToAdd,
              lastUpdatedDate: new Date(),
            },
          },
        },
        {
          arrayFilters: [
            {
              "p.post._id": postId,
            },
          ],
        }
      );
    }
  } else {
    const newShopping = new ShoppingModel({
      state: "CONSTRUCTION",
      purchaserId: user._id,
      purchaserName: user.name,
      routeName,
      posts: [
        {
          post,
          count: amountToAdd,
          lastUpdatedDate: new Date(),
        },
      ],
    });

    await newShopping.save();
  }
};

const getAll: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  Array<Shopping>
> = async ({ query, res }) => {
  const out = await ShoppingModel.find(query);

  return out;
};

const getOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  Shopping | null
> = async ({ query }) => {
  const out = await ShoppingModel.findOne(query);

  return out;
};

const updateOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
    update: UpdateQuery<Shopping>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await ShoppingModel.updateOne(query, update, options);
};

const findAndUpdateOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
    update: UpdateQuery<Shopping>;
  },
  Shopping | null
> = async ({ query, update }) => {
  return await ShoppingModel.findOneAndUpdate(query, update);
};

const deleteOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  void
> = async ({ query }) => {
  await ShoppingModel.deleteOne(query);
};

const findOneAndDelete: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  Shopping | null
> = async ({ query }) => {
  return await ShoppingModel.findOneAndDelete(query);
};

export const shoppingServices = {
  getOne,
  updateOne,
  updateOrAddOne,
  getAll,
  deleteOne,
  findAndUpdateOne,
  findOneAndDelete,
};
