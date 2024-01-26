import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Panorama (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('shoud be able to update panorama', async () => {
    const createResponse = await request(app.server).post('/panorama').send({
      name: 'panorama-1',
      image_link: 'example-link',
      image_key: 'example-key',
      gps_x: 100,
      gps_y: 150,
    })
    const { id }: { id: string } = createResponse.body.panorama
    const updatePanorama = {
      name: 'panorama-2',
    }

    const response = await request(app.server)
      .patch(`/panorama/${id}`)
      .send(updatePanorama)

    expect(response.statusCode).toEqual(200)
    expect(response.body.panorama.name).toEqual('panorama-2')
  })
})
