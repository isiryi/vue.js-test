<template>
    <v-dialog
        v-model="isOpen"
        max-width="500px"
    >
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ title }}</span>
            </v-card-title>
            
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                v-model="task.title"
                                label="Title"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-combobox
                                v-model="task.tags"
                                chips
                                clearable
                                label="Tags"
                                multiple
                                append-icon=""
                            >
                                <template v-slot:selection="{ attrs, item, select, selected }">
                                    <v-chip
                                        v-bind="attrs"
                                        :input-value="selected"
                                        close
                                        @click:close="removeTag(item)"
                                    >
                                        <strong>{{ item }}</strong>&nbsp;
                                    </v-chip>
                                </template>
                            </v-combobox>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-menu
                                v-model="isDatePickerOpen"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        :value="task.dueDate"
                                        readonly
                                        label="Date"
                                        hint="YYYY/MM/DD format"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="task.dueDate"
                                    no-title
                                    @input="isDatePickerOpen = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    function getDefaultTask (){
        return {
            id: '',
            title: '',
            tags: [],
            dueDate: '',
            completed: false
        }
    }
    export default {
        name: 'edit-dialog.vue',
        props: {
            isOpen: {
                type: Boolean,
                default: false
            },
            id: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isDatePickerOpen: false,
                task: getDefaultTask()
            }
        },
        computed: {
            selected() {
                return this.id;
            }
        },
        methods: {
            save() {
                const task = JSON.parse(JSON.stringify(this.task));
                this.$store.dispatch('save', task);
                this.task = JSON.parse(JSON.stringify(getDefaultTask()));
                this.$emit('close');
            },
            removeTag(item){
                this.task.tags.splice(this.task.tags.indexOf(item), 1);
            },
            close() {
                this.task = JSON.parse(JSON.stringify(getDefaultTask()));
                this.$emit('close');
            }
        },
        watch: {
            selected(newVal) {
                if (newVal) {
                    const task = this.$store.getters['getTaskById'](this.id);
                    if (task) {
                        this.task = JSON.parse(JSON.stringify(task));
                    }
                }
            }
        }
    }
</script>