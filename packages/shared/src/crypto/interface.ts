export interface ICryproUtils {
  createKeyPair(): Promise<CreateKeyPairRes>;
  encrypt(req: EncryptReq): Promise<string>;
  decrypt(req: DecryptReq): Promise<string>;
  eMailSha512(email: string): Promise<string>;
}

export interface CreateKeyPairRes {
  masterKeyWrappedPrivateKey: string;
  publicKey: string;
}

export interface EncryptReq {
  publicKey: string;
  toEncrypt: string;
}

export interface DecryptReq {
  masterKeyWrappedPrivateKey: string;
  toDecrypt: string;
}
