import { Schema, model } from "mongoose";
import { getAreaScales } from "../../src/libs/area-scale.js";

const generateRandomUUID = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
};

const postSchema = new Schema(
  {
    area: {
      scale: {
        type: String,
        required: [true, "Please select a scale"],
        enum: {
          values: getAreaScales(),
          message: `Please choose a valid scale ie ${getAreaScales().join(
            ", "
          )}`,
        },
      },
    },
    price: {
      type: String,
      required: [true, "Please enter the price"],
    },
    tags: {
      type: [String],
    },
    owner: {
      type: Schema.ObjectId,
      required: [true, "A post belongs to a user"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Enter the title."],
      minLength: [10, "Too Short title."],
      maxLength: [300, "Title too long."],
    },
    advertNo: {
      type: Number,
      default: generateRandomUUID(),
      unique: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now(),
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    images: {
      type: [String],
      required: [true, "Please choose images for post."],
    },
    description: {
      type: String,
      required: [true, "Enter the title."],
      minLength: [50, "Too Short description."],
      maxLength: [
        1500,
        "Title too description. Keep description short & concise",
      ],
    },
    details: {
      type: [
        {
          key: {
            type: String,
            required: [true, "Enter the key."],
            maxLength: [20, "Too long key."],
          },
          value: {
            type: String,
            required: [true, "Enter the value."],
            maxLength: [20, "Too long value."],
          },
        },
      ],
    },
    extras: {
      type: [
        {
          key: {
            type: String,
            required: [true, "Enter the key."],
            maxLength: [20, "Too long key."],
          },
          value: {
            type: String,
            required: [true, "Enter the value."],
            maxLength: [20, "Too long value."],
          },
          icon: { type: String },
        },
      ],
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: {
      virtuals: true,
    },
  }
);

export const Post = model("Post", postSchema);
