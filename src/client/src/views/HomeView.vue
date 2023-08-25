<template>
    <main>
        <h1>Secret Santa</h1>
        <div v-for="recipient of recipients" :key="recipient.id">
            <v-text-field
                id="recName"
                v-model="recipient.name"
                name="recName"
                label="Recipient Name"
                :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
                v-model="recipient.email"
                label="E-mail"
                :rules="[rules.required, rules.email]"
            ></v-text-field>
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

    const rules = {
        required: (value: string) => !!value || "Required.",
        email: (value: string) => {
            const valid = /.+@.+\..+/.test(value);
            return valid || "Email must be valid.";
        },
    };

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
