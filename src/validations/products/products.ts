import Joi from 'joi'

const getAllProducts = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({})
})

const getSingleProduct = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    productId: Joi.number().required()
  }),
  body: Joi.object({})
})

const consultationQuestionSchema: Joi.Schema = Joi.array().items(
  Joi.object({
    questionText: Joi.string().required(),
    answers: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
        isCorrect: Joi.boolean().required(),
        message: Joi.string().required(),
        followUpQuestions: Joi.link('#questionSchema').optional()
      })
    ).min(2).required()
  })
).id('questionSchema')

const createProduct = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    categoryId: Joi.number().required(),
    thumbnail: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    directCheckout: Joi.boolean().required(),
    reviewedBy: Joi.array().items(Joi.number()).optional(),
    consultationQuestions: consultationQuestionSchema.optional()
  })
})

const updateProduct = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    productId: Joi.number().required()
  }),
  body: Joi.object({
    categoryId: Joi.number().optional(),
    thumbnail: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    directCheckout: Joi.boolean().optional(),
    reviewedBy: Joi.array().items(Joi.number()).optional(),
    consultationQuestions: Joi.object().optional()
  })
})

const deleteProduct = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    productId: Joi.number().required()
  }),
  body: Joi.object({})
})

export default {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
