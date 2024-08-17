import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { apiclient } from '@/lib/api-client'
import { SEARCH_CONTACTS } from '@/utils/constants.js'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'
import { useAppStore } from '@/store'


const Newmessage = () => {
    const { setSelectedChatType, setSelectedChatData } = useAppStore();
    const [openContact, setOpenContact] = useState(false);
    const [searchContact, setSearchContact] = useState([]);

    const selectContact = (contact) => {
        setOpenContact(false);
        setSelectedChatType('contact');
        setSelectedChatData(contact);
        setSearchContact([]);
    }

    const searchedContact = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const res = await apiclient.post(SEARCH_CONTACTS, { searchTerm }, { withCredentials: true });
                if (res.status === 200 && res.data.contact) {
                    setSearchContact(res.data.contact);
                }
            } else {
                setSearchContact([]);
            }
        } catch (error) {
            console.error({ error });
        }
    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start
                     hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={() => setOpenContact(true)} />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#78ee72] border-none mb-2 p-3 text-black " >
                        Add contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={openContact} onOpenChange={setOpenContact}>

                <DialogContent className="bg-[#d1e67f] border-none text-black/100 w-[400px] h-[400px] flex flex-col" >
                    <DialogHeader>
                        <DialogTitle>Please select contcts</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input placeholder="Search Contacts" className="rounded-lg p-6 bg-[#fefefe] "
                            onChange={(e) => searchedContact(e.target.value)} />
                    </div>

                    {
                        searchContact.length > 0 && (
                            <ScrollArea className="h-[250px]">
                                <div className="flex flex-col gap-5">
                                    {searchContact.map((contact) => ( <div key={contact._id} className='flex gap-3 cursor-pointer items-center hover:bg-[#ffffff] p-2 rounded-xl'
                                        onClick={() => selectContact(contact)}>
                                        <div className='h-12 w-12 relative'>
                                            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                {
                                                    contact.image ? (<AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-[black]" />) : (
                                                        <div className={`uppercase h-12 w-12 text-3xl border-[1px] flex  items-center justify-center rounded-full ${getColor(contact.color)}`}>
                                                            {contact.firstName ? contact.firstName.split("").shift() : contact.email.split("").shift()}
                                                        </div>

                                                    )}
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>
                                                {
                                                    contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : ""
                                                }
                                            </span>
                                            <span className='text-xs'>{contact.email}</span>
                                        </div>
                                    </div>))}

                                </div>
                            </ScrollArea>
                        )
                    }


                    {
                        searchContact.length <= 0 && (
                            <div className='flex-1 md:flex flex-col justify-center items-center duration-1000 transition-all'>

                                <div className='text-opacity-80 text-white flex flex-col gap-5 items-center lg:text-1xl text-xl transition-all duration-300 text-center'>
                                    <h6 className='poppins-medium'>
                                        Search <span className='text-[#3056bc]'>New</span> Contact
                                    </h6>
                                </div>
                            </div>
                        )} 
                </DialogContent>

            </Dialog>

        </>
    )
}

export default Newmessage
