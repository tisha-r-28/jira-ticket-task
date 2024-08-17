const express = require('express');
const router = express.Router();

const User = require('../models/User');
const errorHandler = require('../middlewares/errorHandler');
const authUser = require('../middlewares/authentication');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

//ROUTE - 1 Register the user 
router.post('/register', errorHandler, async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        let status = false;
        if(!email || !password){
            return res.status(400).json({
                code : 400,
                message : 'password and email are required!',
                status
            })
        };
        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({
                code : 400,
                message : 'user with provided email is already exist!',
                status
            })
        };
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fname,
            lname,
            email,
            password : hashPassword
        });
        if(!user){
            return res.status(204).json({
                code : 204,
                message : 'error while creating an user!',
                status
            })
        };
        return res.status(201).json({
            code : 201,
            message : 'user registered successfully!',
            status : true,
            user : {
                fname : user.fname,
                lname : user.lname,
                email : user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`,
            status : false
        });
    }
})

//ROUTE - 2 Log-in
router.post('/login', errorHandler, async (req, res) => {
    try {
        let status = false;
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                code : 400,
                message : 'password and email are required!',
                status
            })
        };
        const existUser = await User.findOne({email});
        if(!existUser){
            return res.status(404).json({
                code : 404,
                message : 'no user available with provided email!',
                status
            })
        };
        const comparePassword = await bcrypt.compare(password, existUser.password);
        if(!comparePassword){
            return res.status(400).json({
                code : 400,
                message : 'Enter valid password!',
                status
            })
        };
        const payload = {
            user : {
                email : existUser.email
            }
        };
        const authToken = await jwt.sign(payload, process.env.JSON_SECRET_KEY, { expiresIn : '20m'});
        if(!authToken){
            return res.status(500).json({
                code : 500,
                message : 'some error occured while generating token!',
                status
            })
        }
        return res.status(200).json({
            code : 200,
            message : 'user login successfully',
            token : authToken,
            status : true
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`,
            status : false
        })
    }
})

//ROUTE - 3 Change password
router.post('/change-password', authUser, async (req, res) => {
    try {
        let status = false;
        const authEmail = req.user.email;
        const { oldPassword, newPassword } = req.body;
        if(!authEmail){
            return res.status(404).json({
                code : 404,
                message : `user email is not available!`,
                status
            })
        }
        const user = await User.findOne({email : authEmail});
        if(!user){
            return res.status(404).json({
                code : 404,
                message : `user not found with provided email!`,
                status
            })
        }
        const comparePassword = await bcrypt.compare(oldPassword, user.password);
        if(!comparePassword){
            return res.status(400).json({
                code : 400,
                message : `enter valid password!`,
                status
            })
        }
        if(oldPassword === newPassword){
            return res.status(400).json({
                code : 400,
                message : `password must be different then previous!`,
                status
            })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        if(!hashPassword){
            return res.status(500).json({
                code : 500,
                message : `error for hash password generating`,
                status
            })
        }
        user.password = hashPassword;
        user.save()
        return res.status(200).json({
            code : 200,
            message : 'password updated successfully!',
            data : {
                fname : user.fname,
                lname : user.lname,
                email : user.email
            },
            status : true
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`,
            status : false
        })
    }
})

//ROUTE - 4 Forget Password
// router.post('/forget-password', async ( req, res ) => {
//     try {
//         const { email } = req.body;
//         if(!email){
//             return res.status(400).json({
//                 code : 400,
//                 message : `email is require!`
//             }) 
//         }
//         const user = await User.findOne({email : email});
//         if(!user){
//             return res.status(404).json({
//                 code : 404,
//                 message : `user is not available with provided email!`
//             })
//         }
//         const payload = {
//             user : {
//                 id : user._id,
//                 email : user.email
//             }
//         }
//         const resetToken = await jwt.sign(payload, process.env.JSON_SECRET_KEY);
//         if(!resetToken){
//             return res.status(500).json({
//                 code : 500,
//                 message : `error while generating the reset token!`
//             })
//         }
//         const resetPassLink = `http://localhost:${process.env.PORT || 8001}/reset-password?token=${resetToken}`

//         const transporter = nodemailer.createTransport({
//             host: 'smtp.ethereal.email',
//             port: 587,
//             auth: {
//                 user: 'kiara.gaylord@ethereal.email',
//                 pass: 'dMpCACMcP68nrD6Gr2'
//             }
//         });

//         const mailOptions = {
//             from : 'kiara.gaylord@ethereal.email',
//             to : user.email,
//             subject : 'Password Reset Request',
//             html : `<p>Click on this link to : <a href=${resetPassLink}>Reset your password</a></p>`
//         }

//         await transporter.sendMail(mailOptions);
//         return res.status(200).json({
//             code: 200,
//             message: 'Password reset link sent to your email'
//         });

//     } catch (error) {
//         return res.status(500).json({
//             code : 500,
//             message : `internal server error : ${error.message}`
//         })
//     }
// })


module.exports = router;