import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import path from 'node:path'

describe('Update Equipment (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to update equipment', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )

    const createResponse = await request(app.server)
      .post('/equipment')
      .field('name', 'Example-equipment')
      .field('description', 'Example-description')
      .field('tag', 'A-1111-BB-222')
      .attach('image-example', filePath)
    const { id }: { id: string } = createResponse.body.equipment

    const updateEquipment = {
      name: 'New name example',
    }

    const response = await request(app.server)
      .patch(`/equipment/${id}`)
      .send(updateEquipment)

    expect(response.statusCode).toEqual(200)
    expect(response.body.equipment.name).toEqual('New name example')
  })
})
