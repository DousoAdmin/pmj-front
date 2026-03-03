<template>
    <header
        class="relative sticky top-0 z-50 w-full
            bg-gradient-to-r from-[#522178]/95 to-[#3d1958]/95
            backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl
            border-b border-white/10"
    >


                <div class="h-1 flex">
                    <div class="flex-1 bg-[#00B140]"></div>
                    <div class="flex-1 bg-[#F2780C]"></div>
                    <div class="flex-1 bg-[#522178]"></div>
                </div>


                <div class="relative px-4 sm:px-6 flex items-center gap-3" style="height:104px">

                    <button
                        v-if="!sidebarOpen"
                        type="button"
                        @click="$emit('toggleSidebar')"
                        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2
                                     flex items-center group
                                     h-16 pl-2 pr-3 rounded-r-2xl rounded-l-none
                                     border-2 border-white/20 shadow-lg
                                     transition-all duration-300 hover:scale-105"
                        aria-label="Abrir menú"
                        title="Abrir menú"
                    >

                        <span class="w-12 h-12 rounded-2xl grid place-items-center">
                            <img
                                src="/images/favicon.webp"
                                alt="Yaya"
                                class="w-12 h-12 object-contain opacity-95 -translate-x-8 rotate-[18deg] transition-transform duration-300 group-hover:-translate-x-4"
                                style="position: relative;"
                                draggable="false"
                            />
                        </span>

                        <span class="ml-1 w-9 h-9 rounded-xl grid place-items-center
                                                 bg-black/20 border border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="2" stroke="currentColor"
                                     class="w-5 h-5 text-white/90">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>

        <div class="flex-1 min-w-0 flex justify-center">
            <div class="relative w-full min-w-0 max-w-[520px] sm:max-w-[520px] md:max-w-xl">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
            </span>
            <input
                v-model="q"
                type="text"
                placeholder="Buscar..."
                class="w-full h-11 pl-10 pr-4 rounded-2xl
                    bg-white/10 text-white placeholder:text-white/60
                    border border-white/10
                    shadow-[0_10px_30px_-18px_rgba(0,0,0,.65)]
                    transition-all duration-300
                    focus:outline-none focus:bg-white/15 focus:border-white/25
                    focus:ring-2 focus:ring-[#00B140]/25"
                @keydown.enter="$emit('search', q)"
            />
            </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3 justify-end flex-nowrap shrink-0">

            <button
                type="button"
                class="relative w-11 h-11 rounded-2xl grid place-items-center
                        bg-white/10 border border-white/10 shadow-lg
                        transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:rotate-3"
                aria-label="Notificaciones"
                @click="$emit('openNotifications')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.311 6.022c1.733.64 3.56 1.085 5.454 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <span
                    v-if="notifCount > 0"
                    class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full
                        bg-[#F2780C] text-white text-[10px] font-black grid place-items-center
                        border border-white/20 shadow"
                >
                    {{ notifCount }}
                </span>
            </button>

            <button
                type="button"
                class="relative w-11 h-11 rounded-2xl grid place-items-center
                        bg-white/10 border border-white/10 shadow-lg
                        transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:-rotate-3"
                aria-label="Mensajes"
                @click="$emit('openMessages')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 16.5v-9A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="m3 7.5 9 6 9-6" />
                </svg>
                <span
                    v-if="msgCount > 0"
                    class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full
                        bg-[#00B140] text-white text-[10px] font-black grid place-items-center
                        border border-white/20 shadow"
                >
                    {{ msgCount }}
                </span>
            </button>

            <button
                type="button"
                class="flex items-center gap-2 pl-1 pr-2 md:pr-3 h-11 rounded-2xl
                        bg-white/10 border border-white/10 shadow-lg
                        transition-all duration-300 hover:bg-white/15 hover:scale-[1.02]"
                @click="$emit('openProfile')"
            >
                <img
                    :src="avatarUrl"
                    alt="Avatar"
                    class="w-9 h-9 rounded-full object-cover ring-2 ring-white/10"
                />
                <div class="hidden md:flex flex-col text-left leading-none">
                    <span class="text-sm font-black text-white leading-none">{{ username }}</span>
                    <span v-if="organization" class="text-xs text-white/70 font-semibold leading-none mt-1">
                        {{ organization }}
                    </span>
                </div>
                <span class="hidden md:inline-flex w-8 h-8 rounded-xl bg-black/20 border border-white/10 items-center justify-center ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </button>
        </div>
        </div>
    </header>
    
    <div class="w-full h-[2px] bg-[#00B140]/60 opacity-70"></div>
</template>

<script setup>
    import { ref } from 'vue'

    defineEmits(['toggleSidebar', 'openMenuFly', 'search', 'openNotifications', 'openMessages', 'openProfile'])

    defineProps({
    username: { type: String, default: 'Usuario Demo' },
    avatarUrl: { type: String, default: 'https://i.pravatar.cc/100?img=3' },
    organization: { type: String, default: 'Organización Demo' },
    notifCount: { type: Number, default: 4 },
    msgCount: { type: Number, default: 1 },
    sidebarOpen: { type: Boolean, default: true },
    })

    const q = ref('')
</script>