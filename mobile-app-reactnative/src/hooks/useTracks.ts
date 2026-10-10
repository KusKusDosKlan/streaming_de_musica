/** TODO: sincronizar catálogo paginado da API com estados de loading/erro. */
export function useTracks() {
  return {tracks: [] as Array<{id: number; title: string}>, isLoading: false};
}
