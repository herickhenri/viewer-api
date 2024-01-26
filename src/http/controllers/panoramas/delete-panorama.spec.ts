import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete Panorama (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to delete panorama', async () => {
    const createResponse = await request(app.server).post('/panorama').send({
      name: 'panorama-1',
      image_link: 'example-link',
      image_key: 'example-key',
      gps_x: 100,
      gps_y: 150,
    })
    const { id }: { id: string } = createResponse.body.panorama

    const response = await request(app.server).delete(`/panorama/${id}`)

    expect(response.statusCode).toEqual(204)
  })
})
