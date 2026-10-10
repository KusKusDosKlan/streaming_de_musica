import {apiClient} from './apiClient';

export type TrackSummary = {id: number; title: string; durationSeconds: number};

/** TODO: alinhar o formato de resposta com o contrato final do backend. */
export async function listTracks(search = ''): Promise<TrackSummary[]> {
  const response = await apiClient.get<TrackSummary[]>('/tracks', {params: {search}});
  return response.data;
}
