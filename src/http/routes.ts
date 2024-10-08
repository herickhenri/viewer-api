import { FastifyInstance } from 'fastify'

import { createEquipment } from './controllers/equipments/create-equipment'
import { getEquipment } from './controllers/equipments/get-equipment'
import { getAllEquipments } from './controllers/equipments/get-all-equipments'
import { updateEquipment } from './controllers/equipments/update-equipment'
import { deleteEquipment } from './controllers/equipments/delete-equipment'

import { createPanorama } from './controllers/panoramas/create-panorama'
import { deletePanorama } from './controllers/panoramas/delete-panorama'
import { getPanorama } from './controllers/panoramas/get-panorama'
import { getPanoramas } from './controllers/panoramas/get-panoramas'
import { updatePanorama } from './controllers/panoramas/update-panorama'

import { uploadImage } from './controllers/images/upload-image'
import { deleteImage } from './controllers/images/delete-image'
import { uploadAllImages } from './controllers/images/upload-all-images'
import { deleteAllImages } from './controllers/images/delete-all-images'
import { createConnection } from './controllers/panoramas/create-connection'
import { deleteConnection } from './controllers/panoramas/delete-connection'
import { createNote } from './controllers/notes/create-note'
import { createNotes } from './controllers/notes/create-notes'
import { getNotes } from './controllers/notes/get-notes'
import { getNote } from './controllers/notes/get-note'
import { updateNote } from './controllers/notes/update-note'
import { createNoteMarkup } from './controllers/notes/create-note-markup'
import { deleteNoteMarkup } from './controllers/notes/delete-note-markup'

export async function appRoutes(app: FastifyInstance) {
  app.post('/equipment', createEquipment)
  app.patch('/equipment/:id', updateEquipment)
  app.get('/equipment/:id', getEquipment)
  app.get('/all-equipments', getAllEquipments)
  app.delete('/equipment/:id', deleteEquipment)

  app.post('/panorama', createPanorama)
  app.patch('/panorama/:id', updatePanorama)
  app.get('/panorama/:id', getPanorama)
  app.get('/panoramas', getPanoramas)
  app.delete('/panorama/:id', deletePanorama)
  app.post('/connection', createConnection)
  app.delete('/connection', deleteConnection)

  app.post('/image', uploadImage)
  app.delete('/image/:key', deleteImage)
  app.post('/all-images', uploadAllImages)
  app.delete('/all-images', deleteAllImages)

  app.post('/note', createNote)
  app.post('/notes', createNotes)
  app.get('/notes', getNotes)
  app.get('/note/:id', getNote)
  app.put('/note/:id', updateNote)
  app.post('/note/markup', createNoteMarkup)
  app.delete('/note/markup', deleteNoteMarkup)
}
