import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.equipment.createMany({
    data: [
      {
        name: 'equipment-1',
        description: 'equipment 1',
        tag: 'A-1111-BB-111',
        photos: ['http://file/equipment-1'],
      },
      {
        name: 'equipment-2',
        description: 'equipment 2',
        tag: 'A-1111-BB-222',
        photos: ['http://file/equipment-2'],
      },
      {
        name: 'equipment-3',
        description: 'equipment 3',
        tag: 'A-1111-BB-333',
        photos: ['http://file/equipment-3'],
      },
    ],
  })

  const equipments = await prisma.equipment.findMany()

  await prisma.panorama.create({
    data: {
      name: 'panorama-1',
      image: 'http://file/panorama-1',
      gps_x: 100,
      gps_y: 150,
      markings: {
        create: [
          {
            equipment_id: equipments[0].id,
            coord_x: 400,
            coord_y: 500,
          },
          {
            equipment_id: equipments[1].id,
            coord_x: 100,
            coord_y: 300,
          },
        ],
      },
    },
    include: { markings: true },
  })

  await prisma.panorama.create({
    data: {
      name: 'panorama-2',
      image: 'http://file/panorama-2',
      gps_x: 200,
      gps_y: 250,
      markings: {
        create: [
          {
            equipment_id: equipments[1].id,
            coord_x: 500,
            coord_y: 600,
          },
          {
            equipment_id: equipments[2].id,
            coord_x: 200,
            coord_y: 340,
          },
        ],
      },
    },
    include: { markings: true },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
