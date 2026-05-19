'use client'
import { Check } from "@gravity-ui/icons";
import { Button, Select, FieldError, Form, Input, Label, TextField, ListBox, TextArea, Card } from "@heroui/react";



const AddTutor = () => {



const onSubmit =  async(e) => {
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Tutor Data:", data);

    const res = await fetch('http://localhost:1000/addTutor', {
    method: "POST" , 
    headers:{
        'content-type' : "application/json" 
    }, 
    body:JSON.stringify(data)
});

 const tutorData = await res.json();
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
                        {/* Destination Name */}
                        <div className="md:col-span-2">
                            <TextField name="destinationName" isRequired>
                                <Label>Name</Label>
                                <Input placeholder="Tutor Name" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Country */}

                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired>
                                <Label>Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/bali-paradise.jpg"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>
                        {/* Category - Updated Select Component */}
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
                                            ICT                                        <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Mathematics" textValue="Mathematics">
                                            Mathematics
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Physics" textValue="Physics">
                                            Physics
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Chemistry" textValue="Chemistry">
                                            Chemistry
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Biology" textValue="Biology">
                                            Biology
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="English" textValue="English">
                                            English
                                            <ListBox.ItemIndicator />
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

                        {/* Duration */}
                        {/* --- Available Days --- */}
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

                        {/* --- Available Time Slot --- */}
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

                        {/* Departure Date */}
                        <div className="md:col-span-2">
                            <TextField name="departureDate" type="date" isRequired>
                                <Label>Departure Date</Label>
                                <Input type="date" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Image URL - Removed preview */}


                        {/* Description */}
                        {/* --- Total Slot --- */}
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

                        {/* --- Session Start Date (Date-Picker) --- */}
                        <TextField name="startDate" isRequired>
                            <Label>Session Start Date</Label>
                            <Input
                                type="date"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* --- Institution --- */}
                        <TextField name="institution" isRequired>
                            <Label>Institution</Label>
                            <Input
                                placeholder="e.g. Dhaka University"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* --- Experience --- */}
                        <TextField name="experience" isRequired>
                            <Label>Experience</Label>
                            <Input
                                placeholder="e.g. 2+ Years of teaching"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* --- Location (Area/City) --- */}
                        <TextField name="location" isRequired>
                            <Label>Location (Area/City)</Label>
                            <Input
                                placeholder="e.g. Dhanmondi, Dhaka"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>
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
                                            ICT                                        <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Mathematics" textValue="Mathematics">
                                            Mathematics
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Physics" textValue="Physics">
                                            Physics
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Chemistry" textValue="Chemistry">
                                            Chemistry
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Biology" textValue="Biology">
                                            Biology
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="English" textValue="English">
                                            English
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                    </div>

                    {/* Buttons */}

                    <Button
                        type="submit"
                        variant="outline"

                        className=" rounded-none mt-3 w-full bg-cyan-500 text-white"
                    >
                        add Tutor
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default AddTutor;