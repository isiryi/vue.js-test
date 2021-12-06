<template>
    <v-container>
        <v-row>
            <v-col class="col-12">
                <v-data-table
                    :headers="headers"
                    :items="tasks"
                    sort-by="title"
                    mobile-breakpoint="800"
                    class="elevation-1"
                    :dense="true"
                >
                    <template v-slot:top>
                        <div class="mb-8">
                            <h2 class="pa-4">Task Manager</h2>
                            <v-row class="d-flex align-center px-4">
                                <div class="search-tag-wrapper mr-auto col-sm-12 col-md-4">
                                    <v-text-field
                                        v-model="searchTags"
                                        class="pa-0 mr-4"
                                        append-icon="mdi-magnify"
                                        label="Search by tag"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </div>
                                <div class="col-sm-12 col-md-5 d-flex align-center justify-md-end">
                                    <v-switch
                                        v-model="showCompletedTasks"
                                        class="mt-0 mr-4 pa-0"
                                        :label="switchLabel"
                                        hide-details
                                    ></v-switch>
                                    <v-btn
                                        color="primary"
                                        dark
                                        @click="dialog=true"
                                    >
                                        New
                                    </v-btn>
                                </div>
                            </v-row>
                            <EditDialog
                                :isOpen="dialog"
                                :id="taskId"
                                :title="dialogTitle"
                                @close="close"
                            />
                            <DeleteDialog
                                :isOpen="deleteDialog"
                                :id="taskId"
                                @close="deleteDialog=false"
                            />
                        </div>
                    </template>
                    <template v-slot:item.title="{ value, item }">
                        <div class="task-title-wrapper d-flex align-center">
                            <span>{{ value }}</span>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                        v-show="!item.completed && new Date(item.dueDate) < new Date()"
                                        v-bind="attrs"
                                        v-on="on"
                                        class="ml-1"
                                        color="warning"
                                    >
                                        mdi-timer-outline
                                    </v-icon>
                                </template>
                                <span>Unfulfilled task</span>
                            </v-tooltip>
                        </div>
                    </template>
                    <template v-slot:item.tags="{value}">
                        <span>{{value.join(', ')}}</span>
                    </template>
                    <template v-slot:item.completed="{ value, item }">
                        <v-checkbox
                            :input-value="value"
                            @change="onCompletedChange($event, item.id)"
                        ></v-checkbox>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            @click="onDeleteIconClick(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'TaskManager',
        components: {
            EditDialog: () => import('./dialogs/EditDialog'),
            DeleteDialog: () => import('./dialogs/DeleteDialog')
        },
        computed: {
            tasks() {
                return this.$store.getters['getTasks'](this.showCompletedTasks, this.searchTags);
            },
            dialogTitle() {
                return 'Delete';
            },
            switchLabel() {
                return `${this.showCompletedTasks ? 'Hide' : 'Show'} completed`;
            }
        },
        data() {
            return {
                headers: [
                    {text: 'Title', value: 'title', width: '30%'},
                    {text: 'Tags', value: 'tags', width: '30%'},
                    {text: 'Due date', value: 'dueDate'},
                    {text: 'Completed', value: 'completed', sortable: false},
                    {text: 'Actions', value: 'actions', sortable: false},
                ],
                searchTags:'',
                showCompletedTasks: false,
                dialog: false,
                deleteDialog: false,
                taskId: ''
            }
        },
        methods: {
            onCompletedChange($event, id) {
                const data = {
                    id,
                    completed: $event || false
                };
                this.$store.dispatch('update', data);
            },
            editItem(item) {
                this.taskId = item.id;
                this.dialog = true;
            },
            close() {
                this.dialog = false;
                this.taskId = '';
            },
            onDeleteIconClick(item) {
                this.taskId = item.id;
                this.deleteDialog = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-tag-wrapper {
        width: 300px !important;
    }
    .task-title-wrapper {
        max-width: 600px;
        
        .v-icon {
            width: 24px;
            height: 24px;
        }
    }
</style>