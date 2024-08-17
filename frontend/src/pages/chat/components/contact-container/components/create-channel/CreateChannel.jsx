import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React, { useEffect, useState } from 'react'
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
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE, SEARCH_CONTACTS } from '@/utils/constants.js'

import { useAppStore } from '@/store'
import { Button } from '@/components/ui/button'
import MultipleSelector from '@/components/ui/multipleselect'


const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData, addChannel } = useAppStore();
    const [newChannelModal, setNewChannelModal] = useState(false);
    const [searchContact, setSearchContact] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");

    useEffect(()=>{
        const getData = async () => {
            const res = await apiclient.get(GET_ALL_CONTACTS_ROUTE,{withCredentials:true});
            setAllContacts(res.data.contacts);
        };
        getData();
        
    },[]);

    const createChannel = async ()=>{
        try {
            
            if(channelName.length > 0 && selectedContacts.length>0)
            {
                const res = await apiclient.post(CREATE_CHANNEL_ROUTE,
                    { name: channelName,members: selectedContacts.map((contact)=>contact.value) },{withCredentials:true});
                
                    if(res.status === 201){
                        setChannelName("");
                        setSelectedContacts([]);
                        setNewChannelModal(false);
                        addChannel(res.data.channel);
                    }
            }
            
        } catch (error) {
            console.log({error});
            
        }
    }

    

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start
                     hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={() => setNewChannelModal(true)} />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#a3f388] border-none mb-2 p-3 text-black " >
                        Create a Group
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>

                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col" >
                    <DialogHeader>
                        <DialogTitle>Please fill the details of new Group</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input placeholder="Group Name" className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => setChannelName(e.target.value)}  value={channelName} />
                    </div>
                    <div>
                        <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
                        defaultOptions={allContacts} 
                        placeholder="search Contacts" 
                        value={selectedContacts} 
                        onChange={setSelectedContacts}
                        emptyIndicator={
                            <p className='text-center text-lg leading-10 text-gray-600'>No result found</p>
                        } />
                    </div>
                    <div>
                        <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" 
                        onClick={createChannel}>Create a Group</Button>
                    </div>

                     
                </DialogContent>

            </Dialog>

        </>
    )
}

export default CreateChannel;
