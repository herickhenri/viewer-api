import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Notes (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to get notes', async () => {
    const response = await request(app.server).get('/notes')

    expect(response.statusCode).toEqual(200)
  })
})
