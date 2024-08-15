import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import path from 'node:path'

describe('Delete Note Markup (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to delete note', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )

    const note_id = 'example-id'
    await request(app.server).post('/note').send({
      author: 'Jhon',
      created_at: new Date(),
      description: 'Example description',
      equipment_tag: 'A-1111-BB-222',
      id: note_id,
      opportunity: 0,
    })

    const responsePanorama = await request(app.server)
      .post('/panorama')
      .field('name', 'panorama-1')
      .attach('file', filePath)

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
