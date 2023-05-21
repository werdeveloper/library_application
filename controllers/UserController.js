const UsersModel = require('../models/user'),
    createError = require('http-errors'),
    { signupAuthSchema } = require('../services/validation_schema'),
    BcryptService = new (require('../services/bcrypt.service'))();

class UsersController {
    
    constructor() {
        // this._DBService = new services.DBService();
    }

    allUsers(req, res, next) {
        try {
            // get use data from database
            UsersModel.find(
                {},
                { _id: 1, name: 1, email: 1, phone: 1, createdAt: 1 })
                .then(async (rows) => {
                    if (rows === null) {
                        res.status(400).json({
                            error: `Something wrong! Not able to get data from server.`,
                            message: `Something wrong! Not able to get data from server.`,
                            data: {}
                        });
                    } else {
                        res.status(200).json({
                            error: null,
                            message: 'All users data is getting successfully.',
                            data: rows
                        });
                    }
                })
                .catch((err) => {
                    if (!!err) {
                        res.status(400).json({
                            error: `${err.code} - ${err.message}`,
                            message: err.message,
                            data: {}
                        });
                    }
                });
        } catch (err) {
            next(err);
        }
    }

    userDetail(req, res, next) {
        // Validate request
        if (!req.params.userId) {
            return res.status(400).json({
                error: null,
                message: "User Id is required",
                data: {}
            });
        }
        // get use data with userId
        UsersModel.findById(req.params.userId)
            .then(usertDetails => {
                if (!usertDetails) {
                    return res.status(400).json({
                        error: null,
                        message: "User not found with id " + req.params.userId,
                        data: {}
                    });
                }
                return res.status(200).json({
                    error: null,
                    message: "User details found",
                    data: usertDetails
                });
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(400).json({
                        error: null,
                        message: "User not found with id " + req.params.userId,
                        data: {}
                    });
                }
                return res.status(500).json({
                    error: null,
                    message: "Error retrieving note with id " + req.params.noteId,
                    data: {}
                });
            });
    }

    async userUpdate(req, res, next) {
        // Validate request
        if (!req.params.userId) {
            return res.status(400).json({
                error: null,
                message: "User Id field required",
                data: {}
            });
        }
        const { name, email, password, phone } = req.body;
        // update use data with userId
        const hashPassword = await new BcryptService().generateHash((password || '').trim());
        const updateData = {
            name: (name || '').trim(),
            email: (email || '').trim(),
            phone: (phone || '').trim(),
            password: hashPassword.data
        };
        UsersModel.findByIdAndUpdate(req.params.userId, updateData, { new: true })
            .then(note => {
                if (!note) {
                    return res.status(400).json({
                        error: null,
                        message: "User not found with id " + req.params.userId,
                        data: {}
                    });
                }
                return res.status(200).json({
                    error: null,
                    message: "User detail updated",
                    data: {}
                });
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        error: null,
                        message: "User not found with id " + req.params.userId,
                        data: {}
                    });
                }
                return res.status(400).json({
                    error: null,
                    message: "Error updating user with id " + req.params.userId,
                    data: {}
                });
            });
    }

    deleteUser(req, res, next) {
        // Validate request
        if (!req.params.userId) {
            return res.status(400).json({
                error: null,
                message: "User Id is required",
                data: {}
            });
        }
        // delete use data with userId
        UsersModel.findByIdAndRemove(req.params.userId)
            .then(note => {
                if (!note) {
                    return res.status(404).json({
                        error: null,
                        message: "User not found with id " + req.params.userId,
                        data: {}
                    });
                }
                return res.status(200).json({
                    error: null,
                    message: "User deleted successfully!",
                    data: {}
                });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).json({
                        error: null,
                        message: "User not found with id " + req.params.userId,
                        data: {}
                    });
                }
                return res.status(500).json({
                    error: err,
                    message: "Could not delete user with id " + req.params.userId,
                    data: {}
                });
            });
    }

    async createUser(req, res, next) {
        // Validate request
        const validationResult = await signupAuthSchema.validateAsync(req.body);
        // Check Email alreasy exist
        const doesExist = await UsersModel.findOne({ email: validationResult.email });
        if (doesExist) {
            throw new createError.Conflict(`${validationResult.email} is already been registered`);
        }
        // Save use data in the database
        const userDB = new UsersModel(validationResult),
            saveUser = await userDB.save();
        res.send(saveUser);
    }

}

module.exports = UsersController;
