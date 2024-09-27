import React from 'react'
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react"
import { Button } from "@/components/ui/button"
import { LogOut, User2, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom';

//import { AvatarImage, AvatarFallback } from '@shadcn/ui';



const Navbar = () => {
    const user = false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl front-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium item-center gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                        {/* <li><Link>Home</Link></li>
                    <li><Link>Jobs</Link></li>
                    <li><Link>Browse</Link></li> */}
                    </ul>
                    {
                        !user ? (
                            <div>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className='bg-[#6A38C2] hover:bg-[#321a5c]'>Signup</Button></Link>

                            </div>
                        ) :
                            <Popover className="cursor-pointer">
                                <PopoverHandler>
                                    <img

                                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                                        alt="avatar"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </PopoverHandler>
                                <PopoverContent>
                                    <div className='h-400 w-200 '>
                                        <div className="flex gap-4 space-y-2  mt-2 ml-2 mb-2">
                                            <img

                                                src="https://docs.material-tailwind.com/img/face-2.jpg"
                                                alt="avatar"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className='font-medium'>Lovely</h4>
                                                <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur </p>
                                            </div>


                                        </div>
                                        <div className='flex flex-col gap-3 my-2 text-gray-600'>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer ml-1'>
                                                <User2 />
                                                <Button variant="link">View Profile</Button>
                                            </div>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer ml-1'>
                                                <LogOut />
                                                <Button variant="link">Logout</Button>
                                            </div>

                                        </div>

                                    </div>
                                </PopoverContent>
                            </Popover>
                    }

                </div>
            </div>


        </div>
    )
}

export default Navbar
