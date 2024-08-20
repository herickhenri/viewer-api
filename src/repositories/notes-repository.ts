export type Note = {
  id: string
  created_at: Date
  description: string
  equipment_tag: string
  author: string
  opportunity: number
  equipment_id: string | null
  panoramas?: {
    panorama_id: string
    yaw: number
    pitch: number
  }[]
}

export type NoteInput = {
  created_at: Date
  id: string
  description: string
  equipment_tag: string
  author: string
  opportunity: number
  equipment_id: string | null
}

export type NotesOnPanoramasInput = {
  panorama_id: string
  note_id: string
  yaw: number
  pitch: number
}

export type DeleteMarkupRequest = {
  note_id: string
  panorama_id: string
}

export interface NotesRepository {
  create(note: Note): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Note | null>
  findMany(): Promise<Note[] | null>
  createMany(notes: Note[]): Promise<void>
  update(updatedNote: NoteInput): Promise<void>
  createMarkup(input: NotesOnPanoramasInput): Promise<void>
  deleteMarkup({ note_id, panorama_id }: DeleteMarkupRequest): Promise<void>
}
