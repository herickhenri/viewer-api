import { makeGetAllEquipmentsUseCases } from '../../../use-cases/factories/make-get-all-equipments-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getAllEquipments(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllEquipmentsUseCases = makeGetAllEquipmentsUseCases()

  const equipments = await getAllEquipmentsUseCases.execute()

  return reply.status(200).send(equipments)
}
