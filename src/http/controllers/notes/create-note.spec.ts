import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Note (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to create note', async () => {
    const response = await request(app.server).post('/note').send({
      author: 'Jhon',
      createdAt: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id: '12345678',
      opportunity: 0,
    })

    expect(response.statusCode).toEqual(201)
  })
})
