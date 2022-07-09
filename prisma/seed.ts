import { PrismaClient } from '@prisma/client'

import * as countriesJSON from './seed-data/countries.json'
import * as fieldsJSON from './seed-data/fields.json'
import * as specializationsJSON from './seed-data/specializations.json'
import * as topicsJSON from './seed-data/topics.json'
import * as resourceTypesJSON from './seed-data/resource-types.json'

const prisma = new PrismaClient()

async function main() {
  // countries
  await prisma.country.createMany({ data: countriesJSON })

  // fields
  fieldsJSON.forEach(async (field) => {
    const createdField = await prisma.field.create({
      data: {
        name: field.name,
      },
    })

    // specializations
    specializationsJSON[field.name as keyof typeof specializationsJSON].forEach(
      async (spec) => {
        const createdSpec = await prisma.specialization.create({
          data: {
            name: spec.name,
            field: { connect: { id: createdField.id } },
          },
          include: { field: true },
        })

        // topics
        topicsJSON[spec.name as keyof typeof topicsJSON].forEach(
          async (topic) => {
            await prisma.topic.create({
              data: {
                name: topic.name,
                specialization: {
                  connect: { id: createdSpec.id },
                },
              },
              include: { specialization: { include: { field: true } } },
            })
          },
        )
      },
    )
  })

  // resource types
  await prisma.resourceType.createMany({ data: resourceTypesJSON })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
