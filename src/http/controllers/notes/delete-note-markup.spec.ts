import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete Note Markup (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to delete note', async () => {
    const note_id = '12345678'
    await request(app.server).post('/note').send({
      author: 'Jhon',
      createdAt: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id: note_id,
      opportunity: 0,
    })
    const responsePanorama = await request(app.server).post('/panorama').send({
      name: 'panorama-1',
      image_link: 'example-link',
      image_key: 'example-key',
      gps_x: 100,
      gps_y: 150,
    })
    const { id: panorama_id }: { id: string } = responsePanorama.body.panorama

    await request(app.server).post('/note/markup').send({
      panorama_id,
      note_id,
      coord_x: 100,
      coord_y: 100,
    })

    const response = await request(app.server).delete('/note/markup').send({
      panorama_id,
      note_id,
    })

    expect(response.statusCode).toEqual(204)
  })
})
