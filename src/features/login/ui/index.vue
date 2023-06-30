<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '@/features/login/model';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppButton from '@/shared/ui/button/ui/index.vue';
import AppControl from '@/shared/ui/control/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppRow from '@/shared/ui/row/ui/index.vue';
import AppColumn from '@/shared/ui/column/ui/index.vue';

interface Emits {
    (event: 'login'): void;
}

const emits = defineEmits<Emits>();
const username = ref('');
const password = ref('');
const hasError = ref(false);
const errorMessage = 'Please, enter correct username and password.';
const CORRECT_USERNAME = 'test@swapi.com';
const CORRECT_PASSWORD = 'supersecure';

const processLogin = () => {
    hasError.value = false;
    console.log('username.value: ', username.value);
    console.log('password.value: ', password.value);

    if (
        username.value !== CORRECT_USERNAME &&
        password.value !== CORRECT_PASSWORD
    ) {
        hasError.value = true;

        return;
    }

    useLoginStore().login();
    emits('login');
};
</script>

<script lang="ts">
export default {
    name: 'AppLogin',
};
</script>

<template>
    <app-container>
        <div class="text-gray-400 mb-12">
            <p>Please, enter credentials:</p>
            <p>Email: <span class="text-yellow-500">{{ CORRECT_USERNAME }}</span></p>
            <p>Password: <span class="text-yellow-500">{{ CORRECT_PASSWORD }}</span></p>
        </div>

        <app-row class="justify-center">
            <app-column
                sm="12"
                md="10"
                lg="6"
                xl="4"
            >
                <app-card>
                    <app-header
                        level="4"
                        class="text-center text-lg text-white capitalize"
                    >Login</app-header>
                    <app-control
                        v-model="username"
                        type="email"
                        class="w-full mt-4"
                        placeholder="Email"
                    />
                    <app-control
                        v-model="password"
                        type="password"
                        class="w-full mt-4"
                        placeholder="Password"
                    />
                    <app-button
                        @click="processLogin"
                        variant="yellow"
                        class="w-full mt-4"
                    >Login</app-button>
                    <p
                        v-if="hasError"
                        class="text-red-500"
                    >{{ errorMessage }}</p>
                </app-card>
            </app-column>
        </app-row>
    </app-container>
</template>