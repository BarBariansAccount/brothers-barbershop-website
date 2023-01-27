<template>
    <v-dialog :value="value" @input="$emit('input', $event)" width="500px" height="750px">
        <v-card>
            <!-- title -->
            <v-card-title>
                Add Availability
                <v-spacer></v-spacer>
                <v-btn text @click="$emit('input', false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <!-- form -->
            <v-card-text>
                <v-date-picker size="small" v-model="date" full-width></v-date-picker>
                <!-- list -->
                <v-select :multiple="true" :items="hours" label="Hours" v-model="selected">
                    <template v-slot:item="{ item, $attrs }">
                        <span v-on="$attrs">
                            {{ addAmPm(item) }}

                        </span>
                    </template>
                    <template v-slot:selection="{ item, $attrs }">
                        <v-chip small color="primary" v-on="$attrs" dark>
                            {{ addAmPm(item) }}
                        </v-chip>
                    </template>
                </v-select>
                <!-- add -->
                <div class="text-right">
                    <v-btn @click="save" color="success" class="ml-auto">
                        <v-icon>mdi-plus</v-icon>
                        Add
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import barbershopStatus from '@/services/barbershopStatus'
import Swal from "sweetalert2";
export default {
    props: {
        value: Boolean
    },
    data() {
        return {
            date: null,
            hours: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            selectedTime: null,
            picker: false,
            selected: []
        }
    },
    methods: {
        async save() {
            let hoursPerday = []
            // set true false for every hour
            console.log('selected', this.selected)
            this.hours.forEach(hour => {
                if (this.selected.indexOf(hour) > -1) {
                    hoursPerday.push(true)
                } else {
                    hoursPerday.push(false)
                }
            })
            const data = { Available_Date: this.date, hoursPerday }
            try {
                const res = await barbershopStatus.addAvailability(data)
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Update Availability',
                    text: 'Availabilities updated successfully',
                })
                this.$emit('input', false)
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error?.response?.data,
                })
            }
        }
        ,
        addAmPm(hour) {
            if (hour < 12) return hour + ':00 AM'
            else if (hour == 12) return hour + ':00 PM'
            else return (hour - 12) + ':00 PM'
        },
    }
}
</script>