import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Connection (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to create connection', async () => {
    const firstPanoramaResponse = await request(app.server)
      .post('/panorama')
      .send({
        name: 'panorama-1',
        image_link: 'example-link',
        image_key: 'example-key',
      })
    const secondPanoramaResponse = await request(app.server)
      .post('/panorama')
      .send({
        name: 'panorama-1',
        image_link: 'example-link',
        image_key: 'example-key',
      })

    const firstPanoramaId = firstPanoramaResponse.body.panorama.id
    const secondPanoramaId = secondPanoramaResponse.body.panorama.id

    const response = await request(app.server)
      .post('/connection')
      .send({
        connection: [
          {
            panorama_id: firstPanoramaId,
            panorama_connect_id: secondPanoramaId,
            coord_x: 100,
            coord_y: 100,
          },
          {
            panorama_id: secondPanoramaId,
            panorama_connect_id: firstPanoramaId,
            coord_x: 100,
            coord_y: 100,
          },
        ],
      })

    expect(response.statusCode).toEqual(201)
  })
})
