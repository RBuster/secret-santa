<template>
    <div>
        <v-card variant="outlined">
            <v-card-title>Recipients</v-card-title>
            <v-card-text>
                <v-list class="bg-transparent">
                    <v-list-item v-for="recipient in recipients" :key="recipient.id">
                        <v-list-item-content>
                            <v-list-item-title>{{ recipient.name }}</v-list-item-title>
                            <v-list-item-subtitle>
                                {{ recipient.email }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <hr />
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
    import { Recipient } from "../lib/interfaces/recipient";

    interface Props {
        recipients?: Recipient[];
    }

    defineProps<Props>();
</script>
