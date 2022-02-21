export interface UseCaseFunction<I, O> {
  execute(value: I): O
}
