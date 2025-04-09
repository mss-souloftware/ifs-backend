import Joi from 'joi'
import { PRODUCT_CATEGORY_TYPE } from '@prisma/client'

const productCategoryTypeEnums = Object.values(PRODUCT_CATEGORY_TYPE)

// categories validations
const getAllCategories = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({})
})

const createCategory = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required(),
    shortDescription: Joi.string().required(),
    longDescription: Joi.string().required(),
    needConsultation: Joi.boolean().required(),
    type: Joi.string()
      .valid(...productCategoryTypeEnums)
      .required(),
    consultationQuestions: Joi.object().optional()
  })
})

const updateCategory = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required()
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    shortDescription: Joi.string().optional(),
    longDescription: Joi.string().optional(),
    needConsultation: Joi.boolean().optional(),
    type: Joi.string()
      .valid(...productCategoryTypeEnums)
      .optional(),
    consultationQuestions: Joi.object().optional()
  })
})

const deleteCategory = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required()
  }),
  body: Joi.object({})
})

// recommended products validations

const updateCategoryRecommendedProducts = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required()
  }),
  body: Joi.array().items({
    productId: Joi.number().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  })
})

// faqs validations
const getAllCategoryFaqs = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required()
  }),
  body: Joi.object({})
})

const createCategoryFaq = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required()
  }),
  body: Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required()
  })
})

const updateCategoryFaq = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required(),
    faqId: Joi.number().required()
  }),
  body: Joi.object({
    question: Joi.string().optional(),
    answer: Joi.string().optional()
  })
})

const deleteCategoryFaq = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required(),
    faqId: Joi.number().required()
  }),
  body: Joi.object({})
})

export default {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,

  updateCategoryRecommendedProducts,

  getAllCategoryFaqs,
  createCategoryFaq,
  updateCategoryFaq,
  deleteCategoryFaq
}
