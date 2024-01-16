import { makeGetEquipmentsUseCases } from '../../../use-cases/factories/make-get-equipments-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getEquipments(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEquipmentsUseCases = makeGetEquipmentsUseCases()

  const equipments = await getEquipmentsUseCases.execute()

  return reply.status(200).send(equipments)
}
