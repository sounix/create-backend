import httpStatus from "http-status";

import usersModel from "../models/User";

export default {
    async getUserById(req, res){
        try {
            let {id} = req.params;

            if(id){
                let data = await userModel.findOne({where: {id}});
    
                let msg = (data) ? 'User found' : 'User not found';
                
                res.json({msg, data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({msg: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            res
            .status(httpStatus.CONFLICT)
            .json({msg: 'Sometimes things go wrong :(', err});
        }
    },
    async getUsers(req, res){
        try {
            let data = await userModel.findAll();

            let msg = (data.length > 0) ? 'Users found' : 'There are no users';

            res.json({msg, data});
        } catch (err) {
            res
            .status(httpStatus.CONFLICT)
            .json({msg: 'Sometimes things go wrong :(', err});
        }
    },
    async newUser(req, res){
        try {
            let { name, email } = req.body;
            
            if(name && email){
                let data = await userModel.create({name, email});

                res.json({msg: 'User added, returning added user id', id: data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({msg: 'You did not specified all needed parameters'});
            }
        } catch (error) {
            res
            .status(httpStatus.CONFLICT)
            .json({msg: 'Adding user failed', data});
        }
    },
    async updateUser(req, res){
        try {
            let { id, name, email } = req.body;
            
            if(id && name && email){
                let data = await userModel.updateUser({name, email}, {where:{id}});

                res.json({msg: 'User updated successfully', data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({msg: 'You did not specified all needed parameters'});
            }
        } catch (error) {
            res
            .status(httpStatus.CONFLICT)
            .json({msg: 'Could not update user', err});            
        }
    },
    async deleteUser(req, res){
        try {
            let { id } = req.params;

            if(id){
                let data = await userModel.destroy({where: {id}});

                res.json({msg: 'User deleted', data});
            } else{
                res
                .status(httpStatus.BAD_REQUEST)
                .json({msg: 'You did not specified all needed parameters'});
            }
        } catch(err) {
            res
            .status(httpStatus.CONFLICT)
            .json({msg: "Deleting user failed", err});
        }
    }
}