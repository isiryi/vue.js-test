<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this task?</v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="onDelete">OK</v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'delete-dialog',
        props: {
            isOpen: {
              type: Boolean,
                default: false
            },
            id: {
                type: String,
                required: true
            }
        },
        methods: {
            onClose() {
                this.$emit('close');
            },
            onDelete() {
                const id = this.id;
                this.$store.dispatch('delete', {id});
                this.$emit('close');
            }
        }
    }
</script>