import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button, Radio } from "@material-tailwind/react";
import React, { useState } from 'react'
import Navbar from "../shared/Navbar"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { Link } from "react-router-dom";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const SubmitHandler = async (e) => {
        e.preventDefault();
        console.log(input);


    }
    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center max-w-7x1 mx-auto'>
                <form onSubmit={SubmitHandler} className="w-1/2 borderborder border-gray-500 rounded-md p-4 my-10">
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="text"
                            placeholder="xyz@gmail.com"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                        ></Input>
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input
                            type="text"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="password"
                        ></Input>
                    </div>
                    <div className="flex items-center justify-between p-10">
                        <RadioGroup className="flex items-center gap-4 my-5" defaultValue="comfortable">
                            <div className="flex items-center space-x-2 ">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2 ">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full my-4 ">Sign Up</Button>
                    <span className="text-sm">Don't have an account?<Link to="/signup" className='text-blue=600'>Login</Link></span>

                </form>

            </div>

        </div >
    )
}

export default Login
