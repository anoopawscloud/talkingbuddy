import React from 'react';
import { Linkedin, LinkedinIcon } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const AboutPage = async () => {
    return (

        <div className="h-full p-4 space-y-2">
            <h3 className="text-lg font-bold">About Me</h3>
            <div className="flex items-center space-x-4">  
            <Avatar className = "h-14 w-14 justify-center">
                <AvatarImage src="profile_pic.jpg" alt="Anoop Kumar" />
            </Avatar>
            <div className="h-full w-full justify-end">
            <p className="text-md font-medium">Anoop Kumar</p>
            <p className="text-sm">Creator of talking Buddy</p>
            <div>
            <a href="https://www.linkedin.com/in/anoop4bhat/" target="_blank" rel="noopener noreferrer">
            <LinkedInLogoIcon style={{ fontSize: '200px' }} />
            </a>
            </div>
            </div>
            </div>

        </div>


        /*
        <div className="h-full p-4 space-y-2">
            <h3 className="text-lg font-medium">About Me</h3>
            <div className="flex items-center space-x-4">  

            <Avatar>
                <AvatarImage src="profile_pic.jpg" alt="Anoop Kumar" />
                <AvatarFallback>Anoop Kumar</AvatarFallback>
            </Avatar>


                <div>
                    <p className="text-sm">Anoop Kumar</p>
                    <p className="text-sm">Creator of talking Buddy</p>
                </div>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/anoop4bhat/" target="_blank" rel="noopener noreferrer">
                    <LinkedInLogoIcon style={{ fontSize: '200px' }} />
                </a>
            </div>

        </div> */
    );
};

export default AboutPage;
