// IMPORTER MESSAGE.Vue SERENAi ICI 

<template>
    <div className="card">
        <div class="h-[calc(100vh-2rem)] flex mt-2">
            <!-- Conversations List -->
            <div class="w-96 glass rounded-l-xl flex flex-col h-full">
                <!-- Search Bar -->
                <div class="p-3 border-b border-grey/10">
                    <div class="relative">
                        <input type="text" placeholder="Search messages..." class="w-full bg-grey/5 text-grey placeholder-grey/50 rounded-lg pl-10 pr-4 py-1.5 text-sm" v-model="searchQuery" />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-2 text-grey/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <!-- Conversations -->
                <div class="flex-1 overflow-y-auto">
                    <div v-if="isLoading" class="p-3 text-grey/50">Loading conversations...</div>
                    <div v-else-if="error" class="p-3 text-red-400">
                        {{ error }}
                    </div>
                    <div v-else class="divide-y divide-grey/10">
                        <div
                            v-for="conversation in conversations"
                            :key="conversation.id"
                            @click="selectConversation(conversation.id)"
                            class="p-3 hover:bg-grey/5 cursor-pointer transition-colors"
                            :class="{
                                'bg-grey/10': selectedConversation?.id === conversation.id
                            }"
                        >
                            <div class="flex justify-between items-start">
                                <div class="flex items-center gap-2">
                                    <h3 class="font-medium text-grey">
                                        {{ conversation.guest }}
                                    </h3>
                                    <span class="px-2 py-0.5 text-xs rounded-full text-grey" :class="conversation.apiSourceId === 19 ? 'bg-blue-500/50' : 'bg-red-500/50'">
                                        {{ getSourceLabel(conversation.apiSourceId) }}
                                    </span>
                                </div>
                                <span class="text-xs text-grey/50">{{ conversation.lastMessageTime }}</span>
                            </div>
                            <p class="text-sm text-grey/70 truncate mt-0.5">
                                {{ conversation.lastMessage }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chat Area -->
            <div class="flex-1 glass rounded-r-xl flex flex-col h-full">
                <div v-if="selectedConversation" class="flex-1 flex flex-col h-full">
                    <!-- Chat Header -->
                    <div class="p-3 border-b border-grey/10">
                        <div class="flex items-center gap-2">
                            <h2 class="font-medium text-grey">
                                {{ selectedConversation.guest }}
                            </h2>
                            <span class="px-2 py-0.5 text-xs rounded-full text-grey" :class="selectedConversation.apiSourceId === 19 ? 'bg-blue-500/50' : 'bg-red-500/50'">
                                {{ getSourceLabel(selectedConversation.apiSourceId) }}
                            </span>
                        </div>
                        <p class="text-sm text-grey/50">Booking ID: {{ selectedConversation.id }}</p>
                    </div>

                    <!-- Messages -->
                    <div class="flex-1 overflow-y-auto p-3 space-y-3" ref="messageContainer">
                        <div v-for="message in selectedConversation.messages" :key="message.id" class="flex" :class="message.source === 'guest' ? 'justify-start' : 'justify-end'">
                            <div :class="['max-w-[70%] rounded-lg px-3 py-2', message.source === 'guest' ? 'bg-grey/10' : 'bg-blue-500']">
                                <p class="text-grey text-sm">{{ message.content }}</p>
                                <span class="text-xs mt-1 block" :class="message.source === 'guest' ? 'text-grey/50' : 'text-grey/70'">
                                    {{ message.time }}
                                </span>
                            </div>
                        </div>
                        <div v-if="isGenerating" class="flex justify-end">
                            <div class="bg-blue-500/50 rounded-lg px-3 py-2">
                                <div class="flex space-x-2">
                                    <div class="w-2 h-2 bg-grey rounded-full animate-bounce"></div>
                                    <div class="w-2 h-2 bg-grey rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                    <div class="w-2 h-2 bg-grey rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="p-3 border-t border-grey/10">
                        <div class="flex gap-2">
                            <input type="text" placeholder="Type a message..." class="flex-1 bg-grey/5 text-grey placeholder-grey/50 rounded-lg px-3 py-2" v-model="newMessage" @keyup.enter="sendMessage" />
                            <button @click="sendMessage" class="px-4 py-2 bg-blue-500 text-grey rounded-lg hover:bg-blue-600 transition-colors" :disabled="!newMessage.trim() || isGenerating">Send</button>
                        </div>
                    </div>
                </div>
                <div v-else class="flex-1 flex items-center justify-center text-grey/50">Select a conversation to start messaging</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMessages } from '~/composables/useMessages';

const { fetchMessages } = useMessages();

onMounted(() => {
    const conversations = fetchMessages();
});

</script>
