import { EmailHasSaltRequiredError, MasterKeyRequiredError } from './crypto';
import { CryptoUtils } from './index';
import { ICryproUtils } from './interface';

let crypto: ICryproUtils;
const masterWrappingKey = 'MY_MASTER_KEY';
const emailHashSalt = 'MY_SECRET_SALT';

beforeAll(() => {
  crypto = new CryptoUtils(masterWrappingKey, emailHashSalt);
});

it('should fail to create an crypto utils modele without providing a master key or email salt', () => {
  try {
    new CryptoUtils('', '');
  } catch (err) {
    expect(err).toBeInstanceOf(MasterKeyRequiredError);
  }
  try {
    new CryptoUtils(masterWrappingKey, '');
  } catch (err) {
    expect(err).toBeInstanceOf(EmailHasSaltRequiredError);
  }
});

it('should be possible to encrypt / decrypt with a generated public key', async () => {
  const given = 'my_secret_email@secret.com';

  // Create new key-pair
  const { masterKeyWrappedPrivateKey, publicKey } = await crypto.createKeyPair();

  // Use public key to encrypt a text
  const given_e = await crypto.encrypt({
    publicKey,
    toEncrypt: given
  });

  // Decrypt an encrypted text
  const decrypted = await crypto.decrypt({
    masterKeyWrappedPrivateKey,
    toDecrypt: given_e
  });
  expect(given).toEqual(decrypted);
});

it('should be possible to hash an email with salting', async () => {
  const encrypted = await crypto.eMailSha512('pascal@laenen.com');
  // https://stuff.birkenstab.de/pbkdf2/
  // itterations =1000, dklen = 64
  expect(encrypted).toBe(
    '67e5c5658bdacd31d1effd3faca1efb2e42b47c660a4df706fdfb55ee5e990c7591cff1f4e8102b386a11c1731a81bc9bde1934d5754b87f323243ae1be91957'
  );
});
