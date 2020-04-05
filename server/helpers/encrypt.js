import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
    const rounds = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, rounds)
}
const comparePassword = (password, hash) => {
    const equals = bcrypt.compareSync(password, hash)
    return Promise.resolve(equals)
}

export {
    hashPassword,
    comparePassword
}