const Category = require("../model/Category");
const slugify = require("slugify");
const shortid = require("shortid");
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      tenDanhMuc: cate.tenDanhMuc,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
class CategoryController {
  addCategory(req, res) {
    const categoryObj = {
      tenDanhMuc: req.body.tenDanhMuc,
      slug: `${slugify(req.body.tenDanhMuc)}-${shortid.generate()}`,
      createdBy: req.user._id,
    };

    if (req.file) {
      categoryObj.categoryImage = "/public/" + req.file.filetenDanhMuc;
    }

    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        return res.status(201).json({ category });
      }
    });
  }
  getCategories(req, res) {
    Category.find({}).exec((error, categories) => {
      if (error) return res.status(400).json({ error });
      if (categories) {
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
      }
    });
  };
  async updateCategories (req, res) {
    const { _id, tenDanhMuc, parentId, type } = req.body;
    const updatedCategories = [];
    if (tenDanhMuc instanceof Array) {
      for (let i = 0; i < tenDanhMuc.length; i++) {
        const category = {
          tenDanhMuc: tenDanhMuc[i],
          type: type[i],
        };
        if (parentId[i] !== "") {
          category.parentId = parentId[i];
        }
  
        const updatedCategory = await Category.findOneAndUpdate(
          { _id: _id[i] },
          category,
          { new: true }
        );
        updatedCategories.push(updatedCategory);
      }
      return res.status(201).json({ updateCategories: updatedCategories });
    } else {
      const category = {
        tenDanhMuc,
        type,
      };
      if (parentId !== "") {
        category.parentId = parentId;
      }
      const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
        new: true,
      });
      return res.status(201).json({ updatedCategory });
    }
  }

  async deleteCategories(req, res)  {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
      const deleteCategory = await Category.findOneAndDelete({
        _id: ids[i]._id,
        createdBy: req.user._id,
      });
      deletedCategories.push(deleteCategory);
    }
  
    if (deletedCategories.length == ids.length) {
      res.status(201).json({ message: "Categories removed" });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
}
module.exports = new CategoryController();