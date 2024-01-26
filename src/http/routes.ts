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
import { uploadImage } from './controllers/upload-image'
import { deleteImage } from './controllers/delete-image'

export async function appRoutes(app: FastifyInstance) {
  app.post('/equipment', createEquipment)
  app.patch('/equipment/:id', updateEquipment)
  app.get('/equipment/:id', getEquipment)
  app.get('/equipments', getEquipments)
  app.delete('/equipment/:id', deleteEquipment)

  app.post('/panorama', createPanorama)
  app.patch('/panorama/:id', updatePanorama)
  app.get('/panorama/:id', getPanorama)
  app.get('/panoramas', getPanoramas)
  app.delete('/panorama/:id', deletePanorama)

  app.post('/image', uploadImage)
  app.delete('/image/:key', deleteImage)
}
