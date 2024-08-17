export const chatSlice = (set,get)=>({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:[],
    directMessagesContacts:[],
    channels:[],
    setChannels:(channels)=>set({channels}),
    setSelectedChatType:(selectedChatType)=>set({selectedChatType}),
    setSelectedChatData:(selectedChatData)=>set({selectedChatData}),
    setSelectedChatMessages: (selectedChatMessages)=>set({selectedChatMessages}),
    setDirectMessagesContacts:(directMessagesContacts)=>set({directMessagesContacts}),
    addChannel:(channel)=>{
        const channels = get().channels;
        set({channels: [channel,...channels]});
    },
    closeChat: ()=>set({
        selectedChatData:undefined,
        selectedChatType:undefined,
        selectedChatMessages: [],
    }),
    addMsg:(message)=>{
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;
        set({
            selectedChatMessages: [
                ...selectedChatMessages,
                 {...message,
                recipient: 
                    selectedChatType === "channel" 
                    ? message.recipient 
                    : message.recipient._id,
                sender: 
                    selectedChatType === "channel" 
                    ? message.sender 
                    : message.sender._id,
            },],

        });
    }
});