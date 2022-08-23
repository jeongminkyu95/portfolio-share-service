import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

//   static async findByEmail({ email }) {
//     const user = await UserModel.findOne({ email });
//     return user;
//   }

  static async findById({ user_id }) {
    const user = await EducationModel.findOne({ user_id: user_id });
    // console.log(user);
    return user;
  }

//   static async findAll() {
//     const users = await UserModel.find({});
//     return users;
//   }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { user_id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
}

export { Education };
