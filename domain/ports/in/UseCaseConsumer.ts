export interface UseCaseConsumer<I> {
  execute(input: I): void
}
