import models from '../models';

const {
    User,
    Article
} = models;

const findUserById = async (id) => {
    return await User.findOne({
        where: {
            user_id: id,
        },
        attributes: ['user_id', 'email', 'firstName', 'lastName'],
        include: [{
            model: Article
        }]
    })
}

const deleteUserByAdmin = async (id) => {
    return await User.destroy({
        where: {
            user_id: id,
        }
    })
}

export default {
    findUserById,
    deleteUserByAdmin
}