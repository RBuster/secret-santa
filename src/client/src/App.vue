<template>
    <main>
        <h1>Secret Santa</h1>
        <div v-if="sent && !error">
            <h2>I did it!</h2>
            <p>
                Somehow this app still works. Your Secret Santa invitations have been
                sent. Please tell your family/friends to check their email for spam.
            </p>
        </div>
        <div v-if="error">
            <v-alert
                color="error"
                title="Well shit"
                text="An error occurred, please reload the page and try again later"
            ></v-alert>
        </div>
        <v-progress-circular v-if="sending" indeterminate></v-progress-circular>
        <div v-if="!sent && !sending">
            <div class="d-lg-flex justify-space-between w-100">
                <div class="mr-4 w-100">
                    <v-text-field
                        id="recName"
                        v-model="recipient.name"
                        name="recName"
                        label="Recipient Name"
                        :rules="[rules.nameValidator]"
                    ></v-text-field>
                    <v-text-field
                        v-model="recipient.email"
                        label="E-mail"
                        :rules="[rules.emailValidator]"
                    ></v-text-field>
                </div>
                <div class="w-100">
                    <RecipientList :recipients="recipients"></RecipientList>
                    <v-switch
                        v-model="gameRules.useBudget"
                        label="Use budget?"
                    ></v-switch>
                    <v-range-slider
                        v-if="gameRules.useBudget"
                        v-model="gameRules.budget"
                        label="Budget"
                        :min="0"
                        :step="1"
                    >
                        <template #prepend>
                            <v-text-field
                                v-model="gameRules.budget[0]"
                                hide-details
                                single-line
                                type="number"
                                variant="outlined"
                                density="compact"
                                style="width: 100px"
                            ></v-text-field>
                        </template>
                        <template #append>
                            <v-text-field
                                v-model="gameRules.budget[1]"
                                hide-details
                                single-line
                                type="number"
                                variant="outlined"
                                style="width: 100px"
                                density="compact"
                            ></v-text-field>
                        </template>
                    </v-range-slider>
                </div>
            </div>
            <v-btn-group
                secondary
                divided
                variant="outlined"
                class="w-100 justify-end"
            >
                <v-btn
                    class="mt-1 bg-white text-black"
                    :disabled="!canAddRecipient()"
                    @click="addRecipient"
                >
                    Add Recipient
                </v-btn>
                <v-btn
                    class="mt-1 bg-white text-black"
                    :disabled="recipients.length <= 0"
                    @click="sendToRecipients"
                >
                    Submit
                </v-btn>
            </v-btn-group>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { Participant } from './lib/interfaces/recipient';
    import axios from 'axios';
    import RecipientList from './components/RecipientList.vue';
    import { GameRules } from './lib/interfaces/gameRules';

    //------------------------------------------------------------------------------------------------------------------
    // Component Definition
    //------------------------------------------------------------------------------------------------------------------
    const recipients = ref<Participant[]>([]);

    const rules = {
        nameValidator: (value: string) => nameInputValid(value),
        emailValidator: (value: string) => value === '' || emailInputValid(value),
    };

    //------------------------------------------------------------------------------------------------------------------
    // Refs
    //------------------------------------------------------------------------------------------------------------------
    const recipient = ref<Participant>({
        id: 0,
        name: '',
        email: '',
    });

    const gameRules = ref<GameRules>({
        useBudget: false,
        budget: [20, 50]
    })

    const sending = ref(false);
    const sent = ref(false);
    const error = ref(false);

    //------------------------------------------------------------------------------------------------------------------
    // Functions
    //------------------------------------------------------------------------------------------------------------------
    function addRecipient() {
        recipients.value.push({
            id: recipients.value.length + 1,
            name: recipient.value.name,
            email: recipient.value.email,
        });
        recipient.value = {
            id: -1,
            name: '',
            email: '',
        };
    }

    async function sendToRecipients() {
        if (recipients.value.length > 0) {
            sending.value = true;
            try {
                await axios.post('/api/sendEmails', { participants: recipients.value, gameRules: gameRules.value });
                sent.value = true;
            } catch (e) {
                console.error(e);
                error.value = true;
            } finally {
                sending.value = false;
            }
        }
    }

    function emailInputValid(value: string) {
        const valid = /.+@.+\..+/.test(value);
        return valid || 'Email must be valid.';
    }

    function nameInputValid(value: string) {
        if (recipient.value.email === '') {
            return true;
        }
        return !!value || 'Required.';
    }

    function canAddRecipient() {
        return (
            emailInputValid(recipient.value.email) === true &&
            nameInputValid(recipient.value.name) === true
        );
    }
</script>
