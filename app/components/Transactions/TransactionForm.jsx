'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  description: z.string().min(2, 'Description must be at least 2 characters'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  date: z.date(),
  category: z.string().min(1, 'Select a category'),
});

export default function TransactionForm({ open, onOpenChange, onSuccess, transaction = null }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: 0,
      date: new Date(),
    },
  });

  const onSubmit = async (values) => {
    try {
      if (transaction) {
        // Edit mode
        await axios.put('/api/transactions', {
          ...values,
          id: transaction._id,
        });
      } else {
        // Add mode
        await axios.post('/api/transactions', values);
      }

      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };


  useEffect(() => {
    if (transaction) {
      form.reset({
        description: transaction.description,
        amount: transaction.amount,
        date: new Date(transaction.date),
      });
    } else {
      form.reset({
        description: '',
        amount: 0,
        date: new Date(),
      });
    }
  }, [transaction, form]);

return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center">Add New Transaction</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Grocery shopping" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={field.value || ''}
                    onChange={(e) =>
                      field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Picker */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {form.getValues('id') ? 'Update' : 'Add'} Transaction
          </Button>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);

}