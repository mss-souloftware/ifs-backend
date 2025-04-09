import Joi from 'joi'

const getAllTeamMembers = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({})
})

const createTeamMember = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required(),
    position: Joi.string().optional(),
    picture: Joi.string().required(),
    bio: Joi.string().required()
  })
})

const updateTeamMember = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    memberId: Joi.number().required()
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    position: Joi.string().optional(),
    picture: Joi.string().optional(),
    bio: Joi.string().optional()
  })
})

const deleteTeamMember = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    memberId: Joi.number().required()
  }),
  body: Joi.object({})
})

export default {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
}
