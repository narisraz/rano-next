export type Role = "A" | "G" | "R" | "C"

export class User {
  email!: string
  role!: Role
  active: boolean = false
  clientId!: string
  get roleLabel(): string {
    switch (this.role) {
      case "A": return "Administrateur"
      case "G": return "Gestionnaire"
      case "R": return "Releveur"
      case "C": return "Caissier"
      default: return ""
    }
  }
}