import {
  constants,
  publicEncrypt,
  generateKeyPairSync,
  randomBytes,
  pbkdf2Sync,
  createCipheriv,
  privateDecrypt,
  createDecipheriv
} from 'crypto';
import { CreateKeyPairRes, EncryptReq, ICryproUtils, DecryptReq } from './interface';

type GenerateRsa4096KeyPairRes = {
  privateKey: string;
  publicKey: string;
};

export class MasterKeyRequiredError extends Error {
  constructor() {
    super('Pleaese provide a vcalid masterkey');
  }
}

export class EmailHasSaltRequiredError extends Error {
  constructor() {
    super('Pleaese provide a vcalid salt for email hashing');
  }
}

export class CryptoUtils implements ICryproUtils {
  private PADDING = constants.RSA_PKCS1_OAEP_PADDING;
  private masterWrappingKey: string;
  private emailHashSalt: string;

  constructor(masterWrappingKey: string, emailHashSalt: string) {
    if (!masterWrappingKey || masterWrappingKey.length == 0) throw new MasterKeyRequiredError();

    this.masterWrappingKey = masterWrappingKey;

    if (!emailHashSalt || emailHashSalt.length == 0) throw new EmailHasSaltRequiredError();

    this.emailHashSalt = emailHashSalt;
  }

  public async createKeyPair(): Promise<CreateKeyPairRes> {
    const { privateKey, publicKey } = this.generateRsa4096KeyPair();

    const wrappedPk = this.wrapPrivateKey(privateKey, this.masterWrappingKey);
    return {
      masterKeyWrappedPrivateKey: wrappedPk,
      publicKey
    };
  }

  public async encrypt(req: EncryptReq): Promise<string> {
    const et = publicEncrypt(
      {
        key: Buffer.from(req.publicKey),
        padding: this.PADDING,
        oaepHash: 'sha256'
      },
      Buffer.from(req.toEncrypt)
    );
    return et.toString('base64');
  }

  public async decrypt(req: DecryptReq): Promise<string> {
    const pk = this.unWrapPk(req.masterKeyWrappedPrivateKey, this.masterWrappingKey);

    const dt = privateDecrypt(
      {
        key: Buffer.from(pk),
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      Buffer.from(req.toDecrypt, 'base64')
    );

    return dt.toString();
  }

  public async eMailSha512(email: string): Promise<string> {
    return this.sha512(email, this.emailHashSalt);
  }

  protected sha512(toHash: string, salt: string): string {
    return pbkdf2Sync(toHash, salt, 1000, 64, `sha512`).toString(`hex`);
  }

  protected unWrapPk(privateKey_e: string, masterKey: string): string {
    const encrypted = Buffer.from(privateKey_e, 'base64');
    const salt_len = 16;
    const iv_len = 16;

    const salt = encrypted.slice(0, salt_len);
    const iv = encrypted.slice(0 + salt_len, salt_len + iv_len);
    const key = pbkdf2Sync(masterKey, salt, 100000, 256 / 8, 'sha256');
    const toDecrypt = encrypted.slice(salt_len + iv_len);

    const decipher = createDecipheriv('aes-256-cbc', key, iv);

    decipher.write(toDecrypt);
    decipher.end();

    const decrypted = decipher.read();
    return decrypted.toString();
  }

  protected generateRsa4096KeyPair(): GenerateRsa4096KeyPairRes {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096
    });

    const pk = privateKey
      .export({
        format: 'pem',
        type: 'pkcs1'
      })
      .toString('base64');

    const pbk = publicKey
      .export({
        format: 'pem',
        type: 'pkcs1'
      })
      .toString('base64');

    return {
      privateKey: pk,
      publicKey: pbk
    };
  }

  protected wrapPrivateKey(pk: string, masterKey: string): string {
    const salt = randomBytes(16);
    const iv = randomBytes(16);
    const key = pbkdf2Sync(masterKey, salt, 100000, 256 / 8, 'sha256');

    const cipher = createCipheriv('aes-256-cbc', key, iv);

    cipher.write(pk);
    cipher.end();

    const encrypted = cipher.read();

    // Wrap a private key and return a salt + iv + encryptedPk
    const concatenned = Buffer.concat([salt, iv, encrypted]).toString('base64');

    return concatenned;
  }
}
