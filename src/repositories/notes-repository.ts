export type Note = {
  createdAt: Date
  id: string
  description: string
  equipment_tag: string
  author: string
  opportunity: number
  equipmentId: string | null
  panoramaId: string | null
  coord_x: number | null
  coord_y: number | null
}

export type Coordinates = {
  panoramaId: string
  noteId: string
  coord_x: number | null
  coord_y: number | null
}

export interface NotesRepository {
  create(note: Note): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Note | null>
  findMany(): Promise<Note[] | null>
  createMany(notes: Note[]): Promise<void>
  update(updatedNote: Note): Promise<void>
}
