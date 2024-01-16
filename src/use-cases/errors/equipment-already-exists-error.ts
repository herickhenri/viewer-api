export class EquipmentAlreadyExistsError extends Error {
  constructor() {
    super('Equipment already exists.')
  }
}
