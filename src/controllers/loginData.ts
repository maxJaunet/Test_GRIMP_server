import e, { Request, Response } from 'express';
import Admin from '../models/admin'


export const createAdmin = async (req: Request, res: Response) => {
  const userData = req.body;
  const newAdmin = new Admin(userData);
  try {
    await newAdmin.save();
    res.status(201).json(newAdmin);
    console.log('createAdmin function successful')
  } catch (error: unknown) {
    res.status(409).json({ message: String(error) })
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  const adminId = req.params.adminId;
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    res.status(200).json('Admon deleted successfully')
  } catch (error: unknown) {
    res.status(403).json({message: String(error)})
  }
}

export const checkLoginData = async (req: Request, res: Response) => {
  const sentData = req.body;
    const foundUser = await Admin.findOne({ email: sentData.email }, (_err: any, docs: { password: string; }) => {
      if (docs && docs.password === sentData.password) {
        res.send({
          message: 'email and password are correct',
          isValid: true
        })
      }
      else {
        res.send({
          message: 'incorrect user email or password',
          isValid: false
        })
      }
    })
}