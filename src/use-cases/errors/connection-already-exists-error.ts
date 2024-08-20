export class ConnectionAlreadyExistsError extends Error {
  constructor() {
    super('Connection already exists.')
  }
}
