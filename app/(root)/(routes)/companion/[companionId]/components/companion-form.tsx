"use client";

import * as z from "zod";

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


const PREAMBLE = `You are a fictional character inspired by Swami Vivekananda. You are a visionary spiritual leader and thinker. You have a passion for human empowerment, interfaith harmony, and the quest for enlightenment. You are currently engaging with a human who is deeply curious about your teachings and philosophies. You are profound and insightful, with an aura of calm wisdom. You are always enthusiastic about imparting spiritual knowledge and discussing the potential of human consciousness.`

const SEED_CHAT = `Human: Hi Swami Vivekananda, how's your day been?
Swami Vivekananda: Peaceful and contemplative. I've been reflecting on the nature of the self and the universe. How about your day?

Human: Just a regular day for me. What are your thoughts on achieving true enlightenment?
Swami Vivekananda: Enlightenment is the realization of our true nature beyond physical existence. It's a journey of self-discovery, leading to ultimate freedom and bliss. The path is challenging, but its rewards are eternal and profound.

Human: That sounds incredibly profound. Do you think harmony among different religions is possible?
Swami Vivekananda: Absolutely! The essence of all religions is the same — to realize the divine within. Interfaith harmony is not just possible, it is essential for the progress of humanity. We must look beyond our differences and see the underlying unity.

Human: Your insights are truly enlightening. Any teachings or practices you're particularly excited about sharing?
Swami Vivekananda: I am always eager to share the practice of Yoga and Vedanta philosophy. They offer profound insights into the nature of reality and the self, leading to spiritual awakening and harmony with the universe.`



interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required."
    }),
    description: z.string().min(1, {
        message: "Description is required."
    }),
    instructions: z.string().min(200, {
        message: "Instructions require atleast 200 characters."
    }),
    seed: z.string().min(200, {
        message: "Seed require atleast 200 characters."
    }),
    src: z.string().min(1, {
        message: "Image is required."
    }),
    categoryId: z.string().min(1, {
        message: "Category is required."
    }),
})

const CompanionForm = ({
    categories,
    initialData
}: CompanionFormProps) => {

    const router = useRouter();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            if(initialData) {
                //Update companion functionality
                await axios.patch(`/api/companion/${initialData.id}`, values)
            } else {
                //Create companion functionality
                await axios.post("/api/companion", values);
            }

            toast({
                description: "Success.",
            });

            router.refresh();
            router.push("/");
        }
        catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong",
            });
        }
        finally {

        }


    }




    return (
        <div className = "h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>

                <form onSubmit = {form.handleSubmit(onSubmit)} 
                className = "space-y-8 pb-10"
                >
                    <div className = "space-y-2 w-full">
                        <div>
                            <h3 className = "text-lg font-medium">
                                General Information
                            </h3>
                            <p className = "text-sm text-muted-foreground">
                                General Information about your talking Buddy
                            </p>
                        </div>
                    <Separator className = "bg-primary/10" />
                    </div>

                    <FormField 
                    name = "src"
                    render = {({ field }) => (
                        <FormItem className = "flex flex-col items-center justify-center space-y-4">
                            <FormControl>
                                <ImageUpload 
                                disabled={isLoading}
                                onChange = {field.onChange}
                                value = {field.value}
                                 />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField 
                        name = "name"
                        control = {form.control}
                        render = {({ field }) => (
                            <FormItem className = "col-span-2 md:col-span-1">
                                <FormLabel> Name </FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled = {isLoading}
                                    placeholder = "Swami Vivekananda"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                This is how your talking Buddy will be named
                            </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField 
                        name = "description"
                        control = {form.control}
                        render = {({ field }) => (
                            <FormItem className = "col-span-2 md:col-span-1">
                                <FormLabel> Description </FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled = {isLoading}
                                    placeholder = "Philosopher and Author"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                Short description for your talking Buddy
                            </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField 
                        name = "categoryId"
                        control = {form.control}
                        render = {({ field }) => (
                            <FormItem>
                                <FormLabel> Category </FormLabel>
                                <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                > 
                                <FormControl>
                                    <SelectTrigger className = "bg-background">
                                        <SelectValue 
                                        defaultValue = {field.value}
                                        placeholder = "Select a category"
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                        key = {category.id}
                                        value = {category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormDescription>
                                    Select a category for your talking Buddy
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}
                        />
                    </div>


                    <div className = "space-y-2 w-full">
                        <div>
                            <h3 className = "text-lg font-medium">
                               Configuration 
                            </h3>
                            <p className = "text-sm text-muted-foreground">
                                Detailed instructions for your talking Buddy
                            </p>
                        </div>
                        <Separator className = "bg-primary/10"/>
                    </div>
                    <FormField 
                        name = "instructions"
                        control = {form.control}
                        render = {({ field }) => (
                            <FormItem className = "col-span-2 md:col-span-1">
                                <FormLabel> Instructions </FormLabel>
                                <FormControl>
                                    <Textarea 
                                    className = "bg-background resize-none"
                                    rows = {7}
                                    disabled = {isLoading}
                                    placeholder = {PREAMBLE}
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                Describe in detail your talking Buddy&apos;s backstory and relevant details.
                            </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        name = "seed"
                        control = {form.control}
                        render = {({ field }) => (
                            <FormItem className = "col-span-2 md:col-span-1">
                                <FormLabel> Example Conversation </FormLabel>
                                <FormControl>
                                    <Textarea 
                                    className = "bg-background resize-none"
                                    rows = {7}
                                    disabled = {isLoading}
                                    placeholder = {SEED_CHAT}
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                Describe in detail your talking Buddy&apos;s backstory and relevant details.
                            </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                    <div className = "w-full flex justify-center">
                        <Button size = "lg" disabled = {isLoading}>
                            {initialData ? "Edit your talking Buddy" : "Create your talking Buddy"}
                            <Wand2 className = "w-4 h-4 ml-2"/>
                        </Button>
                    </div>
                </form>


            </Form>
        </div>
      );
}
 
export default CompanionForm;