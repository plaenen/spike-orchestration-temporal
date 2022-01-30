export type DocumentReference = {
    store: DocumentStore
    urn: string
}

export enum DocumentStore {
    CRM,
    S3,
}