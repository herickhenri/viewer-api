import { FastifyInstance } from 'fastify'

import { createEquipment } from './controllers/equipments/create-equipment'
import { getEquipment } from './controllers/equipments/get-equipment'
import { getEquipments } from './controllers/equipments/get-equipments'
import { updateEquipment } from './controllers/equipments/update-equipment'
import { deleteEquipment } from './controllers/equipments/delete-equipment'

import { createPanorama } from './controllers/panoramas/create-panorama'
import { deletePanorama } from './controllers/panoramas/delete-panorama'
import { getPanorama } from './controllers/panoramas/get-panorama'
import { getPanoramas } from './controllers/panoramas/get-panoramas'
import { updatePanorama } from './controllers/panoramas/update-panorama'

export async function appRoutes(app: FastifyInstance) {
  app.post('/equipment', createEquipment)
  app.patch('/equipment', updateEquipment)
  app.get('/equipment', getEquipment)
  app.get('/equipments', getEquipments)
  app.delete('/equipment', deleteEquipment)

  app.post('/panorama', createPanorama)
  app.patch('/panorama', updatePanorama)
  app.get('/panorama', getPanorama)
  app.get('/panoramas', getPanoramas)
  app.delete('/panorama', deletePanorama)
}
