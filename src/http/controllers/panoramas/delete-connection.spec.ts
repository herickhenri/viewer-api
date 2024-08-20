import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import path from 'node:path'

describe('Delete Connection (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to delete connection', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )

    const firstPanoramaResponse = await request(app.server)
      .post('/panorama')
      .field('name', 'panorama-1')
      .attach('file', filePath)

    const secondPanoramaResponse = await request(app.server)
      .post('/panorama')
      .field('name', 'panorama-2')
      .attach('file', filePath)

    const firstPanoramaId = firstPanoramaResponse.body.panorama.id
    const secondPanoramaId = secondPanoramaResponse.body.panorama.id

    await request(app.server)
      .post('/connection')
      .send({
        connections: [
          {
            yaw: 100,
            pitch: 100,
            connected_from_id: firstPanoramaId,
            connected_to_id: secondPanoramaId,
          },
          {
            yaw: 100,
            pitch: 100,
            connected_from_id: secondPanoramaId,
            connected_to_id: firstPanoramaId,
          },
        ],
      })

    const response = await request(app.server)
      .delete('/connection')
      .send({
        connectionsIds: [
          {
            connected_from_id: firstPanoramaId,
            connected_to_id: secondPanoramaId,
          },
          {
            connected_from_id: secondPanoramaId,
            connected_to_id: firstPanoramaId,
          },
        ],
      })

    expect(response.statusCode).toEqual(204)
  })
})
