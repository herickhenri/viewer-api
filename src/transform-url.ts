import { prisma } from './lib/prisma'

async function transformUrl() {
  const panoramas = await prisma.panorama.findMany()

  panoramas.forEach(async (panorama) => {
    const oldUrl = 'https://pub-ec318445d19f425d8b074a74a5f687c8.r2.dev/'
    const newUrl = 'https://www.area-viewer.com/'

    const newImageLink = panorama.image_link.replace(oldUrl, newUrl)

    await prisma.panorama.update({
      where: { id: panorama.id },
      data: { image_link: newImageLink },
    })
  })
}

transformUrl()
