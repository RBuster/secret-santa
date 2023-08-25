<template>
    <main>
        <h1>Secret Santa</h1>
        <div v-for="recipient of recipients" :key="recipient.id">
            <input v-model="recipient.name" type="text" />
            <input v-model="recipient.email" type="email" />
        </div>
        <!-- <v-btn @click="addRecipient">
            Add Player
        </v-btn> -->
        <v-btn color="success" @click="addRecipient">
            Add Recipient
        </v-btn>
        <v-btn color="success" @click="sendToRecipients">
            Submit
        </v-btn>
    </main>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { Recipient } from "../lib/interfaces/recipient";
    import axios from "axios";

    //------------------------------------------------------------------------------------------------------------------
    // Component Definition
    //------------------------------------------------------------------------------------------------------------------
    const recipients = ref<Recipient[]>([]);

    //------------------------------------------------------------------------------------------------------------------
    // Functions
    //------------------------------------------------------------------------------------------------------------------
    function addRecipient() {
        recipients.value.push({
            id: recipients.value.length + 1,
            name: "",
            email: "",
        });
    }

    async function sendToRecipients() {
        await axios.post("/api/sendEmail", recipients.value);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Lifecycle Hooks
    //------------------------------------------------------------------------------------------------------------------
    onMounted(() => {
        addRecipient();
    });
</script>
