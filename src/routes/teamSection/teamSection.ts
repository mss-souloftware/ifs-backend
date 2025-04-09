import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'

import teamSectionValidations from '../../validations/teamSection/teamSection'
import teamSectionControllers from '../../controllers/teamSection/teamSection.controllers'

const router = express.Router()

// routes
router.get(
  '/',
  validateRequest(teamSectionValidations.getAllTeamMembers),
  teamSectionControllers.getAllTeamMembers
)
router.post(
  '/',
  validateRequest(teamSectionValidations.createTeamMember),
  teamSectionControllers.createTeamMember
)
router.patch(
  '/:memberId',
  validateRequest(teamSectionValidations.updateTeamMember),
  teamSectionControllers.updateTeamMember
)
router.delete(
  '/:memberId',
  validateRequest(teamSectionValidations.deleteTeamMember),
  teamSectionControllers.deleteTeamMember
)

export default router
