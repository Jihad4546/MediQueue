'use client'
import { authClient } from "@/lib/auth-client";  // ← যোগ করা হয়েছে
import { Button, Select, FieldError, Form, Input, Label, TextField, ListBox, Card } from "@heroui/react";
import { toast } from "react-toastify";

const AddTutor = () => {

    const { data: session } = authClient.useSession();  // ← যোগ করা হয়েছে
    const user = session?.user;                          // ← যোগ করা হয়েছে

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));
        data.userEmail = user?.email;  // ← typo fix: userEamil → userEmail

        const res = await fetch('http://localhost:1000/addTutor', {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(data)
        });

        const tutorData = await res.json();
        if (tutorData) {
            toast.success('Your Data Successfully Added')
        }
        console.log(tutorData)
    };

    return (
        <div className="container mx-auto">
            <Card>
                <Form
                    onSubmit={onSubmit}
                    className="p-10 space-y-8 min-w-8xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Name */}
                        <div className="md:col-span-2">
                            <TextField name="destinationName" isRequired>
                                <Label>Name</Label>
                                <Input placeholder="Tutor Name" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired>
                                <Label>Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Subject Category */}
                        <div>
                            <Select
                                name="category"
                                isRequired
                                className="w-full"
                                placeholder="Select category"
                            >
                                <Label>Subject Category</Label>
                                <Select.Trigger className="rounded-2xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Ict" textValue="Ict">
                                            ICT <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Mathematics" textValue="Mathematics">
                                            Mathematics <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Physics" textValue="Physics">
                                            Physics <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Chemistry" textValue="Chemistry">
                                            Chemistry <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Biology" textValue="Biology">
                                            Biology <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="English" textValue="English">
                                            English <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Price */}
                        <div>
                            <TextField name="price" type="number" isRequired>
                                <Label>Price (Hourly Fee)</Label>
                                <Input
                                    type="number"
                                    placeholder="1299"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Available Days */}
                        <div>
                            <TextField name="availableDays" isRequired>
                                <Label>Available Days</Label>
                                <Input
                                    placeholder="e.g. Sun - Thu, Fri & Sat"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Available Time Slot */}
                        <div>
                            <TextField name="availableTimeSlot" isRequired>
                                <Label>Available Time Slot</Label>
                                <Input
                                    placeholder="e.g. 5:00 PM - 8:00 PM"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>
                        {/* Total Slots */}
                        <TextField name="totalSlot" isRequired>
                            <Label>Total Slots</Label>
                            <Input
                                type="number"
                                min={1}
                                placeholder="e.g. 5"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Session Start Date */}
                        <TextField name="startDate" isRequired>
                            <Label>Session Start Date</Label>
                            <Input type="date" className="rounded-2xl" />
                            <FieldError />
                        </TextField>

                        {/* Institution */}
                        <TextField name="institution" isRequired>
                            <Label>Institution</Label>
                            <Input
                                placeholder="e.g. Dhaka University"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Experience */}
                        <TextField name="experience" isRequired>
                            <Label>Experience</Label>
                            <Input
                                placeholder="e.g. 2+ Years of teaching"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Location */}
                        <TextField name="location" isRequired>
                            <Label>Location (Area/City)</Label>
                            <Input
                                placeholder="e.g. Dhanmondi, Dhaka"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Teaching Mode ← name fix করা হয়েছে */}
                        <div>
                            <Select
                                name="teachingMode"
                                isRequired
                                className="w-full"
                                placeholder="Select mode"
                            >
                                <Label>Teaching Mode</Label>
                                <Select.Trigger className="rounded-2xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Online" textValue="Online">
                                            Online <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Offline" textValue="Offline">
                                            Offline <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Both" textValue="Both">
                                            Both <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                    </div>

                    <Button
                        type="submit"
                        variant="outline"
                        className="rounded-none mt-3 w-full bg-cyan-500 text-white"
                    >
                        Add Tutor
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default AddTutor;