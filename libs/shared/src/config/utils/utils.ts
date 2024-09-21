import { scrypt as _scrypt, randomBytes } from 'crypto'

const promisify = f => (...args: any) => new Promise((a, b) => f(...args, (err, res) => err ? b(err) : a(res)));
const scrypt = promisify(_scrypt)

export class AuthUtils {

    static saltify = () => {
        return randomBytes(8).toString('hex')
    }
    static hash = async (password: string, salt: string) => {
        const h = (await scrypt(password, salt, 32)) as Buffer
        return h.toString('hex')
    }

    static encrypt = (salt: string, hash: string) => salt +  '.' + hash
}