export const roles = ["Administrateur", "Gestionnaire", "Releveur", "Caissier"]

export class User {
  email!: string
  roles!: number[]
  active: boolean = false
  clientId!: string
  get roleLabel(): string[] {
    return this.roles
      .map(role => {
        switch (role) {
          case 0: return roles[0]
          case 1: return roles[1]
          case 2: return roles[2]
          case 3: return roles[3]
          default: return ""
        }
      })
  }
}