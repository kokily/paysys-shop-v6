export interface AddSignPayload {
  weddingId: string;
  sex: string;
  image: string;
}

export interface RemoveSignPayload {
  weddingId: string;
  sex: 'husband' | 'bride';
}

export interface SignModalPayload {
  type: 'husband' | 'bride';
  weddingId: string;
}
